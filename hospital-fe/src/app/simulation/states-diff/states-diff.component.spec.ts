import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesDiffComponent } from './states-diff.component';

describe('StatesDiffShortComponent', () => {
  let component: StatesDiffComponent;
  let fixture: ComponentFixture<StatesDiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatesDiffComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
