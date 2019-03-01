import {Component} from '@angular/core';
import {PeopleService, Person} from './people.service';
import {PaginatedResponse, PaginationOptions} from '../../../../../groot/src/lib/nbpu.interfaces';
import {LoadingFailed} from '../../../../../groot/src/lib/components/tables/groot-table/groot-table.component';

@Component({
  selector: 'app-demo-table',
  templateUrl: './demo-table.component.html'
})
export class DemoTableComponent {
  searchResultsData: PaginatedResponse<Person> = null;
  noResultsData: PaginatedResponse<Person> = {
    pageLen: 15,
    pageNum: 0,
    totalNumRecords: 0,
    records: []
  };
  failedData: LoadingFailed = {loadingFailed: true};

  constructor(private peopleService: PeopleService) {
  }

  doSearch(paginationAndSorting: PaginationOptions) {
    this.peopleService.searchPeople(paginationAndSorting)
      .subscribe(data => this.searchResultsData = data);
  }
}
