import {Component, HostBinding, Input} from '@angular/core';
import {TableColumn} from '../../../model/table-columns.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'groot-popover-filter',
  templateUrl: './popover-filter.component.html',
})
export class PopoverFilterComponent {
  @HostBinding('class') hostClass = 'popover popover-filters';

  @Input() column: TableColumn;
  @Input() results: Subject<string[] | null>;
  @Input() selectedValues: string[] = [];
  @Input() domain: string[] | null = null;

  clear() {
    this.results.next(null);
    this.close();
  }

  close() {
    this.results.complete();
  }

  apply() {
    this.results.next(this.selectedValues);
    this.close();
  }
}
