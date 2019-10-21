import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsNamesComponent } from './drugs-names.component';

describe('DrugsNamesComponent', () => {
  let component: DrugsNamesComponent;
  let fixture: ComponentFixture<DrugsNamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugsNamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
