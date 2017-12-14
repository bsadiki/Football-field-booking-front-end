import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangementPelouseComponent } from './changement-pelouse.component';

describe('ChangementPelouseComponent', () => {
  let component: ChangementPelouseComponent;
  let fixture: ComponentFixture<ChangementPelouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangementPelouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangementPelouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
