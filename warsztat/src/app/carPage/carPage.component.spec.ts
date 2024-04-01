/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarPageComponent } from './carPage.component';

describe('CarPageComponent', () => {
  let component: CarPageComponent;
  let fixture: ComponentFixture<CarPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
