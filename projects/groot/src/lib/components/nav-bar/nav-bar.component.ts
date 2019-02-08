import {Component, Input} from '@angular/core';
import {Menu} from './nav-bar.model';

interface ConcreteMenu extends Menu {
  parent: Menu | null;
  selected?: boolean;
}

@Component({
  selector: 'groot-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  public menuCollapsed = true;
  public rootMenu: ConcreteMenu[][];
  public currentMenu: ConcreteMenu;
  public breadcrumbs: ConcreteMenu[] = [];

  @Input()
  public set menu(items: Menu[][]) {
    if (!items || items.length < 1) {
      return;
    }

    // We will fill the parent of the child items only on demand, at the click
    this.rootMenu = items as ConcreteMenu[][];
    this.currentMenu = {
      label: 'menu',
      children: this.rootMenu,
      parent: null
    };
  }

  public toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }

  public onItemClick(item: ConcreteMenu) {
    if (item.url) {
      console.log('TODO: navigo su ');
      console.log(item);
      item.selected = true;
    } else {
      this.breadcrumbs.push(item);
      this.currentMenu = item;
    }
  }
}
