import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Input } from '@angular/core';


@Directive({
  selector: '[disableControl]'
})
export class DisableDirective {

  @Input() set disableControl( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  constructor( private ngControl : NgControl ) {
  }

}
