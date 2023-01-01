import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {TablePaginationComponent} from './components/tables/table-pagination/table-pagination.component';
import {FtTimePipe} from './pipes/ft-time/ft-time.pipe';
import {FtDatePipe} from './pipes/ft-date/ft-date.pipe';
import {TableHeaderComponent} from './components/tables/table-header/table-header.component';
import {TranslateModule} from '@ngx-translate/core';
import {CollapsibleBoxComponent} from './components/collapsible-box/collapsible-box.component';
import {LoadingDirective} from './directives/loading.directive';
import {LoadingIndicatorComponent} from './components/loading-indicator/loading-indicator.component';
import {LoadingService} from './services/loading.service';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {NotificationToastListComponent} from './components/notification-toast-list/notification-toast-list.component';
import {NotificationToastService} from './services/notification-toast.service';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {DownloadButtonComponent} from './components/download-button/download-button.component';
import {TableTitleBarComponent} from './components/tables/table-title-bar/table-title-bar.component';
import {FileSizePipe} from './pipes/fileSize/fileSize.pipe';
import {RouterModule} from '@angular/router';
import {GrootInputComponent} from './components/forms/groot-input/groot-input.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GrootCheckboxComponent} from './components/forms/groot-checkbox/groot-checkbox.component';
import {GrootRadioComponent} from './components/forms/groot-radio/groot-radio.component';
import {GrootTextAreaComponent} from './components/forms/groot-textarea/groot-textarea.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {GrootComboComponent} from './components/forms/groot-combo/groot-combo.component';
import {GrootDatePickerComponent} from './components/forms/groot-date-picker/groot-date-picker.component';
import {GrootToggleButtonComponent} from './components/forms/groot-toggle-button/groot-toggle-button.component';
import {NeedsCapabilityDirective} from './directives/needsCapability.directive';
import {GrootTableComponent} from './components/tables/groot-table/groot-table.component';
import {PageTitleComponent} from './components/page-title/page-title.component';
import {GrootFileInputComponent} from './components/forms/groot-file-input/groot-file-input.component';
import {GrootButtonComponent} from './components/groot-button/groot-button.component';
import {ConfirmModalComponent} from './components/confirm-modal/confirm-modal.component';
import {FooterComponent} from './components/footer/footer.component';
import {GrootTableBodyDirective, GrootTableHeaderDirective, GrootTableTitleRightAreaDirective} from './components/tables/groot-table/groot-table.directive';
import {GrootAccordionIndicatorComponent} from './components/tables/groot-accordion-indicator/groot-accordion-indicator.component';
import {GrootInputIconLeftDirective, GrootInputIconRightDirective} from './components/forms/groot-input/groot-input.directive';
import './polyfills/polyfill-element-closest';
import {YesNoCheckComponent} from './components/yes-no-check/yes-no-check.component';
import {ActionsButtonComponent} from './components/actions-button/actions-button.component';
import {ActionsButtonEntryComponent} from './components/actions-button/actions-button-entry/actions-button-entry.component';
import {DisplayLabelValueComponent} from './components/display-label-value/display-label-value.component';
import {DisplayValueComponent} from './components/display-value/display-value.component';
import {GrootDatePipe} from './pipes/groot-date/groot-date.pipe';
import {GrootProvideParentForm} from './directives/provide-parent-form.directive';
import {InfoIconComponent} from './components/info-icon/info-icon.component';
import {GrootTabOrderDirective} from './directives/groot-tab-order.directive';
import {GrootDarwinPageTitleComponent} from './components/darwin-page-title/groot-darwin-page-title.component';
import {GrootDarwinBreadcrumbsComponent} from './components/darwin-breadcrumbs/groot-darwin-breadcrumbs.component';
import {GrootDarwinBreadcrumbsGoBackComponent} from './components/darwin-breadcrumbs/darwin-breadcrumb-goback/groot-darwin-breadcrumbs-go-back.component';
import {GrootDarwinBreadcrumbSeparatorComponent} from './components/darwin-breadcrumbs/darwin-breadcrumb-separator/groot-darwin-breadcrumb-separator.component';
import {GrootSplitButtonComponent} from './components/groot-split-button/groot-split-button.component';
import {GrootDarwinSideBarComponent} from './components/darwin-side-bar/groot-darwin-side-bar.component';
import {GrootTimePickerComponent} from './components/forms/groot-time-picker/groot-time-picker.component';
import {GrootBaseSearchFormComponent} from './components/base-search-form/base-search-form.component';
import {GrootDateTimePickerComponent} from './components/forms/groot-date-time-picker/groot-date-time-picker.component';
import {GrootQuickSearchComponent} from './components/forms/groot-quick-search/groot-quick-search.component';
import {GrootDarwinSideBarThirdLevelComponent} from './components/darwin-side-bar/groot-darwin-side-bar-third-level/groot-darwin-side-bar-third-level.component';
import {ConfirmModalNotesComponent} from './components/confirm-modal-notes/confirm-modal-notes.component';

