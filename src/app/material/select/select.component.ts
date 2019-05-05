import { Component, OnInit, Output, EventEmitter } from '@angular/core';




export interface Supertypes {
  value: string;
  viewValue: string;
}






@Component({
  selector: 'material-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  


  @Output() paramsSearch = new EventEmitter();

  params: object = {
    supertype: null,
    name: ''
  };


  supertypes: Supertypes[] = [
    {value: '', viewValue: '--'},
    {value: 'Pokémon', viewValue: 'Pokémon'},
    {value: 'Trainer', viewValue: 'Trainer'},
    {value: 'Energy', viewValue: 'Energy'}
  ];


  valueChange() {
    this.paramsSearch.emit(this.params);
  }

  ngOnInit() {  
    
    
  }
  
}



