import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, EMPTY, throwError } from 'rxjs';
import {Router} from "@angular/router";





const BASE_URL = 'https://api.pokemontcg.io/v1';

@Injectable()
export class DataService {

  
  
  constructor(private http: HttpClient, private router: Router) { }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {  
      
      console.error(error);   
      
      return of(result as T);
    };
  }

  

  getPokemonsList(page: number = 1, superType, name) {
    return this.http.get(`${BASE_URL}/cards?pageSize=20&page=${page}&supertype=${superType}&name=${name}`);
    //return this.http.get(`/assets/download.json`);
  }

  getSmallPokemonsList(pokemon: any, hp: any): Observable<{cards: Object}> {
    
    return this.http.get<{cards: Object}>(`${BASE_URL}/cards?pageSize=4&types=${pokemon.types}&rarity=${pokemon.rarity}&hp=${hp}`);
    
  }

  getPokemon(id): Observable<{card: Object}>{
    return this.http.get<{card: Object}>(`${BASE_URL}/cards/${id}`).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status == 404) {
          this.router.navigateByUrl('/not-found', {replaceUrl: true});

          return EMPTY;
      }
      else
          return throwError(error);
  }));
  }
}