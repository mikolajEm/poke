import { Component, OnInit, Input, Output, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { formModel } from '../form.model';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})



export class FormComponent implements OnInit {


  @Input() customer: formModel;
  @Input() disable: Boolean = true;
  @Output() onProp = new EventEmitter<string>();


  messageForm: FormGroup;
  submitted = false;
  success = false;
  isBig = false;
  years: number;


  constructor(
    private formBuilder: FormBuilder,
    @Inject(LOCALE_ID) private locale: string,

  ) { }



  transformDate(date) {
    return formatDate(date, 'yyyy-MM-ddTHH:mm', this.locale);
  }


  ngOnInit() {


    //setting data for validator
    const years = this.customer.type === 1 ? 2 : 3;
    this.years = years;


    /* fixing date */
    this.customer.contractExpiryDate = this.customer.contractExpiryDate.replace(' ', '');

    /* changing date format to be used in browser date picker */
    this.customer.contractExpiryDate = this.transformDate(this.customer.contractExpiryDate)



    //Custom validator not older than today
    function notTodayValidator(control: AbstractControl): { [key: string]: boolean } | null {

      if (new Date(control.value) < new Date()) {
        return { 'notToday': true };
      }
      return null;
    }
    //Custom validator not greater than 2/3 years from today
    function lessThanValidator(control: AbstractControl): { [key: string]: boolean } | null {

      if (((+new Date(control.value) - +new Date()) / (3600 * 1000 * 24 * 365)) > years) {
        return { 'lessThan': true };
      }
      return null;
    }


    // validators for small customer
    if (this.customer.type === 1) {


      this.messageForm = this.formBuilder.group({
        name: [this.customer['name'], Validators.required],
        country: [this.customer['country'], Validators.required],
        websiteUrl: [this.customer['websiteUrl']],
        numberOfEmployees: [this.customer['numberOfEmployees'], Validators.compose([Validators.min(1), Validators.required])],
        type: [this.customer['type'], Validators.required],
        contractExpiryDate: [this.customer['contractExpiryDate'], Validators.compose([notTodayValidator, lessThanValidator, Validators.required])]
      })
    } else {
    // validators for big customer
    
      this.messageForm = this.formBuilder.group({
        name: [this.customer['name'], Validators.required],
        country: [this.customer['country'], Validators.required],
        websiteUrl: [this.customer['websiteUrl']],
        type: [this.customer['type'], Validators.required],
        contractExpiryDate: [this.customer['contractExpiryDate'], Validators.compose([notTodayValidator, lessThanValidator, Validators.required])],
        complianceChecked: [this.customer['complianceChecked'], Validators.requiredTrue],
        annualTurnover: [this.customer['annualTurnover'], Validators.compose([Validators.min(1), Validators.required])]


      })
    }
  }

  onSubmit(form: NgForm) {

    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }

    this.success = true;

    //Sending data to parent component

    this.onProp.emit(this.messageForm.value);
  }


}