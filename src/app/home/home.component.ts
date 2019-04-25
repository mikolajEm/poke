import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { tap } from "rxjs/operators";






@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  customers: Object;
  shortenLink: String;
  fields: Object;
  router: String;
  id: number;

  modal:boolean = false;


  currentPage: number = 1;

  pokemons: Array<any> = [];

  scrollCallback;

  spinner:boolean = true;

  constructor(    
    private _router: Router,
    private route: ActivatedRoute,
    private DataService: DataService
  ) {
    this.router = _router.url;
    this.scrollCallback = this.getPokemons.bind(this);
  }


  getPokemons() {
    return this.DataService.getPokemonsList(this.currentPage).pipe(
      tap(this.processData)
    );
  }

  private processData = (pokemons) => {

    console.log(pokemons.cards)
    if (pokemons.cards.length === 0) {
      this.spinner = false;     
    }
    this.currentPage++;
    this.pokemons = this.pokemons.concat(pokemons.cards);
    console.log(this.pokemons)
  }

 
  showModal(id) {

    this.modal = true
    this.id = id;
    window.history.pushState('details', 'Details', `/details/${this.id}`);

  } 

  closedModal() {

    this.modal = false;
    window.history.pushState('home', 'Home', '/');

  }


  ngOnInit() {


    if (this.router.includes('details')) {
      this.modal = true;
    }


  }



}