import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pageable } from '../core/model/page/Pageable';
import { Observable } from 'rxjs';
import { LoanPage } from './model/LoanPage';
import { Loan } from './model/Loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:8080/loan';

  constructor(
    private http: HttpClient
  ) { }

  getLoans(pageable: Pageable,title?: string, clientName?: string, date?: string): Observable<LoanPage> {
    let params = new HttpParams();
    if (title) {
      params = params.set('titleGame', title);
    }
    if (clientName) {
      params = params.set('clientName', clientName);
    }
    if (date) {
      params = params.set('date', date);
    }
    const body = { pageable };
    return this.http.post<LoanPage>(this.apiUrl, body, { params });
  }

  deleteLoan(idLoan : number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + idLoan);
  }
  
 /*  getAllLoans(title?: string, clientName?: string, date?: string): Observable<Loan[]> {
    let params = new HttpParams();
    if (title) {
      params = params.set('titleGame', title);
    }
    if (clientName) {
      params = params.set('clientName', clientName);
    }
    if (date) {
      params = params.set('date', date);
    }
    return this.http.get<Loan[]>(this.apiUrl);
}*/

  saveLoan(loan: Loan): Observable<void> { 
      return this.http.put<void>(this.apiUrl, loan);
  }

}
