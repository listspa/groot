import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaginatedResponse, PaginationOptions} from '../../../../../groot/src/lib/groot-base/utils/pagination.model';
import {Observable} from 'rxjs';
import {BASE_URL} from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  constructor(private http: HttpClient) {
  }

  searchPeople(request: PaginationOptions): Observable<PaginatedResponse<Person>> {
    return this.http.get<PaginatedResponse<Person>>(`${BASE_URL}/assets/people.json`);
  }
}

export interface Person {
  name: string;
  dateOfBirth: string;
  wage: number;
}
