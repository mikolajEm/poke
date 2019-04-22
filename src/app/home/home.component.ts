import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  customers: Object;
  shortenLink: String;
  fields: Object;

  constructor(private data: DataService) { }
  

  ngOnInit() {

    this.data.getCustomers().subscribe(data => {
      this.customers = data      
      console.log(this.customers)
      
    })

  }

  


  

  
}


