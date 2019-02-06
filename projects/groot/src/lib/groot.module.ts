import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablePaginationComponent} from './components/table-pagination/table-pagination.component';
import {FtTimePipe} from './pipes/ft-time/ft-time.pipe';
import {TableHeaderComponent} from './components/table-header/table-header.component';
import {TranslateModule} from '@ngx-translate/core';
import {CollapsibleBoxComponent} from './components/collapsible-box/collapsible-box.component';
import {LoadingDirective} from './directives/loading.directive';
import {LoadingIndicatorComponent} from './components/loading-indicator/loading-indicator.component';
import {LoadingService} from './services/loading.service';
import {TabsModule} from 'ngx-bootstrap';
import {NotificationToastListComponent} from './components/notification-toast-list/notification-toast-list.component';
import {NotificationToastService} from './services/notification-toast.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {DownloadButtonComponent} from './components/download-button/download-button.component';
import {TableTitleBarComponent} from './components/table-title-bar/table-title-bar.component';
import {FileSizePipe} from './pipes/filesize/filesize.pipe';

@NgModule({
  declarations: [
    TablePaginationComponent,
    TableHeaderComponent,
    CollapsibleBoxComponent,
    FtTimePipe,
    LoadingDirective,
    LoadingIndicatorComponent,
    NotificationToastListComponent,
    NavBarComponent,
    DownloadButtonComponent,
    TableTitleBarComponent,
    FileSizePipe,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    TabsModule,
    BrowserAnimationsModule,
  ],
  exports: [
    TablePaginationComponent,
    TableHeaderComponent,
    CollapsibleBoxComponent,
    FtTimePipe,
    LoadingDirective,
    LoadingIndicatorComponent,
    NotificationToastListComponent,
    NavBarComponent,
    DownloadButtonComponent,
    TableTitleBarComponent,
    FileSizePipe,
  ],
  entryComponents: [
    LoadingIndicatorComponent,
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
