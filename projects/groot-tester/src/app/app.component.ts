import {Component} from '@angular/core';
import {BsLocaleService} from 'ngx-bootstrap';
import {TranslateService} from '@ngx-translate/core';
import {Menu} from '../../../groot/src/lib/components/nav-bar/nav-bar.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
            {label: 'Getting help', url: '/docs/getting-help', icon: 'fa fa-ambulance'},
          ],
          [
            {label: 'Stylesheets and skins', url: '/docs/groot-style', icon: 'fa fa-paint-brush'},
            {label: 'Icons', url: '/docs/icons', icon: 'fa fa-picture-o'},
            {label: 'Translations', url: '/docs/translations-guide', icon: 'fa fa-plane'},
          ],
          [
            {label: 'Internet explorer', url: '/docs/ie-support', icon: 'fa fa-internet-explorer'},
          ],
          [
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
            {label: 'Modals', url: '/demo/modals', icon: 'fa fa-window-maximize'}
          ],
          [
            {label: 'Tables', url: '/demo/tables', icon: 'fa fa-table'},
            {label: 'Forms', url: '/demo/forms', icon: 'fa fa-pencil-square-o'},
            {label: 'Tooltips', url: '/demo/tooltips', icon: 'fa fa-square'},
            {label: 'Nav bar', url: '/demo/nav-bar', icon: 'fa fa-bars'}
          ],
          [
            {label: 'Other utilities', url: '/demo/other-utilities'}
          ]
        ]
      }
    ]
  ];

  constructor(translate: TranslateService,
              localeService: BsLocaleService) {
    translate.use('en');
    localeService.use('en');
  }
}
