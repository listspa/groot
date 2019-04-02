import {Component, EventEmitter, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {SelectedColumns, TableColumns} from '../../../model/table-columns.model';

@Component({
  selector: 'groot-columns-selector',
  templateUrl: './columns-selector.component.html'
})
export class ColumnsSelectorComponent implements OnInit {
  available: TableColumns;
  unselected: TableColumns;
  selected: TableColumns;
  accordion: TableColumns;
  resultSubject: EventEmitter<SelectedColumns>;

  constructor(private modalRef: BsModalRef) {
  }

  ngOnInit(): void {
    const selectedKeys = new Set<string>(this.selected.map(c => c.key));
    const accordionKeys = new Set<string>(this.accordion.map(c => c.key));
    this.unselected = this.available.filter(c => !selectedKeys.has(c.key) && !accordionKeys.has(c.key));
  }

  onCancel() {
    this.completeInteraction();
  }

  onConfirm() {
    this.completeInteraction({
      selected: this.selected,
      accordion: this.accordion
    });
  }

  private completeInteraction(selection: SelectedColumns | null = null) {
    if (selection) {
      this.resultSubject.next(selection);
    }
    this.modalRef.hide();
  }

  moveColumn(event: CdkDragDrop<TableColumns>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
