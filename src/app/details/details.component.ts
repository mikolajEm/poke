import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  


  customer: Object;
  isLoaded = false;
  id: String =  this.route.snapshot.paramMap.get('id');
  disable = true
  

  constructor(
    private route: ActivatedRoute,
    private data: DataService
    
    ) { }

  ngOnInit() {
    
    


    this.data.getCustomer(this.id).subscribe(data => {
      this.isLoaded = true;
      this.customer = data
      
      
    })

  }


  changed(value) {
  
    /* date back to UTC */
    value.contractExpiryDate = new Date(value.contractExpiryDate);

    this.data.updateCustomer(this.id, value).subscribe(res => {

      
    });
    
  }



}
