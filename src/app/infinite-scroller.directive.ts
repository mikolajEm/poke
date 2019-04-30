import { Directive, AfterViewInit, Input } from '@angular/core';

import { fromEvent } from 'rxjs';
import { map, filter, pairwise, startWith, exhaustMap} from 'rxjs/operators';

interface ScrollPosition {
  sH: number;
  sT: number;
  cH: number;
};

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  sH: 0,
  sT: 0,
  cH: 0
};

@Directive({
  selector: '[appInfiniteScroller]'
})
export class InfiniteScrollerDirective implements AfterViewInit {

  private scrollEvent$;

  private userScrolledDown$;

  private requestStream$;

  private requestOnScroll$;

  @Input()
  scrollCallback;

  @Input()
  spinner;

  @Input()
  immediateCallback;

  @Input()
  scrollPercent = 80;

  constructor() { }

  

  ngAfterViewInit() {

    

    this.registerScrollEvent();

    this.streamScrollEvents();

    this.requestCallbackOnScroll();

  }

  private registerScrollEvent() {
    
    this.scrollEvent$ = fromEvent(window.document, 'scroll');

  }

  private streamScrollEvents() {
    this.userScrolledDown$ = this.scrollEvent$.pipe(
      map((): ScrollPosition => ({
        sH: document.documentElement.scrollHeight,
        sT: document.documentElement.scrollTop,
        cH: document.documentElement.clientHeight
      })),
      pairwise(),
      filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1]))
    )
  }

  private requestCallbackOnScroll() {

    this.requestOnScroll$ = this.userScrolledDown$;

    if (this.immediateCallback) {
      this.requestOnScroll$ = this.requestOnScroll$.pipe(
        startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION])
      )
    }

    this.requestOnScroll$.pipe(
      exhaustMap(() => { return this.scrollCallback(); })

    ).subscribe(() => { })

  }

  private isUserScrollingDown = (positions) => {
    console.log(positions);
    return positions[0].sT < positions[1].sT;
    
  }

  private isScrollExpectedPercent = (position) => {
    if (this.spinner !== false) {
      return ((position.sT + position.cH) / position.sH) > (this.scrollPercent / 100);
    } else {
      console.log('no more calls')
    }


  }

}