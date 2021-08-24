import {Component} from '@angular/core';
import {DarwinSideBarFirstLevelItem, DarwinSideBarMenu} from '../../../../../groot/src/lib/groot-base/model/darwin-sidebar.model';

@Component({
  selector: 'app-demo-sidebar',
  templateUrl: './demo-sidebar.component.html',
  styleUrls: ['./demo-sidebar.component.scss']
})
export class DemoSidebarComponent {
  sidebarMenu: DarwinSideBarMenu = [
    {
      label: 'Home',
      icon: 'fa fa-home',
      routingTarget: '/',
      children: [],
    },
    {
      label: 'Library Comp',
      icon: 'fa fa-flash',
      children: [
        {
          label: 'Basic components',
          children: [
            {
              label: 'Forms',
              routingTarget: '/demo/forms'
            },
            {
              label: 'Buttons',
              routingTarget: '/demo/buttons'
            },
            {
              label: 'Tables',
              routingTarget: '/demo/tables'
            },
            {
              label: 'Tables (disabled)',
              routingTarget: '/demo/tables',
              disabled: true,
            },
          ]
        },
        {
          label: 'Page structure',
          forcedOpen: true,
          children: [
            {
              label: 'Nav bar',
              routingTarget: '/demo/nav-bar'
            },
            {
              label: 'Sidebar',
              routingTarget: '/demo/sidebar'
            },
            {
              label: 'Footer',
              routingTarget: '/demo/footer'
            },
            {
              label: 'Page title',
              routingTarget: '/demo/page-title'
            },
          ]
        },
      ]
    },
    {
      label: 'About',
      image: 'list-logo.png',
      children: [
        {
          label: 'About LIST',
          forcedOpen: true,
          children: [
            {
              label: 'Our products'
            },
            {
              label: 'Our team',
              disabled: true
            },
            {
              label: 'Our history'
            },
          ]
        }
      ],
    },
    null,
    {
      label: 'search',
      icon: 'fa fa-search',
      children: [],
      isSearchButton: true,
    }
  ];

  addEntryAbout(): void {
    const menu = this.sidebarMenu[2] as DarwinSideBarFirstLevelItem;
    menu.children[0].children.push({
      label: 'Added item'
    });
  }
}
