import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApkComponent} from './apk.component';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('ApkComponent', () => {
  let component: ApkComponent;
  let fixture: ComponentFixture<ApkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApkComponent],
      imports: [RouterTestingModule, RouterModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
