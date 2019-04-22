import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  customer: Object;
  id: String =  this.route.snapshot.paramMap.get('id');

  constructor(
    private data: DataService,
    private route: ActivatedRoute
  ) {
    
   }

  ngOnInit() {


    this.data.getCustomer(this.id).subscribe(data => {
      
      this.customer = data.card;
      console.log(data)
      
      
    })

  }

}
