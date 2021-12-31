import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterTitleComponent } from './parameter-title.component';

describe('ParameterTitleComponent', () => {
  let component: ParameterTitleComponent;
  let fixture: ComponentFixture<ParameterTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
