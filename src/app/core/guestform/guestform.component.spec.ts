import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestformComponent } from './guestform.component';

describe('GuestformComponent', () => {
  let component: GuestformComponent;
  let fixture: ComponentFixture<GuestformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
