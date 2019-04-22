import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
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
  router: String;

  constructor(private data: DataService, private _router: Router) { 
    this.router = _router.url; 
   }

 

  
  

  ngOnInit() {

    this.data.getCustomers().subscribe(data => {
      this.customers = data      
      console.log(this.customers)
      
    })

  }

  


  

  
}


