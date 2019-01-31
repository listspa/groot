import {Component, OnInit} from '@angular/core';
import {PeopleService, Person} from './people.service';
import {GenericTableComponentBase} from '../../../../../groot/src/lib/utils/generic-table-component-base';
import {PaginationOptions} from '../../../../../groot/src/lib/nbpu.interfaces';

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html'
})
export class DemoTableComponent extends GenericTableComponentBase<Person> implements OnInit {
  constructor(private peopleService: PeopleService) {
    super();
  }

  ngOnInit(): void {
    this.reload();
  }

  protected doSearch(paginationAndSorting: PaginationOptions) {
    this.peopleService.searchPeople(paginationAndSorting)
      .subscribe(data => this.searchResults = data);
  }

  protected getDefaultSortColumn(): string {
    return 'name';
  }
}
