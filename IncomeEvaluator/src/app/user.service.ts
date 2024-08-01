import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://zayneuserdataapi.azurewebsites.net/api/';

  constructor(private http: HttpClient) { }

  authenticate(userData: any): Observable<any> {
    const url = `${this.baseUrl}User/authenticate`;
    return this.http.post(url, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    });
  }

  register(userData: any): Observable<any> {
    const url = `${this.baseUrl}User/register`;
    return this.http.post(url, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  getUserPeople(userId: number): Observable<any[]> {
    const url = `${this.baseUrl}Person/collection/${userId}`;
    return this.http.get<any[]>(url).pipe(
      catchError(this.handleError<any[]>('getUserPeople'))
    );
  }

  addPerson(person: any): Observable<any> {
    const url = `${this.baseUrl}Person/collection/${person.userId}`;
    return this.http.post(url, person, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError<any>('addPerson'))
    );
  }

  editPerson(person: any): Observable<any> {
    const url = `${this.baseUrl}Person/${person.userID}`;
    return this.http.put(url, person, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError<any>('editPerson'))
    );
  }

  deletePerson(personId: number): Observable<any> {
    const url = `${this.baseUrl}Person/${personId}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError<any>('deletePerson'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}

export interface Person {
  PersonID: number;
  FirstName: string;
  LastName: string;
  ZipCode: string;
  UserID: number;
  Income: number;
  IncomeVsZipAvg: number;
  IncomeVsStateAvg: number;
}