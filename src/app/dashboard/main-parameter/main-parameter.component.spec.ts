import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainParameterComponent } from './main-parameter.component';

describe('ParameterComponent', () => {
  let component: MainParameterComponent;
  let fixture: ComponentFixture<MainParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
