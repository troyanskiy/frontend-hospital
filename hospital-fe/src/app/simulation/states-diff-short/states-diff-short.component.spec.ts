import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesDiffShortComponent } from './states-diff-short.component';

describe('StatesDiffShortComponent', () => {
  let component: StatesDiffShortComponent;
  let fixture: ComponentFixture<StatesDiffShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesDiffShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesDiffShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
