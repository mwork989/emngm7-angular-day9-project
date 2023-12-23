import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IUserFormData } from 'src/app/models/user.model';
import { UserformService } from 'src/app/services/userform.service';
import { MustMatchValidate } from 'src/app/shared/must-match.validator';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  public userForm: FormGroup;
  public userDetails: IUserFormData;
  public isUserFormSubmitted: boolean;

  constructor(
    public userFormService: UserformService,
    public formBuilder: FormBuilder
  ) {
    this.userForm = {} as FormGroup;
    this.userDetails = {} as IUserFormData;
    this.isUserFormSubmitted = false;
  }

  public ngOnInit(): void {
    this.initializeUserFormWithFormBuilder();
    //   this.initializeUserFormWithFormControlInstances();
    //this.initializeUserFormWithoutFormBuilder();
  }

  public initializeUserFormWithFormBuilder() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      address2: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      state: ['', [Validators.required]],
      zip: ['', [Validators.required, Validators.min(5), Validators.max(10)]],
      disclaimer: false,
      shoppingList: this.formBuilder.array([]),
    },{
      validator: MustMatchValidate('password', 'confirmPassword')
    });
  }

  public initializeUserFormWithFormControlInstances() {
    this.userForm = this.formBuilder.group({
      email: new FormControl(['']),
      password: new FormControl(['']),
      address: new FormControl(['']),
      address2: new FormControl(['']),
      city: new FormControl(['']),
      state: new FormControl(['']),
      zip: new FormControl(['']),
      disclaimer: new FormControl([false]),
    });
  }

  public initializeUserFormWithoutFormBuilder() {
    this.userForm = new FormGroup({
      email: new FormControl(['']),
      password: new FormControl(['']),
      address: new FormControl(['']),
      address2: new FormControl(['']),
      city: new FormControl(['']),
      state: new FormControl(['']),
      zip: new FormControl(['']),
      disclaimer: new FormControl([false]),
    });
  }
  public onSubmit() {
    this.isUserFormSubmitted = true;
    if (this.userForm.status === 'VALID') {
      this.userDetails = this.userForm.getRawValue();
      this.userFormService
        .sendReactiveFormDataDetails(this.userDetails)
        .subscribe((val: IUserFormData) => {
          console.log(val);
        });
    }
  
  }

  get userFormControls() {
    return this.userForm.controls;
  }

  public addShoppingList(): void {
    const shoppingList = this.userForm.controls['shoppingList'] as FormArray;
    shoppingList.push(
      new FormGroup({
        item: new FormControl(['']),
        quantity: new FormControl(['']),
        price: new FormControl(['']),
      })
    );
  }
  public trackShoppingItems(index: number) {
    return index;
  }

  public setValue(): void {
    this.userForm.setValue({
      email: 'test',
      password: 'test',
      address: 'test',
      address2: 'test',
      city: 'Bangalore',
      state: 'KARNATAKA',
      zip: '7',
      disclaimer: false,
      shoppingList: [],
    });
  }

  public patchValue(): void {
    this.userForm.patchValue({
      city: 'bangalore',
      state: 'KARNATAKA',
      zip: '8',
      disclaimer: true,
    });
  }

  public reset(): void {
    this.userForm.reset();
  }
}
