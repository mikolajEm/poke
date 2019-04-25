import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})



export class ModalComponent implements OnInit {


  @Input() pokeId;
  @Output() closeModal = new EventEmitter();


  pokemon: any
  pokemons: any = [];
  id: String = this.route.snapshot.paramMap.get('id');

  question;

  data: Object;

  spinner: boolean = false;

  hpMax: number;
  hpMin: number;
  onceMin: boolean = true;
  onceMax: boolean = true;



  constructor(
    private DataService: DataService,
    private route: ActivatedRoute
  ) {

  }

  closeModalMethod() {
    this.closeModal.emit(true);
  }

  listOfThree(id, hp) {
    this.DataService.getSmallPokemonsList(this.pokemon, hp).subscribe(data => {
      console.log(data.cards);
      if (this.pokemons.length < 3) {
        
        this.pokemons = this.pokemons.concat(data.cards);
        console.log('in concat');
      } else {
        this.pokemons = data.cards;
      }
      

      console.log(this.pokemons);

      this.pokemons = this.pokemons.filter(poke => poke.id !== id);

    

      this.hpMin = Math.ceil((this.pokemon.hp * 0.9) / 10) * 10;
      console.log(this.hpMin);
      this.hpMax = Math.floor((this.pokemon.hp * 1.1) / 10) * 10;
      console.log(this.hpMax);


      /*search for -10% */

      if (this.pokemons.length < 3 && this.hpMin != this.pokemon.hp && this.onceMin) {

        console.log('call for min')
        this.onceMin = false;
        this.listOfThree(id, this.hpMin);

      } else if (this.pokemons.length < 3 && this.hpMin != this.pokemon.hp && this.onceMax) {
         /*search for +10% */

        console.log('call for max')
        this.onceMax = false;
        this.listOfThree(id, this.hpMax);

      }

      this.spinner = false;

    })
  }

  loadData(id) {    

    this.spinner = true;
    this.DataService.getPokemon(id).subscribe(data => {
      this.pokemon = data.card;
      this.spinner = false;



      window.history.pushState('details', 'Details', `/details/${id}`);

      if (this.pokemon.supertype === 'Pokémon') {

        /* callback to the list of 3 */

        this.onceMin = true;
        this.onceMax = true;

        this.listOfThree(id, this.pokemon.hp);

      }



    })
  }




  ngOnInit() {


    if (this.pokeId !== undefined) {
      this.id = this.pokeId;
    }


    this.loadData(this.id);













  }

}
