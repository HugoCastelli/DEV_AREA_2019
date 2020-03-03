import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBlankComponent } from './layout-blank.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('LayoutBlankComponent', () => {
  let component: LayoutBlankComponent;
  let fixture: ComponentFixture<LayoutBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutBlankComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
