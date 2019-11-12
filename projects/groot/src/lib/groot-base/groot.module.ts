import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablePaginationComponent} from './components/tables/table-pagination/table-pagination.component';
import {FtTimePipe} from './pipes/ft-time/ft-time.pipe';
import {FtDatePipe} from './pipes/ft-date/ft-date.pipe';
import {TableHeaderComponent} from './components/tables/table-header/table-header.component';
import {TranslateModule} from '@ngx-translate/core';
import {CollapsibleBoxComponent} from './components/collapsible-box/collapsible-box.component';
import {LoadingDirective} from './directives/loading.directive';
import {LoadingIndicatorComponent} from './components/loading-indicator/loading-indicator.component';
import {LoadingService} from './services/loading.service';
import {BsDatepickerModule, BsDropdownModule, PopoverModule, TabsModule} from 'ngx-bootstrap';
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
import {UploadFileComponent} from './components/forms/groot-file-input/groot-file-input.component';
import {GrootButtonComponent} from './components/forms/groot-button/groot-button.component';
import {ConfirmModalComponent} from './components/confirm-modal/confirm-modal.component';
import {FooterComponent} from './components/footer/footer.component';
import {
  GrootTableBodyDirective,
  GrootTableHeaderDirective,
  GrootTableTitleRightAreaDirective
} from './components/tables/groot-table/groot-table.directive';
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
    UploadFileComponent,
    GrootButtonComponent,
    ConfirmModalComponent,
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
    GrootToggleButtonComponent,
    NeedsCapabilityDirective,
    GrootTableComponent,
    PageTitleComponent,
    UploadFileComponent,
    GrootButtonComponent,
    ConfirmModalComponent,
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
  ],
  entryComponents: [
    LoadingIndicatorComponent,
    ConfirmModalComponent,
  ]
})
export class GrootModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GrootModule,
      providers: [
        LoadingService,
        NotificationToastService,
      ]
    };
  }
}

// Remember to update public_abi.ts whenever you add a new angular object!
