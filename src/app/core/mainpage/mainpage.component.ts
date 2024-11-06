import { Component, inject } from '@angular/core';
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
import { Subject } from 'rxjs';

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
  guests: Guest[] = [];
  guestsCounter: number[] = [1];
  eventsSubject: Subject<void> = new Subject<void>();

  constructor() {
  }


  onAccept() {
    this.accept = !this.accept;
  }

  onSave() {
    this.eventsSubject.next();
  }

  onAdd() {
    this.guestsCounter.push(1);
  }

  doAddGuestToList($guest: Guest) {
    this.guests.push($guest);
    console.log(this.guests)
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
