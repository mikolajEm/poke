import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})



export class ModalComponent implements OnInit {


  @Input() pokeId;
  @Output() closeModal = new EventEmitter();


  customer: Object;
  id: String = this.route.snapshot.paramMap.get('id');

  question;



  constructor(
    private data: DataService,
    private route: ActivatedRoute
  ) {

  }

  closeModalMethod() {
    this.closeModal.emit(true);
  }

  ngOnInit() {

    if (this.pokeId !== undefined) {
      this.id = this.pokeId;
    }


    this.data.getCustomer(this.id).subscribe(data => {

      this.customer = data.card;
      console.log(data)


    })



  }

}
