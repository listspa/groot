import {Component} from '@angular/core';
import {Release, ReleaseChangeType} from './release.model';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {
  releases: Release[] = [
    {
      version: 'next', released: false, changes: [
        {
          type: ReleaseChangeType.BREAKING_CHANGE, html: `
Added an appropriate label, for the table headers, in case "no rows found". Note: you need to add a translation with the key
<code>"common.noRowsFound"</code> (the label should be something like "No rows found").
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
