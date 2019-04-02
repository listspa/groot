import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {TableColumns} from '../../../model/table-columns.model';

@Component({
  selector: 'groot-columns-selector-list',
  templateUrl: './columns-selector-list.component.html'
})
export class ColumnsSelectorListComponent {
  @Input() label: string;
  @Input() icon: string | string[] | null;
  @Input() columns: TableColumns;
  @Output() columnDropped = new EventEmitter<CdkDragDrop<TableColumns>>();

  onDropColumn(event: CdkDragDrop<TableColumns>) {
    this.columnDropped.emit(event);
  }
}
