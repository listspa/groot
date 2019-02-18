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
      {
        label: 'Home', icon: 'fa fa-home', url: '/home'
      }
    ],
    [
      {
        label: 'Docs',
        icon: 'fa fa-book',
        children: [
          [
            {label: 'Getting started', url: '/docs/getting-started'},
            {label: 'Getting help', url: '/docs/getting-help'},
          ],
          [
            {label: 'Stylesheets and skins', url: '/docs/groot-style'},
            {label: 'Icons', url: '/docs/icons'},
          ],
          [
            {label: 'Internet explorer', url: '/docs/ie-support', icon: 'fa fa-internet-explorer'},
          ],
          [
            {label: 'External references', url: '/docs/external-references'},
          ]
        ]
      },
      {
        label: 'Components',
        icon: 'fa fa-flash',
        children: [
          [
            {label: 'Buttons', url: '/demo/buttons'},
            {label: 'Tabs', url: '/demo/tabs'},
            {label: 'Boxes (accordions)', url: '/demo/boxes'},
            {label: 'Colors and typography', url: '/demo/colors'}
          ],
          [
            {label: 'Loading indicator', url: '/demo/loading', icon: 'fa fa-refresh'},
            {label: 'Toasts', url: '/demo/toasts'},
            {label: 'Modals', url: '/demo/modals', icon: 'fa fa-window-maximize'}
          ],
          [
            {label: 'Tables', url: '/demo/tables', icon: 'fa fa-table'},
            {label: 'Forms', url: '/demo/forms'},
            {label: 'Tooltips', url: '/demo/tooltips'}
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
