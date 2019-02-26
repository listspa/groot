import {Component, Input} from '@angular/core';
import {Menu, SimpleNavBarItem} from './nav-bar.model';
import {Router} from '@angular/router';
import {dropDownAnimation} from '../../utils/animations-utils';

interface ConcreteMenu extends Menu {
  selected?: boolean;
}

@Component({
  selector: 'groot-nav-bar',
  templateUrl: './nav-bar.component.html',
  animations: [dropDownAnimation]
})
export class NavBarComponent {
  private _menuCollapsed = true;
  public state: 'collapsed' | 'expanded' = 'collapsed';
  public rootMenu: ConcreteMenu = {
    label: 'menu',
    icon: null,
    children: null
  };
  public _simpleNavBarItems: SimpleNavBarItem[];
  public currentMenu: ConcreteMenu;
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

  public set menuCollapsed(menuCollapsed: boolean) {
    this.state = menuCollapsed ? 'collapsed' : 'expanded';
    this._menuCollapsed = menuCollapsed;
  }

  public get menuCollapsed(): boolean {
    return this._menuCollapsed;
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
      this.currentMenu = item;
    }
  }

  private close() {
    this.menuCollapsed = true;
  }

  public selectBreadcrumb(subMenu: ConcreteMenu, index: number) {
    this.currentMenu = subMenu;
    this.breadcrumbs = this.breadcrumbs.slice(0, index + 1);
  }

  public toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
    if (!this.menuCollapsed) {
      this.highlightCurrentRoute();
    }
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
