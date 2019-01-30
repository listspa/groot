import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Sorting} from '../../nbpu.interfaces';

@Component({
  selector: 'groot-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent {
  @Input() label: string;
  @Input() columnName: string | null; // If null, sorting is disabled
  @Output() sortChange = new EventEmitter<Sorting>();
  @Input() sort: Sorting | null = null;

  toggle(): void {
    if (this.sortIsOnCurrentColumn()) {
      this.sort.reverse = !this.sort.reverse;
    } else {
      this.sort.column = this.columnName;
      this.sort.reverse = false;
    }

    this.sortChange.emit(this.sort);
  }

  private sortIsOnCurrentColumn(): boolean {
    return this.sort.column === this.columnName;
  }
}
