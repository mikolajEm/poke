import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const BASE_URL = 'https://api.pokemontcg.io/v1';

@Injectable()
export class DataService {
  
  constructor(private http: HttpClient) { }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  

  getPokemonsList(page: number = 1) {
    return this.http.get(`${BASE_URL}/cards?name=charizard&pageSize=20&page=${page}`);
  }

  getPokemon(id){
    return this.http.get(`https://api.pokemontcg.io/v1/cards/${id}`).pipe(
      tap(_ => console.log(`fetched pokemon`)),
      catchError(this.handleError(`get Pokemon id=${id}`))
      
    );
  }
}