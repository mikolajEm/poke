import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() data
  @Output() showModalClick = new EventEmitter();



  showModal(pokeId) {
    this.showModalClick.emit(pokeId);
  }

 

  constructor() { }

  ngOnInit() {
  }

}
