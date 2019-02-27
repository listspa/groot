import {Component, EventEmitter, forwardRef, Inject, Input, Optional, Output} from '@angular/core';
import {Sorting} from '../../../nbpu.interfaces';
import {GrootTableComponent} from '../groot-table/groot-table.component';

@Component({
  selector: 'groot-table-header',
  templateUrl: './table-header.component.html'
})
export class TableHeaderComponent {
  @Input() label: string;
  @Input() columnName: string | null; // If null, sorting is disabled
  @Output() sortChange = new EventEmitter<Sorting>();
  private _sort: Sorting | null = null;

  constructor(@Optional() @Inject(forwardRef(() => GrootTableComponent)) private grootTable: GrootTableComponent<any>) {
  }

  toggle(): void {
    if (this.sortIsOnCurrentColumn()) {
      this.sort.reverse = !this.sort.reverse;
    } else {
      this.sort.column = this.columnName;
      this.sort.reverse = false;
    }

    this.sortChange.emit(this.sort);
    if (this.grootTable) {
      this.grootTable.setSorting(this.sort);
    }
  }

  private sortIsOnCurrentColumn(): boolean {
    return this.sort.column === this.columnName;
  }

  @Input() set sort(newSort: Sorting | null) {
    this._sort = newSort;
  }

  get sort(): Sorting | null {
    if (this.grootTable) {
      return this.grootTable.currentSorting();
    } else {
      return this._sort;
    }
  }
}
