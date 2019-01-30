import {Component, Input, OnInit} from '@angular/core';


export type MenuContent = Menu[] | string;

export interface Menu {
  label: string;
  icon?: string;
  content: MenuContent;
}

interface ConcreteMenu extends Menu {
  parent: Menu | null;
  selected?: boolean;
}

export function isUrlContent(content: MenuContent): content is string {
  return !(content instanceof Array);
}

export function isSubMenu(content: MenuContent): content is Menu[] {
  return content instanceof Array;
}

@Component({
  selector: 'groot-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public menuCollapsed = true;
  public actualMenu: ConcreteMenu;
  public menuFamily: ConcreteMenu[];
  public rootMenu: ConcreteMenu[][];

  @Input()
  public set menu(items: Menu[][]) {
    if (!items || items.length < 1) {
      return;
    }
    this.menuFamily = [];
    this.rootMenu = items as ConcreteMenu[][];
    // We will fill the parent of the child items only on demand, at the click
    this.actualMenu = this.rootMenu[0][0];
    this.actualMenu.selected = true;
    this.menuFamily.push(this.actualMenu);
  }

  constructor() {
  }

  ngOnInit() {
    const testMenu: Menu[][] = [];
    testMenu[0] = [{
      label: 'label_1',
      icon: 'fa fa-file-excel-o',
      content: 'content_1'
    },
      {
        label: 'label_2',
        content: 'content_2'
      }];
    this.menu = testMenu;
  }

  public toggleMenu() {
    this.menuCollapsed = !this.menuCollapsed;
  }

  public onItemClick(item: ConcreteMenu) {
    console.log('click!');
    if (item.selected) {
      return;
    }
  }

}
