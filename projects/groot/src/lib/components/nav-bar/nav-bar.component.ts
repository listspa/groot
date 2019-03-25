import {Component, Input} from '@angular/core';
import {Menu, SimpleNavBarItem} from './nav-bar.model';
import {Router} from '@angular/router';
import {dropDownOnCreateAnimation} from '../../utils/animations-utils';
import {animate, style, transition, trigger} from '@angular/animations';

interface ConcreteMenu extends Menu {
  selected?: boolean;
}

export function slideRight(fromState, toState) {
  return fromState < toState;
}

export function slideLeft(fromState, toState) {
  return !slideRight(fromState, toState);
}


@Component({
  selector: 'groot-nav-bar',
  templateUrl: './nav-bar.component.html',
  animations: [dropDownOnCreateAnimation,
    trigger('slide', [
      transition(slideRight, [
        animate('0s', style({transform: 'translateX(100%)'})), // move first the old menu in position to give the illusion nothing has changed
        animate('0.15s ease-in-out', style({transform: 'translateX(0%)'}))
      ]),
      transition(slideLeft, [
        animate('0s', style({transform: 'translateX(-101.5%)'})),
        animate('0.15s ease-in-out', style({transform: 'translateX(0%)'}))
      ])
    ])
  ]
})
export class NavBarComponent {
  public menuCollapsed = true;
  public slide: string = 'r0'; // r[0-9]+ it will trigger right animation | l[0-9]+ it will trigger left animation. The first letter indicate which transition trigger.
  public rootMenu: ConcreteMenu = {
    label: 'menu',
    icon: null,
    children: null
  };
  public _simpleNavBarItems: SimpleNavBarItem[];
  public currentMenu: ConcreteMenu;
  public oldMenu: ConcreteMenu; // To allow the animation, the previous menu screen must be rendered at the right (or left) of the current menu.
  public breadcrumbs: ConcreteMenu[] = [];
  @Input() public showAlwaysBreadcrumbs = true;

  constructor(public readonly router: Router) {
  }

  @Input()
  public set simpleNavBarItems(items: SimpleNavBarItem[]) {
    if (!items || items.length < 1) {
      return;
    }
    this.checkSimpleUrlsStartWithSlash(items);

    this._simpleNavBarItems = items;
  }

  @Input()
  public set menu(items: Menu[][]) {
    if (!items || items.length < 1) {
      return;
    }
    this.checkUrlsStartWithSlash(items);

    this.rootMenu.children = items;
    this.currentMenu = this.rootMenu;
    this.breadcrumbs = [];
  }

  @Input() set rootMenuLabel(rootMenuLabel: string) {
    this.rootMenu.label = rootMenuLabel;
  }

  @Input() set rootMenuIcon(rootMenuIcon: string) {
    this.rootMenu.icon = rootMenuIcon;
  }

  private checkUrlsStartWithSlash(items: Menu[][]) {
    items.forEach(r => r.forEach(menu => {
      if (menu.url && !menu.url.startsWith('/')) {
        throw new Error(`URLs in menu should start with slash (found "${menu.url}")`);
      }
      if (menu.children) {
        this.checkUrlsStartWithSlash(menu.children);
      }
    }));
  }

  private checkSimpleUrlsStartWithSlash(items: SimpleNavBarItem[]) {
    items.forEach(r => {
      if (r.url && !r.url.startsWith('/')) {
        throw new Error(`URLs in r should start with slash (found "${r.url}")`);
      }
      if (r.children) {
        this.checkSimpleUrlsStartWithSlash(r.children);
      }
    });
  }

  public onItemClick(item: ConcreteMenu) {
    if (item.url) {
      item.selected = true;
      this.router.navigate([item.url]);
      this.close();
    } else {
      this.breadcrumbs.push(item);
      this.oldMenu = this.currentMenu;
      this.currentMenu = item;
      this.slide = 'r' + this.breadcrumbs.length;
    }
  }

  private close() {
    this.menuCollapsed = true;
  }

  public selectBreadcrumb(subMenu: ConcreteMenu, index: number) {
    this.oldMenu = this.currentMenu;
    this.currentMenu = subMenu;
    this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
    this.slide = 'l' + this.breadcrumbs.length;
  }

  public toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
    if (!this.menuCollapsed) {
      this.highlightCurrentRoute();
    }
  }

  public cleanAnimation() {
    this.oldMenu = null;
  }

  private highlightCurrentRoute() {
    const currUrl = this.router.url;
    this.visitToHighlightCurrentRoute(currUrl, this.rootMenu, []);
  }

  private visitToHighlightCurrentRoute(currUrl: string, parent: ConcreteMenu, path: ConcreteMenu[]) {
    if (!parent.children) {
      return;
    }

    const newPath = path.concat([parent]);
    parent.children.forEach(r => r.forEach((menu: ConcreteMenu) => {
      menu.selected = false;

      if (menu.url === currUrl) {
        this.currentMenu = parent;
        this.breadcrumbs = newPath;
        menu.selected = true;
      } else {
        this.visitToHighlightCurrentRoute(currUrl, menu, newPath);
      }
    }));
  }
}
