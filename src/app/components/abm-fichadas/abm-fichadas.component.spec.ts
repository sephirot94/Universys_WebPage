import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmFichadasComponent } from './abm-fichadas.component';

describe('AbmFichadasComponent', () => {
  let component: AbmFichadasComponent;
  let fixture: ComponentFixture<AbmFichadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmFichadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmFichadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
