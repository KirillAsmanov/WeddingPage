import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';


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
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './guestform.component.html',
  styleUrl: './guestform.component.css'
})
export class GuestformComponent implements OnInit {
  selectedValue: boolean = true;
  @Input() guest!: Guest;
  @Output() deleteGuest: EventEmitter<any> = new EventEmitter<any>();

  errorMessage = signal('');

  showErrorName: boolean = false;
  showErrorSurname: boolean = false;
  showErrorDrinks: boolean = false;

  FOOD_ENUM: Food[] = [
    { foodName: 'Мясо' },
    { foodName: 'Рыба' },
    { foodName: 'Овощи и грибы' },
  ]

  nameFc: FormControl = new FormControl('', [Validators.required]);
  surnameFc: FormControl = new FormControl('', [Validators.required]);
  guestAcceptanceFc: FormControl = new FormControl(true, [Validators.required])
  foodFc: FormControl = new FormControl(this.FOOD_ENUM[0].foodName, [Validators.required]);
  transferFc: FormControl = new FormControl(true, [Validators.required])
  childrensFc: FormControl = new FormControl(false, [Validators.required])
  nightFc: FormControl = new FormControl(true, [Validators.required])

  schampangeFc: FormControl = new FormControl(false, [Validators.required])
  vineFc: FormControl = new FormControl(false, [Validators.required])
  strongalcoholFc: FormControl = new FormControl(false, [Validators.required])
  alcoholfreeFc: FormControl = new FormControl(false, [Validators.required])

  commentFc: FormControl = new FormControl('');

  guestForm = new FormGroup({
    'name': this.nameFc,
    'surname': this.surnameFc,
    'guestAcceptance': this.guestAcceptanceFc,
    'food': this.foodFc,
    'transfer': this.transferFc,
    'childrens': this.childrensFc,
    'night': this.nightFc,

    'schampange': this.schampangeFc,
    'vine': this.vineFc,
    'strongalcohol': this.strongalcoholFc,
    'alcoholfree': this.alcoholfreeFc,

    'comment': this.commentFc
  });


  constructor() {
    merge(this.nameFc.statusChanges, this.nameFc.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.checkErrorName());
    merge(this.surnameFc.statusChanges, this.surnameFc.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.checkErrorSurname());
    merge(this.schampangeFc.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.checkErrorDrinks());
    merge(this.vineFc.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.checkErrorDrinks());
      merge(this.strongalcoholFc.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.checkErrorDrinks());
      merge(this.alcoholfreeFc.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.checkErrorDrinks());
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  onChange(event: MatRadioChange) {
    if (event.value === true) {
      this.selectedValue = true;
      this.foodFc.setValue(this.FOOD_ENUM[0].foodName);
      this.transferFc.setValue(true);
      this.childrensFc.setValue(false);
      this.nightFc.setValue(true);

      this.schampangeFc.setValue(false);
      this.vineFc.setValue(false);
      this.strongalcoholFc.setValue(false);
      this.alcoholfreeFc.setValue(false);
      this.commentFc.setValue('');
    } else {
      this.selectedValue = false;
      this.foodFc.setValue('');
      this.transferFc.setValue(false);
      this.childrensFc.setValue(false);
      this.nightFc.setValue(false);

      this.schampangeFc.setValue(false);
      this.vineFc.setValue(false);
      this.strongalcoholFc.setValue(false);
      this.alcoholfreeFc.setValue(false);
      this.commentFc.setValue('');
    }
  }

  doDeleteGuest() {
    this.deleteGuest.emit();
  }

  doSendGuestInfo() {
    // if (this.validateFields()) {
    this.checkErrorName();
    this.checkErrorSurname();
    this.checkErrorDrinks();

    this.guest.name = this.guestForm.value.name,
      this.guest.surname = this.guestForm.value.surname,
      this.guest.guestAcceptance = this.guestForm.value.guestAcceptance === true ? true : false,
      this.guest.food = this.guestForm.value.food,
      this.guest.transfer = this.guestForm.value.transfer === true ? true : false,
      this.guest.childrens = this.guestForm.value.childrens === true ? true : false,
      this.guest.night = this.guestForm.value.night === true ? true : false,

      this.guest.schampange = this.guestForm.value.schampange === true ? true : false,
      this.guest.vine = this.guestForm.value.vine === true ? true : false,
      this.guest.strongalcohol = this.guestForm.value.strongalcohol === true ? true : false,
      this.guest.alcoholfree = this.guestForm.value.alcoholfree === true ? true : false,
      this.guest.comment = this.guestForm.value.comment,
      this.guest.haserror = this.showErrorName || this.showErrorSurname || (this.guest.guestAcceptance && this.showErrorDrinks)
  }


  checkErrorName() {
    if (this.nameFc.hasError('required')) {
      this.errorMessage.set('Это поле обязательно');
      this.showErrorName = true;
      this.nameFc.markAsTouched()
    } else {
      this.showErrorName = false;
    }
  }

  checkErrorSurname() {
    if (this.surnameFc.hasError('required')) {
      this.errorMessage.set('Это поле обязательно');
      this.showErrorSurname = true;
      this.surnameFc.markAsTouched()
    } else {
      this.showErrorSurname = false;
    }
  }

  checkErrorDrinks() {
    if (this.alcoholfreeFc.value !== true
      && this.strongalcoholFc.value !== true
      && this.vineFc.value !== true
      && this.schampangeFc.value !== true) {
      this.errorMessage.set('Это поле обязательно');
      this.showErrorDrinks = true;
    } else {
      this.showErrorDrinks = false;
    }
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
  comment: string,
  haserror: boolean
}

interface Food {
  foodName: string
}