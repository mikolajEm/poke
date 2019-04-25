import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { HackerNewsService } from '../hacker-news.service';
import { tap } from "rxjs/operators";






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
  id: number;

  modal:boolean = false;

  rut:String = '';

  currentPage: number = 1;

  news: Array<any> = [];

  scrollCallback;

  constructor(
    private data: DataService,
    private _router: Router,
    private route: ActivatedRoute,
    private hackerNewsSerivce: HackerNewsService
  ) {
    this.router = _router.url;
    this.scrollCallback = this.getStories.bind(this);
  }


  getStories() {
    return this.hackerNewsSerivce.getLatestStories(this.currentPage).pipe(
      tap(this.processData)
    );
  }

  private processData = (news) => {
    this.currentPage++;
    this.news = this.news.concat(news.cards);
    console.log(this.news)
  }

 
  showModal(id) {

    this.modal = true
    this.id = id;

    window.history.pushState('details', 'Details', `/details/${this.id}`);

  } 

  closedModal() {

    this.modal = false;
    window.history.pushState('home', 'Home', '/');

  }


  ngOnInit() {

    this.data.getCustomers().subscribe(data => {
      this.customers = data
      console.log(this.customers)

    })

    if (this.router.includes('details')) {
      this.modal = true;
    }

    
    

  }

  ngOnChanges() {
    
  }







}


