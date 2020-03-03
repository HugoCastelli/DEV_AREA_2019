import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AdminComponent} from './admin.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminComponent,
      ],
      imports: [
        MatTableModule,
        MatMenuModule,
        HttpClientTestingModule,
        HttpClientModule,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
