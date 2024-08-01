import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaxDataService {

  private baseUrl = 'https://zaynetaxdataapi.azurewebsites.net/api/';
  private stateTaxDataUrl = this.baseUrl + '/StateTaxData';
  private zipCodeTaxDataUrl = this.baseUrl + '/ZipCodeTaxData';

  constructor(private http: HttpClient) { }

  getStateTaxData(state: string): Observable<any> {
    const url = `${this.stateTaxDataUrl}/${state}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>('getStateTaxData'))
    );
  }

  getZipCodeTaxData(zip: string): Observable<any[]> {
    const url = `${this.zipCodeTaxDataUrl}/${zip}`;
    return this.http.get<any[]>(url).pipe(
      catchError(this.handleError<any[]>('getZipCodeTaxData'))
    );
  }

  validateZipCode(zip: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.zipCodeTaxDataUrl}/validate-zip/${zip}`).pipe(
      catchError(this.handleError<boolean>('validateZipCode'))
    );
  }

  validateState(state: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.stateTaxDataUrl}/validate-state/${state}`).pipe(
      catchError(this.handleError<boolean>('validateState'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
