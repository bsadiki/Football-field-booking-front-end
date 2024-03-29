import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementComponent } from './abonnement.component';

describe('AbonnementComponent', () => {
  let component: AbonnementComponent;
  let fixture: ComponentFixture<AbonnementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonnementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
