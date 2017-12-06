import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmNotasComponent } from './abm-notas.component';

describe('AbmNotasComponent', () => {
  let component: AbmNotasComponent;
  let fixture: ComponentFixture<AbmNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
