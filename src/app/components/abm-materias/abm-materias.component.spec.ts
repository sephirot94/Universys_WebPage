import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmMateriasComponent } from './abm-materias.component';

describe('AbmMateriasComponent', () => {
  let component: AbmMateriasComponent;
  let fixture: ComponentFixture<AbmMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
