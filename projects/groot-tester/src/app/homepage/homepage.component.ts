import {Component} from '@angular/core';
import {Release, ReleaseChangeType} from './release.model';

/* tslint:disable:max-line-length */
const RELEASE_NOTES: Release[] = [
  {
    version: '0.5.3', released: false, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed placeholder color for IE and firefox.`
      }
    ]
  },
  {
    version: '0.5.2', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Handled case in which no valid data is sent to the pipe <code>ftDate</code>.`
      }
    ]
  },
  {
    version: '0.5.1', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New function <code>translateStrings</code> to translate an array of strings, similar to the existing
<code>translateLabels</code>.`
      }
    ]
  },
  {
    version: '0.5.0', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Supported the case "loading failed" for tables. Please see the <a href="#demo/tables">tables documentation page</a>.`
      },
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `You need to add four labels to your translations: <table class="table table-sm">
<thead class="thead-light">
<tr><th>Label</th><th>en</th><th>it</th></tr>
</thead>
<tr><td>common.dynamicGui.cannotLoad.title</td><td>Error</td><td>Errore</td></tr>
<tr><td>common.dynamicGui.cannotLoad.details</td><td>Cannot load the records. Please try again later.</td><td>Impossibile caricare i record. Si prega di ritentare in seguito.</td></tr>
<tr><td>common.dynamicGui.cannotSave.title</td><td>Error</td><td>Errore</td></tr>
<tr><td>common.dynamicGui.cannotSave.details</td><td>Could not save your changes. Please try again later.</td><td>Non è stato possibile salvare le modifiche. Si prega di ritentare in seguito.</td></tr>
</table>`
      }
    ]
  },
  {
    version: '0.4.16', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Introduced a sass function <code>extract-from-compact</code> to extract a side from a padding or margin compact definition.`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed a bug with the margin of the <code>table-header</code> in case the table padding is customized.`
      }
    ]
  },
  {
    version: '0.4.15', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added a new component <code>groot-page-title</code>. Check out <a href="#demo/page-title">its page</a> for a demo.`
      }
    ]
  },
  {
    version: '0.4.14', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added response details argument to <code>NotificationToastService::showGenericCannotSaveNotification</code>.`
      }
    ]
  },
  {
    version: '0.4.13', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added some methods to <code>NotificationToastService</code> to generate standard notifications
for "saved", "cannot save", "cannot load".`
      }
    ]
  },
  {
    version: '0.4.12', released: false, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: ` Added new event (<code>enter</code>) for component <code>groot-input</code> on 'enter key' pressed event.
The event will be triggered if the text is not already sent.`
      }
    ]
  },
  {
    version: '0.4.11', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Solved  <code>horizontalLabel</code> value of <code>groot-toggle-button</code>:
               when <code>horizontalLabel</code> is set to true, the label is actually in horizontal position.`
      }
    ]
  },
  {
    version: '0.4.10', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Solved a bug when calling Made the method <code>reloadTable</code> of
<code>GrootTableComponent</code> during initialization.`
      }
    ]
  },
  {
    version: '0.4.9', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Made the method <code>reloadTable</code> of <code>GrootTableComponent</code> public.`
      }
    ]
  },
  {
    version: '0.4.8', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Allowed the user of <code>groot-table</code> to disable the class <code>table-striped</code>.`
      }
    ]
  },
  {
    version: '0.4.7', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added new component <code>groot-table</code> to simplify creating tables. See the
<a href="#/demo/tables">tables documentation</a> for the details.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added possibility to have horizontal label for <code>groot-toggle-button</code>.`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Added missing label translation for <code>groot-toggle-button</code>.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Restyled the <code>groot-nav-bar</code> (simple navbar).`
      }
    ]
  },
  {
    version: '0.4.6', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE, html: `More animations for the <code>groot-nav-bar</code>.`
      }
    ]
  },
  {
    version: '0.4.3', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Enable support for scrollbar in tables.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added pipe <code>ftDate</code>, similar to <code>ftTime</code>, to format FastTrack's dates.`
      }
    ]
  },
  {
    version: '0.4.2', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Restyled <code>groot-nav-bar</code>.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Animated the <code>groot-nav-bar</code>.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added a new style for the table: <code>thead-primary</code>.`
      }
    ]
  },
  {
    version: '0.4.1', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX, html: `Fixed a bug that prevented any application from compling. Ups!`
      }
    ]
  },
  {
    version: '0.4.0', released: true, changes: [
      {
        type: ReleaseChangeType.BREAKING_CHANGE, html: `
Added support for capabilities. Note that you <i>need</i> to add a provider for the <code>GrootCapabilityService</code>.
See <a href="#/demo/capabilities">the capabilities page</a> for details.
`
      },
      {
        type: ReleaseChangeType.BREAKING_CHANGE, html: `
Added dropdown from ngx-bootstrap to the nav bar. You need to add <code>BsDropdownModule.forRoot()</code> to your module imports
`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE, html: `
Animated the <code>groot-collapsible-box</code>.
`
      }
    ]
  },
  {
    version: '0.3.2', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Allowed table title bar to receive a url callback rather than a string.`
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
Added new boolean toggle component <code>groot-toggle-button</code>. See the <a href="#/demo/forms">forms page</a>
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
Allowed customization of rendering of an item in the combo. See the <a href="#/demo/forms">forms page</a>
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

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent {
  releases: Release[] = RELEASE_NOTES;

  onlyBreakingChanges = false;

  filterReleases() {
    if (this.onlyBreakingChanges) {
      this.releases = RELEASE_NOTES.filter(release => release.changes.some(change => change.type === ReleaseChangeType.BREAKING_CHANGE));
    } else {
      this.releases = RELEASE_NOTES;
    }
  }
}
