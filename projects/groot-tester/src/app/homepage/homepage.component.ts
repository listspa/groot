import {Component} from '@angular/core';
import {Release, ReleaseChangeType} from './release.model';
import {BsDropdownModule} from "ngx-bootstrap";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {
  releases: Release[] = [
    {
      version: '0.4.0', released: false, changes: [
        {
          type: ReleaseChangeType.BREAKING_CHANGE, html: `
Added support for capabilities. Note that you <i>need</i> to add a provider for the <code>GrootCapabilityService</code>.
See <a routerLink="/demo/capabilities">the capabilities page</a> for details.
`
        },
        {
          type: ReleaseChangeType.BREAKING_CHANGE, html: `
Added dropdown from ngx-bootstrap to the nav bar. You need to add <code>BsDropdownModule.forRoot()</code> to your module imports
`
        }
      ]
    },
    {
      version: '0.3.1', released: true, changes: [
        {
          type: ReleaseChangeType.BREAKING_CHANGE, html: `
Added an appropriate label, for the table headers, in case "no rows found". Note: you need to add a translation with the key
<code>"common.noRowsFound"</code> (the label should be something like "No rows found").
`
        },
        {
          type: ReleaseChangeType.NEW_FEATURE, html: `
Added new boolean toggle component <code>groot-toggle-button</code>. See the <a routerLink="/demo/forms">forms page</a>
for a demo and the details.
`
        }
      ]
    },
    {
      version: '0.3.0', released: true, changes: [
        {
          type: ReleaseChangeType.BREAKING_CHANGE, html: `
Changed the <code>LoadingService</code>: removed the <code>doneLoading()</code> function. Now the
<code>startLoading()</code> function returns a function that you should invoke to signal the loading
completion.`
        },
        {
          type: ReleaseChangeType.NEW_FEATURE, html: `
Allowed customization of rendering of an item in the combo. See the <a routerLink="/demo/forms">forms page</a>
for a demo and the details.
      `
        }, {
          type: ReleaseChangeType.NEW_FEATURE, html: `
Removed week numbers in the date picker.
      `
        }
      ]
    }
  ];
}
