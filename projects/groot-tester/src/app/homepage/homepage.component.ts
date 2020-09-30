import {Component} from '@angular/core';
import {Release, ReleaseChangeType} from './release.model';

/* tslint:disable:max-line-length */
/* tslint:disable:no-trailing-whitespace */
const RELEASE_NOTES: Release[] = [
  {
    version: '0.22.4', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed a bug in <code>groot-combo</code> with <code>fetchDataIncrementally=true</code> that caused the structure <code>ComboDataRequestWithSelected</code> to be emitted even when <code>toggleShowOnlySelected=false</code> and <code>ComboDataRequest</code> should be emitted instead`
      },
    ]
  },
  {
    version: '0.22.3', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added option dropDownPosition to <code>groot-combo</code>`
      },
    ]
  },
  {
    version: '0.22.2', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added option for icon in <code>groot-darwin-page-title</code>`
      },
    ]
  },
  {
    version: '0.22.1', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed typo in <code>public_api.ts</code> that caused build to fail`
      },
    ]
  },
  {
    version: '0.22.0', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added component <a href="#/demo/sidebar"><code>groot-darwin-side-bar</code></a>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added component <a href="#/demo/page-title"><code>groot-darwin-page-title</code></a>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added component <a href="#/demo/misc-small-components"><code>groot-darwin-breadcrumbs</code></a>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added component <a href="#/demo/buttons"><code>groot-split-button</code></a>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New utilities function <code>deepCopy</code> and <code>deepCompare</code>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New utilities function <code>deepCopy</code> and <code>deepCompare</code>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New utility function <code>unsubscribeSafe</code>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New utilities functions <code>validateForm</code> and <code>unTouchForm</code>`
      },
    ],
  },
  {
    version: '0.21.5', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added class <code>bs-datepicker-today</code> for "today" in datepicker.
No styling was added in Groot, but it's now possible to customize it in your own css.`
      },
    ],
  },
  {
    version: '0.21.4', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Avoid angular warnings about "disabled" when using combo and form controls`
      },
    ],
  },
  {
    version: '0.21.3', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Error in view form with a radio button disabled`
      },
    ],
  },
  {
    version: '0.21.2', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added error/missing indicator for <code>groot-radio</code> when it is used with <code>FormControl</code>`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Added check to prevent possible null/undefined errors in <code>groot-combo</code>.`
      }
    ]
  },
  {
    version: '0.21.1', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Handled FormControl in groot combo.`
      }
    ]
  },
  {
    version: '0.21.0', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `In combo with multiple choices, there was no "clear selection" icon`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `In combo used as listbox, the placeholder was underneath the selected items and not hidden`
      },
    ]
  },
  {
    version: '0.20.8', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added an event to <code>groot-actions-button</code> when it's toggled`
      },
    ]
  },
  {
    version: '0.20.7', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Uniformed the background color of disabled combo to other disabled components`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed margin-bottom of <code>groot-file-input</code>`
      },
    ]
  },
  {
    version: '0.20.6', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `It's now possible to reset a radio by assigning null to the model field`
      }
    ]
  },
  {
    version: '0.20.5', released: true, changes: [
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `In all goot inputs, validation is done on <code>touched</code>.
Previous validation logic may no longer work.`
      }
    ]
  },
  {
    version: '0.20.4', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed a memory leak: the toasts' click observable is now completed when
the toast is removed`
      }
    ]
  },
  {
    version: '0.20.3', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New directive <code>grootTabOrder</code> to fix order of tabs, even when <code>*ngIf</code> is used`
      }
    ]
  },
  {
    version: '0.20.2', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Added default custom search function in <code>groot-combo</code> to handle search with translate labels`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added possibility to use custom search function in <code>groot-combo</code>`
      }
    ]
  },
  {
    version: '0.20.1', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed invalid flag for <code>groot-file-input</code> which are single-choice`
      },
    ]
  },
  {
    version: '0.20.0', released: true, changes: [
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `Renamed file input component class to <code>GrootFileInputComponent</code>. <i>Note:</i> only the
typescript class changed; the component selector's didn't, so it's more than likely you have nothing to do.`
      },
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `Fixed flags <code>dirty</code>, <code>pristine</code> and <code>touched</code> for the various
input components. This fix has a <b>big breaking change:</b> <code>(ngModelChange)</code> is not emitted any
more at the form creation, since the inputs aren't (incorrectly) changed.
<br>
It's possible you were relying on this mechanism, so <i>be careful!</i>
`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `<code>groot-file-input</code> now supports placeholders and handles correctly the disabled
and required flags.`
      }
    ]
  },
  {
    version: '0.19.18', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed file input width when clear is hidden in <code>groot-file-input</code>`
      }
    ]
  },
  {
    version: '0.19.17', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Removed the initial text from <code>groot-file-input</code> since it doesn't work properly`
      }
    ]
  },
  {
    version: '0.19.16', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Support for initial text, clear button and fixed background color of
<code>groot-file-input</code>`
      }
    ]
  },
  {
    version: '0.19.15', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `In <code>_actions-button</code> if button is disabled, do not change color on hover.`
      }
    ]
  },
  {
    version: '0.19.14', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Introduced properties to customize <code>ConfirmModalComponent</code>:
            <ul>
                <li><code>headerClasses</code></li>
                <li><code>bodyClasses</code></li>
                <li><code>footerClasses</code></li>
                <li><code>footerCancelClasses</code></li>
                <li><code>footerConfirmClasses</code></li>
            </ul>`
      }
    ]
  },
  {
    version: '0.19.13', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Introduced property <code>[hidePlaceholder]="true"</code> to remove the placeholder
from the various input components`
      }
    ]
  },
  {
    version: '0.19.12', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Bug fix in <code>groot-combo</code> when <code>bindLabel</code> refers to a sub-path
of the object rather than a field`
      }
    ]
  },
  {
    version: '0.19.11', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added the option <code>disabled</code> to <code>groot-actions-button-entry</code>`
      }
    ]
  },
  {
    version: '0.19.10', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `The <code>groot-combo</code> can automatically translate the labels of the items
if it received <code>[translateItemText]=true</code>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added some more common translations`
      },
    ]
  },
  {
    version: '0.19.9', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed toasts leaving animation with Firefox`
      },
    ]
  },
  {
    version: '0.19.8', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed issues with the new scss variables to customize the color of the combo's arrow:
<code>$ng-select-arrow-hover</code>`
      },
    ]
  },
  {
    version: '0.19.7', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added new scss variables to customize the color of the combo's arrow: <code>$ng-select-arrow</code>`
      },
    ]
  },
  {
    version: '0.19.6', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Add headerLabel to <code>groot-table</code> to modify the title`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Add showPageInfo to <code>groot-table</code> to (not) display the number of rows shown`
      }
    ]
  },
  {
    version: '0.19.5', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Add toggleShowOnlySelected to <code>groot-combo</code>`
      }
    ]
  },
  {
    version: '0.19.4', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Add min and max to <code>groot-date-picker</code>`
      }
    ]
  },
  {
    version: '0.19.3', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Add custom error message to <code>groot-input</code>`
      }
    ]
  },
  {
    version: '0.19.2', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Open one <code>groot-date-picker</code> at the time`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Manage invalid date in <code>groot-date-picker</code> with formatting`
      }
    ]
  },
  {
    version: '0.19.1', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New attribute <code>format</code> in <code>groot-date-picker</code>`
      }
    ]
  },
  {
    version: '0.19.0', released: true, changes: [
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `It is necessary to run <code>npm install --save mdn-polyfills</code> and to add,
in <code>polyfills.ts</code>, a line <code>import 'mdn-polyfills/MouseEvent';</code>.`
      }
    ]
  },
  {
    version: '0.18.10', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New helper functions <code>filterLike</code> and <code>filterTimestamp</code>`
      }
    ]
  },
  {
    version: '0.18.9', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed css classes added to <code>groot-action-button</code> to help customizations`
      }
    ]
  },
  {
    version: '0.18.8', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added some css classes to <code>groot-action-button</code> to help customizations`
      }
    ]
  },
  {
    version: '0.18.7', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Allow <code>groot-action-button</code> to use the "hamburger" icon`
      }
    ]
  },
  {
    version: '0.18.6', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed <code>groot-action-button</code> on IE11`
      }
    ]
  },
  {
    version: '0.18.5', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Accidentally swapped the icon and the text "last" of the paginator in the previous version. Fixed.`
      },
    ]
  },
  {
    version: '0.18.4', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New component <code>groot-info-icon</code> to display an "i" icon with a
customizable popover template`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `The table paginator has some more css classes to allow simpler customization of
"First" and "Last" text`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `<code>groot-toggle-button</code> can optionally show an "info" icon with a
customizable template popover`
      },
    ]
  },
  {
    version: '0.18.3', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Introduced a new directive <code>[groot-provide-parent-form]</code> that allows
child components to register in the parent form component, thus allowing validation`
      },
    ]
  },
  {
    version: '0.18.2', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `the <code>groot-combo</code> required the import of <code>ng-select</code>`
      },
    ]
  },
  {
    version: '0.18.1', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `the <code>groot-combo</code> has the new tag <code>addTag</code> inherited from <code>ng-select</code>`
      },
    ]
  },
  {
    version: '0.18.0', released: true, changes: [
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `You need to add <code>ReactiveFormsModule</code> in the import list of your main app module`
      },
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `Removed support for deprecated <code>groot-combo-checkbox</code>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Introduced support for reactive form controls to various form components: input, textarea, date picker,
checkbox, radio.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Introduced a css class <code>flex-grow-2</code> analogue to the bootstrap <code>flex-grow-0</code>
and <code>flex-grow-1</code>`
      },
    ]
  },
  {
    version: '0.17.0', released: true, changes: [
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `You need to add <code>BrowserAnimationsModule</code> to the list of imports of your
main app module`
      },
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `You need to run <code>npm install file-saver</code>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: 'Supported explicitly angular 8'
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: 'New interface <code>SortPagination</code>'
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: 'Added some common translations: <code>common.list, common.view</code>'
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Changed download button style to use excel's color, rather than the brand`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Slight improvement in padding of table headers`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `<code>groot-display-value</code> and <code>groot-display-label-value</code>
take as parameter the locale plus the formats for dates, hours and doubles digits`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `It is now possible to use Groot in a lazy-loaded child module`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed a variable name in scss to avoid clashes with ag-grid`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Made <code>groot-page-title</code> work with sub-modules routes`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Added <code>container=body</code> to the popover of the <code>groot-action-buttons</code> to fix
problems with embedding inside an \`agGrid\``
      }
    ]
  },
  {
    version: '0.16.1', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed <code>NoCacheInterceptor</code>: it was missing in the public api`
      }
    ]
  },
  {
    version: '0.16.0', released: true, changes: [
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `Added <code>NoCacheInterceptor</code> to fix problem with IE and ajax requests in GET.
Add it to your application module like this: <code>{provide: HTTP_INTERCEPTORS, useClass: NoCacheInterceptor, multi: true}</code>.`
      }
    ]
  },
  {
    version: '0.15.2', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed translation for the last update timestamp.`
      }
    ]
  },
  {
    version: '0.15.1', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Both <code>groot-table</code> and <code>groot-table-autocol</code> support optionally an input for
the last update timestamp, that will be shown near the refresh icon.`
      }
    ]
  },
  {
    version: '0.15.0', released: true, changes: [
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `Changed namespace and deployment url: we now use artifactory.list-group.com and have changed the package
namespace from <code>listspa</code> to <code>listgroup</code>. This means that you have to uninstall the old package and
install the new one. Furthermore, in your main scss file you have to replace the path of the main groot css. You also
have to change all the imports everywhere: run a replace <code>@listspa/groot</code> to <code>@listgroup/groot</code>.
<br>
Finally, you have to change your <code>npmrc</code>: see the <a href="/docs/getting-started">getting started</a> page for
details.<br>
Note also that before making your first release, you need to login on artifactory. See the instructions in the
<code>CONTRIBUTING.md</code> file.`
      },
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `Modified <code>TableAutocolConfigServiceBase</code> to use observables rather than immediate
calls. You now need to call the <code>init</code> method explicitly and to subscribe to the observables
returned by the <code>save</code> methods.`
      }
    ]
  },
  {
    version: '0.13.9', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: 'Fixed size of comparison operator in the autocol filters\' popup on IE'
      }
    ]
  },
  {
    version: '0.13.8', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: 'Fixed hand cursor for refresh icon in tables.'
      }
    ]
  },
  {
    version: '0.13.7', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `<code>groot-table-autocol</code> and simple <code>groot-table</code> have a new attribute,
<code>showRefreshIcon</code>. If <code>true</code>, a new refresh icon appears after row counting; clicking on it
reloads the table. Default value is <code>false</code>.`
      },
    ]
  },
  {
    version: '0.13.5', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed a regression with <code>ft-time</code>`
      },
    ]
  },
  {
    version: '0.13.4', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed again the directive <code>grootNeedsCapability</code>: it now sets an <code>important</code> on the generated css`
      },
    ]
  },
  {
    version: '0.13.3', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Implemented new route guard <code>GrootMayRouteWithCapabilityGuard</code> to require a capability before
allowing access to a given route`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `The navbar simple items did not support correctly the capabilities`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Made the directive <code>grootNeedsCapability</code> capable of overriding a display class on the element`
      },
    ]
  },
  {
    version: '0.13.2', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Handled specially selection of exactly one value for combo checkboxes`
      },
    ]
  },
  {
    version: '0.13.1', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `The <code>dateUtils</code> exposes a new method, <code>sprintfYYYYMMDD</code>. It allows to print a date in a string following the format YYYYMMDD with an (optional) separator.`
      },
    ]
  },
  {
    version: '0.13.0', released: true, changes: [
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `You need to run <code>npm install @angular/cdk</code> once. Do not worry, it will not be included
in your application unless you start using it.`
      },
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `In your app module you need to import the module <code>PopoverModule.forRoot()</code>.`
      },
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `Deprecated the component <code>groot-combo-checkbox</code>: use simply the <code>groot-combo</code>
with the flag <code>[checkboxes]="true"</code>.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Introduced the <code>groot-table-autocol</code>: a table with selectable,
draggable and resizable columns. See the <a href="#/demo/tables-autocol">demo page</a>
for details.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Extended the combo to support a listbox-like mode, which means always opened.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Extended the combo with virtual scrolling and server-side filtering.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New component <code>groot-yes-no-check</code> to show a check or a cross depending
on a boolean value. See its <a href="#/demo/misc-small-components">documentation page</a>.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New component <code>groot-actions-button</code> to show a clickable button which
shows a menu when clicked. See its <a href="#/demo/misc-small-components">documentation page</a>.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New component <code>groot-display-label-value</code> to display a pair label and value.
New component <code>groot-display-value</code> with the value part only. See its
<a href="#/demo/misc-small-components">documentation page</a>.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New css classes to improve the accordion look & feel. See the
<a href="#/demo/tables">tables documentation page</a> for the example.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New function <code>compareBy</code> to help sort arrays of objects.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New functions <code>startIndex</code> and <code>endIndex</code> to work
with <code>Pagination</code> objects.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `The <code>groot-combo</code> has a flag <code>clearable</code> which can be used
to disable the "clear" icon.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `The <code>groot-navbar</code> supports titles and separators.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `The <code>groot-navbar</code> highlights the currently selected item.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added pipe <code>grootDate</code>. It allows to transform a string in a Date specifying both input and output patterns.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `The <code>groot-combo</code> allows the header template to be customized.`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Filters ftDate and ftTime now work even with null or empty values.`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed issues with the footer covering part of the page via the new class <code>container-with-sticky-footer</code>.
See the <a href="#/demo/footer">footer documentation</a> for details.`
      }
    ]
  },
  {
    version: '0.12.4', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Allowed left and right template for the groot input, more complex than a simple icon
(which is still supported). See the <a href="#/demo/forms">forms page</a> for an example.`
      }
    ]
  },
  {
    version: '0.12.3', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Allowing in the various inputs to pass a placeholder text, different from the label.`
      }
    ]
  },
  {
    version: '0.12.2', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Resolved a warning in console when using a <code>groot-date-picker</code>`
      }
    ]
  },
  {
    version: '0.12.1', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Groot table can also show headers when empty.`
      }
    ]
  },
  {
    version: '0.12.0', released: true, changes: [
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `Built-in groot translations can automatically be used if you replace <code>TranslateHttpLoader</code>
with <code>GrootTranslateHttpLoader</code> in your app module. It is not really a breaking change, but it's very much
recommended!`
      }
    ]
  },
  {
    version: '0.11.0', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Made the animations work with Angular 7.2.8+.`
      },
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `Removed the <code>dropDown</code> animation. You now need to use <code>dropDownOnCreateAnimation</code>,
which works with any <code>*ngIf</code>, rather than defining the state <code>collapsed/expanded</code>.`
      }
    ]
  },
  {
    version: '0.10.10', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Aligned checkboxes and radio`
      }
    ]
  },
  {
    version: '0.10.9', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed validity of disabled groot-input (if not pristine it was considered invalid)`
      }
    ]
  },
  {
    version: '0.10.8', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed IE weird autocomplete feature in the <code>groot-combo</code>`
      }
    ]
  },
  {
    version: '0.10.7', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added an example and some css classes for tables with an accordion`
      }
    ]
  },
  {
    version: '0.10.6', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `The labels in the <code>groot-combo-checkbox</code> should be in bold, similar to the other ones`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added function <code>parseDate</code>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `The <code>groot-table-title-bar</code> component can show additional widgets to the right (i.e.
a "new" button or a search box.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Created directives <code>grootTableHeader</code>, <code>grootTableBody</code>
and <code>grootTableTitleRightArea</code> to simply pass the table header, body template and additional header buttons
to the <code>groot-table</code>, avoiding passing the input explicitly. See the updated example in the
<a href="#/demo/tables">tables documentation page.</a>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `The labels of the various input components are now optional.`
      }
    ]
  },
  {
    version: '0.10.5', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `The <code>groot-table</code> takes an optional parameter <code>hideTitleBar</code>`
      }
    ]
  },
  {
    version: '0.10.4', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added new input <code>selectable</code> to the groot table`
      }
    ]
  },
  {
    version: '0.10.3', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `CSS tweaks to cards and boxes`
      }
    ]
  },
  {
    version: '0.10.2', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Introduced the <a href="#/demo/cards">cards</a> components`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Allowed to pass the type of a <code>groot-input</code> (i.e. <code>numeric, password, ...</code>)`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Raised slightly the notifications toasts to avoid being on top of the footer`
      }
    ]
  },
  {
    version: '0.10.1', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added <code>UploadFileService</code> to simplify sending a file to the server`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `The <code>groot-table-header</code> component supports a <code>literalLabel</code> argument, which will not be translated`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `The <code>groot-combo</code> and <code>groot-combo-checkbox></code> components did not have the correct
margin-bottom that the other inputs have`
      },
    ]
  },
  {
    version: '0.10.0', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added component <code>groot-footer</code>. See <a href="#/demo/footer">its documentation</a>
for the details`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `We now store and reload the last selected language at the startup. See the
<a href="#/docs/translations-guide">translations guide page</a> for details.`
      },
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `In your app component, ask for injection of <code>translationsLanguageService:
TranslationsLanguageService</code> rather than <code>TranslateService</code> and <code>BsLocaleService</code>`
      }
    ]
  },
  {
    version: '0.9.0', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Changed success color to make it far more readable.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Allowed placing an icon inside a <code>groot-table-header</code>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added <code>ConfirmModalService</code> to help ask for a simple yes/no confirmation. See
<a href="#/demo/modals">the modals documentation page</a> for details.`
      },
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `You need to add two labels to your translations:
<table class="table table-sm">
  <thead class="thead-light">
    <tr>
      <th>Label</th>
      <th>en</th>
      <th>it</th>
    </tr>
  </thead>
  <tr>
    <td>common.delete</td><td>Delete</td><td>Elimina</td>
  </tr>
  <tr>
    <td>common.confirm</td><td>Confirm</td><td>Conferma</td>
  </tr>
  <tr>
    <td>common.pleaseConfirm</td><td>Please confirm</td><td>Conferma richiesta</td>
  </tr>
  <tr>
    <td>common.yes</td><td>Yes</td><td>Sì</td>
  </tr>
  <tr>
    <td>common.no</td><td>No</td><td>No</td>
  </tr>
</table>`
      }
    ]
  },
  {
    version: '0.8.0', released: true, changes: [
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `Changed classes for <code>buttons-list</code>: now you need to use <code>buttons-list-right</code> or similar.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added class <code>table-selectable</code>.`
      },
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Fixed some look & feel issues with the css class <code>thead-primary</code>`
      }
    ]
  },
  {
    version: '0.7.1', released: true, changes: [
      {
        type: ReleaseChangeType.BUG_FIX,
        html: `Attempt to make <code>groot-file-input</code> validation work correctly when the form is reset`
      }
    ]
  },
  {
    version: '0.7.0', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Introduced new component <code>groot-button</code>. See <a href="#/demo/buttons">the buttons page</a>
for a sample and the documentation.`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Introduced new component <code>groot-file-input</code>.`
      },
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `You need to add two labels to your translations:
<table class="table table-sm">
  <thead class="thead-light">
    <tr>
      <th>Label</th>
      <th>en</th>
      <th>it</th>
    </tr>
  </thead>
  <tr>
    <td>common.browse</td><td>Browse</td><td>Scegli</td>
  </tr>
  <tr>
    <td>common.upload</td><td>Upload</td><td>Upload</td>
  </tr>
</table>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `New css class <code>buttons-list-bottom-left</code>.`
      }
    ]
  }, {
    version: '0.6.0', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `It is possible to override more labels for the <code>groot-combo</code> element.`
      },
      {
        type: ReleaseChangeType.BREAKING_CHANGE,
        html: `You need to add five labels to your translations:
              <table class="table table-sm">
                <thead class="thead-light">
                  <tr>
                    <th>Label</th>
                    <th>en</th>
                    <th>it</th>
                  </tr>
                </thead>
                <tr>
                  <td>combo.noItems</td><td>No items found</td><td>Nessun elemento trovato</td>
                 </tr>
                 <tr>
                  <td>combo.addItem</td><td>Add item</td><td>Aggiungi elemento</td>
                 </tr>
                 <tr>
                  <td>combo.clearAll</td><td>Clear all</td><td>Rimuovi tutti</td>
                 </tr>
                 <tr>
                  <td>combo.loading</td><td>Loading...</td><td>Caricamento...</td>
                 </tr>
                 <tr>
                  <td>combo.typeToSearch</td><td>Type to search</td><td>Scrivi per ricercare</td>
                 </tr>
              </table>`
      },
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `If possible, the element <code>groot-date-picker</code> will draw the calendar inside the page.`
      }
    ]
  },
  {
    version: '0.5.3', released: true, changes: [
      {
        type: ReleaseChangeType.NEW_FEATURE,
        html: `Added possibility to change download label in <code>groot-table</code> with <code>downloadExcelLabel</code> input.`
      },
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
      this.releases = RELEASE_NOTES.map(release => ({
        ...release,
        changes: release.changes.filter(change => change.type === ReleaseChangeType.BREAKING_CHANGE)
      })).filter(release => release.changes.length > 0);
    } else {
      this.releases = RELEASE_NOTES;
    }
  }
}
