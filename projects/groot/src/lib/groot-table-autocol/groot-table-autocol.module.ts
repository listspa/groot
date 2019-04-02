import {NgModule} from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {GrootModule} from '../groot-base/groot.module';
import {GrootTableAutocolComponent} from './components/groot-table-autocol/groot-table-autocol.component';
import {ColumnsSelectorComponent} from './components/groot-table-autocol/columns-selector/columns-selector.component';
import {ColumnsSelectorListComponent} from './components/groot-table-autocol/columns-selector-list/columns-selector-list.component';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    GrootTableAutocolComponent,
    ColumnsSelectorComponent,
    ColumnsSelectorListComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    GrootModule,
    DragDropModule
  ],
  exports: [
    GrootTableAutocolComponent,
    ColumnsSelectorComponent,
    ColumnsSelectorListComponent,
    DragDropModule
  ],
  entryComponents: [
    ColumnsSelectorComponent
  ]
})
export class GrootTableAutocolModule {
}

// Remember to update public_abi.ts whenever you add a new angular object!