@NgModule({
  declarations: [
    TablePaginationComponent,
    TableHeaderComponent,
    CollapsibleBoxComponent,
    FtTimePipe,
    FtDatePipe,
    LoadingDirective,
    LoadingIndicatorComponent,
    NotificationToastListComponent,
    NavBarComponent,
    DownloadButtonComponent,
    TableTitleBarComponent,
    FileSizePipe,
    GrootInputComponent,
    GrootCheckboxComponent,
    GrootRadioComponent,
    GrootTextAreaComponent,
    GrootComboComponent,
    GrootDatePickerComponent,
    GrootToggleButtonComponent,
    NeedsCapabilityDirective,
    GrootTableComponent,
    PageTitleComponent,
    GrootFileInputComponent,
    GrootButtonComponent,
    ConfirmModalComponent,
    ConfirmModalNotesComponent,
    FooterComponent,
    GrootTableHeaderDirective,
    GrootTableBodyDirective,
    GrootTableTitleRightAreaDirective,
    GrootAccordionIndicatorComponent,
    GrootInputIconLeftDirective,
    GrootInputIconRightDirective,
    YesNoCheckComponent,
    ActionsButtonComponent,
    ActionsButtonEntryComponent,
    DisplayLabelValueComponent,
    DisplayValueComponent,
    GrootDatePipe,
    GrootProvideParentForm,
    InfoIconComponent,
    GrootTabOrderDirective,
    GrootDarwinPageTitleComponent,
    GrootDarwinBreadcrumbsComponent,
    GrootDarwinBreadcrumbsGoBackComponent,
    GrootDarwinBreadcrumbSeparatorComponent,
    GrootSplitButtonComponent,
    GrootDarwinSideBarComponent,
    GrootDarwinSideBarThirdLevelComponent,
    GrootTimePickerComponent,
    GrootBaseSearchFormComponent,
    GrootDateTimePickerComponent,
    GrootQuickSearchComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    TabsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule,
    BsDropdownModule,
    PopoverModule,
  ],
  exports: [
    TablePaginationComponent,
    TableHeaderComponent,
    CollapsibleBoxComponent,
    FtTimePipe,
    FtDatePipe,
    LoadingDirective,
    LoadingIndicatorComponent,
    NotificationToastListComponent,
    NavBarComponent,
    DownloadButtonComponent,
    TableTitleBarComponent,
    FileSizePipe,
    GrootInputComponent,
    GrootCheckboxComponent,
    GrootRadioComponent,
    GrootTextAreaComponent,
    GrootComboComponent,
    GrootDatePickerComponent,
    GrootTimePickerComponent,
    GrootToggleButtonComponent,
    NeedsCapabilityDirective,
    GrootTableComponent,
    PageTitleComponent,
    GrootFileInputComponent,
    GrootButtonComponent,
    ConfirmModalComponent,
    ConfirmModalNotesComponent,
    FooterComponent,
    GrootTableHeaderDirective,
    GrootTableBodyDirective,
    GrootTableTitleRightAreaDirective,
    GrootAccordionIndicatorComponent,
    GrootInputIconLeftDirective,
    GrootInputIconRightDirective,
    YesNoCheckComponent,
    ActionsButtonComponent,
    ActionsButtonEntryComponent,
    DisplayLabelValueComponent,
    DisplayValueComponent,
    GrootDatePipe,
    GrootProvideParentForm,
    GrootTabOrderDirective,
    GrootDarwinPageTitleComponent,
    GrootDarwinBreadcrumbsComponent,
    GrootDarwinBreadcrumbsGoBackComponent,
    GrootDarwinBreadcrumbSeparatorComponent,
    GrootSplitButtonComponent,
    GrootDarwinSideBarComponent,
    GrootBaseSearchFormComponent,
    GrootTimePickerComponent,
    GrootDateTimePickerComponent,
    GrootQuickSearchComponent,
  ],
  entryComponents: [
    LoadingIndicatorComponent,
    ConfirmModalComponent,
    ConfirmModalNotesComponent,
  ]
})
export class GrootModule {
  static forRoot(): ModuleWithProviders<GrootModule> {
    return {
      ngModule: GrootModule,
      providers: [
        LoadingService,
        NotificationToastService,
        DatePipe
      ]
    };
  }
}

// Remember to update public_abi.ts whenever you add a new angular object!
