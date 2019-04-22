import { Injectable } from '@angular/core';
import { formModel } from './form.model';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})




export class DataService {

  formData : formModel;
   
  
  

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  // Methods

  
  getCustomers() {
    return this.http.get('https://api.pokemontcg.io/v1/cards?pageSize=6')
  }

  getCustomer(id): Observable<formModel> {
    return this.http.get<formModel>(`http://localhost:8080/customers/${id}`).pipe(
      tap(_ => console.log(`fetched customer`)),
      catchError(this.handleError<formModel>(`getProduct id=${id}`))
      
    );

    
  }

  updateCustomer(id, formData : formModel) {
    console.log("xx:");console.log(formData)


    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    };
    
    return this.http.put(`http://localhost:8080/customers/${id}`,formData,httpOptions)
    
  }


  
  


  



}
