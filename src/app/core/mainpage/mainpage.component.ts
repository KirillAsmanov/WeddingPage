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
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

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
    console.log(this.humanizeGuestsOutput())
    for (var guest of this.guests) {
      if (guest.haserror) {
        hasErrors = true;
        break;
      }
    }
    if (hasErrors !== true) {
      this.save = !this.save
      emailjs.init('SCrpGc_xg8ABD4muk');
      emailjs.send("KirillPolinaWedding", "template_xppn4s8", {
        humanRead: this.humanizeGuestsOutput(),
        message: JSON.stringify(this.guests)
      });
    }
  }


  humanizeGuestsOutput(): string {
    var humanizeString = 'Гости: ' + '\n';
    for (var guest of this.guests) {
      humanizeString = humanizeString + 'Имя: ' + guest.name + ' ' + guest.surname + '\n';
      humanizeString = humanizeString + 'Присутствие: ' + guest.guestAcceptance + '\n';
      if (guest.guestAcceptance) {
        humanizeString = humanizeString + 'Еда: ' + guest.food + '\n';
        humanizeString = humanizeString + 'Трансфер: ' + guest.transfer + '\n';
        humanizeString = humanizeString + 'Остается на ночь: ' + guest.night + '\n';
        humanizeString = humanizeString + 'Напитки: ';
        if (guest.schampange === true) {
          humanizeString = humanizeString + 'Игристое' + ' ';
        }
        if (guest.vine === true) {
          humanizeString = humanizeString + 'Вино' + ' ';
        }
        if (guest.strongalcohol === true) {
          humanizeString = humanizeString + 'Крепкое' + ' ';
        }
        if (guest.alcoholfree === true) {
          humanizeString = humanizeString + 'Безлкогольное' + ' ';
        }
        humanizeString = humanizeString + '\n';
        humanizeString = humanizeString + 'Комментарий: ' + guest.comment + '\n';
      }
      humanizeString = humanizeString + '\n';
    }
    return humanizeString;
  }



  onAdd() {
    this.guests.push({
      id: this.counter++,
      name: '',
      surname: '',
      guestAcceptance: false,
      food: '',
      transfer: false,
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
  night: boolean
  schampange: boolean,
  vine: boolean,
  strongalcohol: boolean,
  alcoholfree: boolean,
  comment: string
  haserror: boolean
}
