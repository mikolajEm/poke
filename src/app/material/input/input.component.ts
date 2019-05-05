import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'material-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

 


  @Output() paramsSearch = new EventEmitter();

  params: object = {
    supertype: null,
    name: ''
  };

  constructor() { }

  valueChange() {
    this.paramsSearch.emit(this.params);
    console.log(this.params)
  }

  ngOnInit() {
  }

}
