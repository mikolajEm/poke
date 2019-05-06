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

  loadAgain;

  spinner:boolean = true;

  superType: string = '';
  name: string = '';

  constructor(    
    private _router: Router,
    private route: ActivatedRoute,
    private DataService: DataService
  ) {
    this.router = _router.url;
    this.scrollCallback = this.getPokemons.bind(this);
    
  }


  getPokemons() {
    
    return this.DataService.getPokemonsList(this.currentPage, this.superType, this.name).pipe(
      tap(this.processData)
    );
    
  }

  private processData = (pokemons) => {

    console.log('process');
    if (pokemons.cards.length < 20) {
      this.spinner = false;     
    } else {
      this.spinner = true;
    }
    this.currentPage++;
    this.pokemons = this.pokemons.concat(pokemons.cards);
    
  }

 
  showModal(pokeId) {

    this.modal = true;
    this.id = pokeId;
    
    document.body.className = "o-h";

  } 

  closedModal() {

    this.modal = false;
    window.history.pushState('home', 'Home', '/');

    document.body.className = "";

  }

  paramsSearch(params:any) {
    this.currentPage = 1;
    this.pokemons = [];
    if(params.supertype !== null) {
      this.superType = params.supertype;
    }    
    this.name = params.name || this.name;
    this.scrollCallback().subscribe(() => { });
  }
  
  




  ngOnInit() {


    if (this.router.includes('details')) {
      this.modal = true;
      document.body.className = "o-h";
    }


  }



}