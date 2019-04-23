import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

const BASE_URL = 'https://api.pokemontcg.io/v1';

@Injectable()
export class HackerNewsService {
  
  constructor(private http: HttpClient) { }

  getLatestStories(page: number = 1) {
    return this.http.get(`${BASE_URL}/cards?pageSize=6&page=${page}`);
  }
}