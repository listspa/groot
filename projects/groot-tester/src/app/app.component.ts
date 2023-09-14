import {Component} from '@angular/core';
import {Menu, SimpleNavBarItem} from '../../../groot/src/lib/groot-base/components/nav-bar/nav-bar.model';
import {TranslationsLanguageService} from '../../../groot/src/lib/groot-base/services/translations-language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly navBarItems: SimpleNavBarItem[] = [
    {
      label: 'Documentation', url: '/docs', icon: 'fa-regular fa-star', children: [
        {label: 'Getting started', url: '/docs/getting-started', icon: 'fa-regular fa-star'},
        {label: 'Calling the server', url: '/docs/calling-the-server', icon: 'fa-solid fa-server'},
        {label: 'Translations', url: '/docs/translations-guide', icon: 'fa-solid fa-plane'},
        {label: 'Stylesheets and skins', url: '/docs/groot-style', icon: 'fa-solid fa-paintbrush'},
        {label: 'Icons', url: '/docs/icons', icon: 'fa-regular fa-image'},
        {label: 'Internet explorer', url: '/docs/ie-support', icon: 'fa-brands fa-internet-explorer'},
        {label: 'Getting help', url: '/docs/getting-help', icon: 'fa-solid fa-truck-medical'},
        {label: 'External references', url: '/docs/external-references', icon: 'fa-solid fa-arrow-up-right-from-square'},
      ]
    },
    {
      label: 'Components', icon: 'fa-solid fa-bolt', url: '/demo', children: [
        {label: 'Forms', url: '/demo/forms', icon: 'fa-solid fa-pen-to-square'},
        {label: 'Buttons', url: '/demo/buttons', icon: 'fa-regular fa-hand-pointer'},
        {label: 'Tables', url: '/demo/tables', icon: 'fa-solid fa-table'},
        {label: 'Table with column selector', url: '/demo/tables-autocol', icon: 'fa-solid fa-table'},
        {isSeparator: true},
        {label: 'Footer', url: '/demo/footer', icon: 'fa-regular fa-window-maximize'},
        {label: 'Nav bar', url: '/demo/nav-bar', icon: 'fa-solid fa-bars'},
        {label: 'Side bar', url: '/demo/sidebar', icon: 'fa-solid fa-bars'},
        {label: 'Page title', url: '/demo/page-title', icon: 'fa-solid fa-table-list'},
        {isSeparator: true},
        {label: 'Tabs', url: '/demo/tabs', icon: 'fa-solid fa-table-cells-large'},
        {label: 'Boxes (accordions)', url: '/demo/boxes', icon: 'fa-solid fa-circle-chevron-down'},
        {label: 'Cards', url: '/demo/cards', icon: 'fa-solid fa-square-pen'},
        {label: 'Loading indicator', url: '/demo/loading', icon: 'fa-solid fa-rotate'},
        {label: 'Toasts', url: '/demo/toasts', icon: 'fa-solid fa-bell'},
        {label: 'Modals', url: '/demo/modals', icon: 'fa-regular fa-window-restore'},
        {label: 'Tooltips', url: '/demo/tooltips', icon: 'fa-solid fa-square'},
        {label: 'Search forms', url: '/demo/base-search-form', icon: 'fa-solid fa-magnifying-glass'},
        {label: 'Misc small components', url: '/demo/misc-small-components', icon: 'fa-solid fa-ellipsis'},
        {isSeparator: true},
        {label: 'Colors and typography', url: '/demo/colors', icon: 'fa-solid fa-paintbrush'},
        {label: 'Other utilities', url: '/demo/other-utilities'},
        {label: 'Capabilities', url: '/demo/capabilities'},
        {label: 'DUMMY HIDDEN', url: '/docs/translations-guide', requiredCapability: 'no-capability'},
      ]
    },
    {label: 'DUMMY HIDDEN', url: '/docs/translations-guide', requiredCapability: 'no-capability'},
    {
      label: 'Large applications',
      children: [
        {label: 'Plugins and lazy loading', url: '/docs-arch/plugins'}
      ]
    },
    {
      label: 'Sample with sections',
      children: [
        {label: 'Section 1', isTitle: true},
        {label: 'Item 1.1', url: '/url'},
        {label: 'Item 1.2', url: '/url'},
        {isSeparator: true},
        {label: 'Section 2', isTitle: true},
        {label: 'Item 2.1', url: '/url'},
        {label: 'Item 2.2', url: '/url'},
        {label: 'Item 2.3', url: '/url'},
      ]
    }
  ];
  readonly menu: Menu[][] = [
    [
      {label: 'Home', icon: 'fa-solid fa-house', url: '/home'}
    ],
    [
      {
        label: 'Docs',
        icon: 'fa-solid fa-book',
        children: [
          [
            {label: 'Getting started', url: '/docs/getting-started', icon: 'fa-regular fa-star'},
            {label: 'Calling the server', url: '/docs/calling-the-server', icon: 'fa-solid fa-server'},
            {
              label: 'Translations',
              url: '/docs/translations-guide',
              icon: 'fa-solid fa-plane',
              requiredCapability: 'yes-capability'
            },
            {label: 'DUMMY HIDDEN', url: '/docs/translations-guide', requiredCapability: 'no-capability'},
          ],
          [
            {label: 'Stylesheets and skins', url: '/docs/groot-style', icon: 'fa-solid fa-paintbrush'},
            {label: 'Icons', url: '/docs/icons', icon: 'fa-regular fa-image'},
          ],
          [
            {label: 'Internet explorer', url: '/docs/ie-support', icon: 'fa-brands fa-internet-explorer'},
          ],
          [
            {label: 'Getting help', url: '/docs/getting-help', icon: 'fa-solid fa-truck-medical'},
            {label: 'External references', url: '/docs/external-references', icon: 'fa-solid fa-arrow-up-right-from-square'},
          ]
        ]
      },
      {
        label: 'Components',
        icon: 'fa-solid fa-bolt',
        children: [
          [
            {label: 'Forms', url: '/demo/forms', icon: 'fa-solid fa-pen-to-square'},
            {label: 'Buttons', url: '/demo/buttons', icon: 'fa-regular fa-hand-pointer'},
            {label: 'Tables', url: '/demo/tables', icon: 'fa-solid fa-table'},
            {label: 'Tables with columns selector', url: '/demo/tables-autocol', icon: 'fa-solid fa-table'},
          ],
          [
            {label: 'Footer', url: '/demo/footer', icon: 'fa-regular fa-window-maximize'},
            {label: 'Nav bar', url: '/demo/nav-bar', icon: 'fa-solid fa-bars'},
            {label: 'Sidebar', url: '/demo/sidebar', icon: 'fa-solid fa-bars'},
            {label: 'Page title', url: '/demo/page-title', icon: 'fa-solid fa-table-list'}
          ],
          [
            {label: 'Tabs', url: '/demo/tabs', icon: 'fa-solid fa-table-cells-large'},
            {label: 'Boxes (accordions)', url: '/demo/boxes', icon: 'fa-solid fa-circle-chevron-down'},
            {label: 'Cards', url: '/demo/cards', icon: 'fa-solid fa-square-pen'},
            {label: 'Loading indicator', url: '/demo/loading', icon: 'fa-solid fa-rotate'},
            {label: 'Toasts', url: '/demo/toasts', icon: 'fa-solid fa-bell'},
            {label: 'Modals', url: '/demo/modals', icon: 'fa-regular fa-window-restore'},
            {label: 'Tooltips', url: '/demo/tooltips', icon: 'fa-solid fa-square'},
            {label: 'Search forms', url: '/demo/base-search-form', icon: 'fa-solid fa-magnifying-glass'},
            {label: 'Misc small components', url: '/demo/misc-small-components', icon: 'fa-solid fa-ellipsis'},
          ],
          [
            {label: 'Colors and typography', url: '/demo/colors', icon: 'fa-solid fa-paintbrush'},
            {label: 'Other utilities', url: '/demo/other-utilities'},
            {label: 'Capabilities', url: '/demo/capabilities'}
          ]
        ]
      }
    ]
  ];

  constructor(translationsLanguageService: TranslationsLanguageService) {
  }
}
