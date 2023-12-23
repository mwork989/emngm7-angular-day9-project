import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS } from '@angular/forms';
import { MustMatchValidate } from './must-match.validator';

@Directive({
  selector: '[mustMatch]',
  providers:[
    {provide:NG_VALIDATORS, useExisting:MustMatchDirective, multi:true}
  ]
})
export class MustMatchDirective {
  @Input('mustMatch') mustMatch: string[];
  constructor() { 
    this.mustMatch = [];
  }

  public validate(formGroup:FormGroup){
    MustMatchValidate(this.mustMatch[0], this.mustMatch[1])(formGroup);
  }

}

