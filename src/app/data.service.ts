import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { formModel } from './form.model';

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
    //return this.http.get(`${BASE_URL}/cards?pageSize=20&page=${page}`);
    return this.http.get(`/assets/download.json`);
  }

  getSmallPokemonsList(pokemon: any, hp: any): Observable<{cards: Object}> {
    
    return this.http.get<{cards: Object}>(`${BASE_URL}/cards?pageSize=4&types=${pokemon.types}&rarity=${pokemon.rarity}&hp=${hp}`);
    
  }

  getPokemon(id): Observable<formModel>{
    return this.http.get<formModel>(`${BASE_URL}/cards/${id}`)
  }
}