import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-guestform',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    CommonModule,
    MatCheckboxModule,
  ],
  templateUrl: './guestform.component.html',
  styleUrl: './guestform.component.css'
})
export class GuestformComponent implements OnInit {
  guestForm: FormGroup;
  selectedValue: boolean = true;
  //formNames: string[] = ['name', 'surname', 'guestAcceptance', 'food', 'transfer', 'childrens', 'schampange', 'vine', 'strongalcohol', 'alcoholfree', 'comment']

  @Input() saveGuest!: Observable<void>;
  private eventsSubscription: Subscription;
  @Output() sendGuest: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef) {
    this.guestForm = new FormGroup({});
    this.guestForm.addControl('name', new FormControl('', [Validators.required]));
    this.guestForm.addControl('surname', new FormControl('', [Validators.required]));
    this.guestForm.addControl('guestAcceptance', new FormControl(true, [Validators.required]));
    this.guestForm.addControl('food', new FormControl('', [Validators.required]));
    this.guestForm.addControl('transfer', new FormControl(true, [Validators.required]));
    this.guestForm.addControl('childrens', new FormControl(false, [Validators.required]));

    this.guestForm.addControl('schampange', new FormControl('', [Validators.required]));
    this.guestForm.addControl('vine', new FormControl('', [Validators.required]));
    this.guestForm.addControl('strongalcohol', new FormControl('', [Validators.required]));
    this.guestForm.addControl('alcoholfree', new FormControl('', [Validators.required]));

    this.guestForm.addControl('comment', new FormControl(''));

    this.eventsSubscription = new Subscription;
  }


  ngOnInit(): void {
    this.saveGuest.subscribe(() => this.doSendGuestInfo());
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  onChange(event: MatRadioChange) {
    if (event.value === "true") {
      this.selectedValue = true;
      this.guestForm.addControl('food', new FormControl('', [Validators.required]));
      this.guestForm.addControl('transfer', new FormControl(true, [Validators.required]));
      this.guestForm.addControl('childrens', new FormControl(false, [Validators.required]));

      this.guestForm.addControl('schampange', new FormControl('', [Validators.required]));
      this.guestForm.addControl('vine', new FormControl('', [Validators.required]));
      this.guestForm.addControl('strongalcohol', new FormControl('', [Validators.required]));
      this.guestForm.addControl('alcoholfree', new FormControl('', [Validators.required]));

      this.guestForm.addControl('comment', new FormControl('', [Validators.required]));
    } else {
      this.selectedValue = false;
      this.guestForm.removeControl('food');
      this.guestForm.removeControl('transfer');
      this.guestForm.removeControl('childrens');

      this.guestForm.removeControl('schampange');
      this.guestForm.removeControl('vine');
      this.guestForm.removeControl('strongalcohol');
      this.guestForm.removeControl('alcoholfree');

      this.guestForm.removeControl('comment');
    }
  }

  doSendGuestInfo() {
    // if (this.validateFields()) {
    var guest: Guest = {
      name: this.guestForm.value.name,
      surname: this.guestForm.value.surname,
      guestAcceptance: this.guestForm.value.guestAcceptance === true ? true : false,
      food: this.guestForm.value.food,
      transfer: this.guestForm.value.transfer === true ? true : false,
      childrens: this.guestForm.value.childrens === true ? true : false,
      schampange: this.guestForm.value.schampange,
      vine: this.guestForm.value.vine,
      strongalcohol: this.guestForm.value.strongalcohol,
      alcoholfree: this.guestForm.value.alcoholfree,
      comment: this.guestForm.value.comment
    }
    this.sendGuest.emit(guest);
}


validateFields() {
  for (const key of Object.keys(this.guestForm.controls)) {
    if (this.guestForm.controls[key].invalid) {
      (<any>this.guestForm.get(key)).nativeElement.focus();
      return false;
    }
  }
  return true;
}

}


interface Guest {
  name: string,
  surname: string,
  guestAcceptance: boolean,
  food: string,
  transfer: boolean,
  childrens: boolean,
  schampange: boolean,
  vine: boolean,
  strongalcohol: boolean,
  alcoholfree: boolean,
  comment: string
}