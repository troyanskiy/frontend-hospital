import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsStatesBeforeAndAfterComponent } from './patients-states-before-and-after.component';

describe('ResultsComponent', () => {
  let component: PatientsStatesBeforeAndAfterComponent;
  let fixture: ComponentFixture<PatientsStatesBeforeAndAfterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsStatesBeforeAndAfterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsStatesBeforeAndAfterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
