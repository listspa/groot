import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaginatedResponse, PaginationOptions} from '../../../../../groot/src/lib/nbpu.interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  constructor(private http: HttpClient) {
  }

  searchPeople(request: PaginationOptions): Observable<PaginatedResponse<Person>> {
    return this.http.get<PaginatedResponse<Person>>('/assets/people.json');
  }
}

export interface Person {
  name: string;
  dateOfBirth: string;
  wage: number;
}
