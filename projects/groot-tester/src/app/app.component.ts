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
    {'label': 'Getting started', 'url': '/docs/getting-started', icon: 'fa fa-star-o'},
    {
      'label': 'Components', icon: 'fa fa-flash', url: '/demo', children: [
        {label: 'Buttons', url: '/demo/buttons', icon: 'fa fa-hand-pointer-o'},
        {label: 'Tabs', url: '/demo/tabs', icon: 'fa fa-th-large'},
        {label: 'Boxes (accordions)', url: '/demo/boxes', icon: 'fa fa-chevron-circle-down'},
        {label: 'Colors and typography', url: '/demo/colors', icon: 'fa fa-paint-brush'},
        {label: 'Loading indicator', url: '/demo/loading', icon: 'fa fa-refresh'},
        {label: 'Toasts', url: '/demo/toasts', icon: 'fa fa-bell'},
        {label: 'Modals', url: '/demo/modals', icon: 'fa fa-window-restore'},
        {label: 'Cards', url: '/demo/cards', icon: 'fa fa-pencil-square'},
        {label: 'Footer', url: '/demo/footer', icon: 'fa fa-window-maximize'},
        {label: 'Tables', url: '/demo/tables', icon: 'fa fa-table'},
        {label: 'Table with column selector', url: '/demo/tables-autocol', icon: 'fa fa-table'},
        {label: 'Forms', url: '/demo/forms', icon: 'fa fa-pencil-square-o'},
        {label: 'Tooltips', url: '/demo/tooltips', icon: 'fa fa-square'},
        {label: 'Nav bar', url: '/demo/nav-bar', icon: 'fa fa-bars'},
        {label: 'Page title', url: '/demo/page-title', icon: 'fa fa-th-list'},
        {label: 'Other utilities', url: '/demo/other-utilities'},
        {label: 'Capabilities', url: '/demo/capabilities'},
      ]
    }
  ];
  readonly menu: Menu[][] = [
    [
      {label: 'Home', icon: 'fa fa-home', url: '/home'}
    ],
    [
      {
        label: 'Docs',
        icon: 'fa fa-book',
        children: [
          [
            {label: 'Getting started', url: '/docs/getting-started', icon: 'fa fa-star-o'},
            {label: 'Calling the server', url: '/docs/calling-the-server', icon: 'fa fa-server'},
            {
              label: 'Translations',
              url: '/docs/translations-guide',
              icon: 'fa fa-plane',
              requiredCapability: 'yes-capability'
            },
            {label: 'DUMMY HIDDEN', url: '/docs/translations-guide', requiredCapability: 'no-capability'},
          ],
          [
            {label: 'Stylesheets and skins', url: '/docs/groot-style', icon: 'fa fa-paint-brush'},
            {label: 'Icons', url: '/docs/icons', icon: 'fa fa-picture-o'},
          ],
          [
            {label: 'Internet explorer', url: '/docs/ie-support', icon: 'fa fa-internet-explorer'},
          ],
          [
            {label: 'Getting help', url: '/docs/getting-help', icon: 'fa fa-ambulance'},
            {label: 'External references', url: '/docs/external-references', icon: 'fa fa-external-link'},
          ]
        ]
      },
      {
        label: 'Components',
        icon: 'fa fa-flash',
        children: [
          [
            {label: 'Buttons', url: '/demo/buttons', icon: 'fa fa-hand-pointer-o'},
            {label: 'Tabs', url: '/demo/tabs', icon: 'fa fa-th-large'},
            {label: 'Boxes (accordions)', url: '/demo/boxes', icon: 'fa fa-chevron-circle-down'},
            {label: 'Colors and typography', url: '/demo/colors', icon: 'fa fa-paint-brush'}
          ],
          [
            {label: 'Loading indicator', url: '/demo/loading', icon: 'fa fa-refresh'},
            {label: 'Toasts', url: '/demo/toasts', icon: 'fa fa-bell'},
            {label: 'Modals', url: '/demo/modals', icon: 'fa fa-window-restore'},
            {label: 'Cards', url: '/demo/cards', icon: 'fa fa-pencil-square'},
            {label: 'Footer', url: '/demo/footer', icon: 'fa fa-window-maximize'},
          ],
          [
            {label: 'Tables', url: '/demo/tables', icon: 'fa fa-table'},
            {label: 'Tables with columns selector', url: '/demo/tables-autocol', icon: 'fa fa-table'},
            {label: 'Forms', url: '/demo/forms', icon: 'fa fa-pencil-square-o'},
            {label: 'Tooltips', url: '/demo/tooltips', icon: 'fa fa-square'},
            {label: 'Nav bar', url: '/demo/nav-bar', icon: 'fa fa-bars'},
            {label: 'Page title', url: '/demo/page-title', icon: 'fa fa-th-list'}
          ],
          [
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
