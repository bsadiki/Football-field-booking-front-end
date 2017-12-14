import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReparationTerrainComponent } from './reparation-terrain.component';

describe('ReparationTerrainComponent', () => {
  let component: ReparationTerrainComponent;
  let fixture: ComponentFixture<ReparationTerrainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReparationTerrainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReparationTerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
