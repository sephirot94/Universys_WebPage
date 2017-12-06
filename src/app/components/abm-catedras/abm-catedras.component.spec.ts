import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmCatedrasComponent } from './abm-catedras.component';

describe('AbmCatedrasComponent', () => {
  let component: AbmCatedrasComponent;
  let fixture: ComponentFixture<AbmCatedrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbmCatedrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbmCatedrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
