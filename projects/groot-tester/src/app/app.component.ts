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
        label: 'demo pages',
        icon: 'fa fa-thumbs-up',
        children: [
          [
            {
              label: 'demo index',
              url: '/demo'
            }
          ],
          [
            {
              label: 'buttoms',
              url: '/demo/buttons'
            },
            {
              label: 'tabs',
              url: '/demo/tabs'
            }
          ],
          [
            {
              label: 'loading',
              url: '/demo/loading',
              icon: 'fa fa-refresh'
            },
            {
              label: 'toasts',
              url: '/demo/toasts'
            },
          ],
          [
            {
              label: 'tables',
              url: '/demo/tables',
              icon: 'fa fa-table'
            }
          ]
        ]
      }
    ],
    [
      {
        label: 'tests',
        children: [
          [
            {
              label: 'test.1',
              children: [
                [
                  {
                    label: 'test.1.1',
                    children: [
                      [
                        {label: 'test.1.1.1', url: '/test111'},
                        {label: 'test.1.1.2', url: '/test112'},
                      ],
                      [
                        {label: 'test.1.1.3', url: '/test113'},
                      ]
                    ]
                  },
                  {label: 'test.1.2', url: '/test12'}
                ],
                [
                  {label: 'test.1.3', url: '/test13'},
                  {label: 'test.1.4', url: '/test14'}
                ],
                [
                  {label: 'test.1.5', url: '/test15'}
                ],
                [
                  {label: 'test.1.6', url: '/test16'}
                ]
              ]
            }
          ],
          [
            {
              label: 'test.2',
              children: [
                [
                  {label: 'test.2.1', url: '/test21'},
                ],
                [
                  {label: 'test.2.2', url: '/test22'}
                ]
              ]
            }
          ],
          [
            {
              label: 'test.3',
              children: [
                [
                  {label: 'test.3.1', url: '/test31'},
                ]
              ]
            },
            {
              label: 'test.4',
              children: [
                [
                  {label: 'test.4.1', url: '/test41'},
                  {label: 'test.4.2', url: '/test42'}
                ]
              ]
            }
          ],
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
