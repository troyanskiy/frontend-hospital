import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsShortComponent } from './drugs-short.component';

describe('DrugsShortComponent', () => {
  let component: DrugsShortComponent;
  let fixture: ComponentFixture<DrugsShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugsShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
