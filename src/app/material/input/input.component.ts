import { Component, OnInit, Output, EventEmitter } from '@angular/core';

export interface Params {
  supertype: string;
  name: string;
}


@Component({
  selector: 'material-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})


export class InputComponent implements OnInit {

 


  @Output() paramsSearch = new EventEmitter();

  params: Params = {
    supertype: null,
    name: ''
  };

  constructor() { }

  valueChange() {
    this.paramsSearch.emit(this.params);    
  }

  ngOnInit() {
  }

}
