import { Component, inject, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { GuestformComponent } from "../guestform/guestform.component";

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule,
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule, GuestformComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css'
})
export class MainpageComponent {
  isLinear = false;
  steps = [1, 2, 3];
  accept = false;
  save = false;
  guests: Guest[] = [];

  counter: number = 0;

  @ViewChildren(GuestformComponent) guestForm: QueryList<GuestformComponent> | undefined

  constructor() {
  }


  onAccept() {
    this.accept = !this.accept;
    this.guests.push({
      id: this.counter++,
      name: '',
      surname: '',
      guestAcceptance: false,
      food: '',
      transfer: false,
      childrens: false,
      night: false,
      schampange: false,
      vine: false,
      strongalcohol: false,
      alcoholfree: false,
      comment: '',
      haserror: true
    })
  }

  onSave() {
    var hasErrors = false;
    this.guestForm?.forEach(element => {
      element.doSendGuestInfo()
    });
    this.guestForm?.notifyOnChanges();
    console.log(this.guests)
    for (var guest of this.guests) {
      if (guest.haserror) {
        hasErrors = true;
        break;
      }
    }
    if (hasErrors !== true) {
      this.save = !this.save
    }
  }



  onAdd() {
    this.guests.push({
      id: this.counter++,
      name: '',
      surname: '',
      guestAcceptance: false,
      food: '',
      transfer: false,
      childrens: false,
      night: false,
      schampange: false,
      vine: false,
      strongalcohol: false,
      alcoholfree: false,
      comment: '',
      haserror: true
    })
  }

  onDeleteGuest(guest: Guest) {
    this.guests.forEach((x, index) => {
      if (x.id === guest.id) this.guests.splice(index, 1)
    });
  }
}

interface Guest {
  id: number,
  name: string,
  surname: string,
  guestAcceptance: boolean,
  food: string,
  transfer: boolean,
  childrens: boolean,
  night: boolean
  schampange: boolean,
  vine: boolean,
  strongalcohol: boolean,
  alcoholfree: boolean,
  comment: string
  haserror: boolean
}
