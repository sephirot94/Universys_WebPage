import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmCarrerasComponent } from './abm-carreras.component';

describe('AbmCarrerasComponent', () => {
  let component: AbmCarrerasComponent;
  let fixture: ComponentFixture<AbmCarrerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmCarrerasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
