import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandeliesComponent } from './landelies.component';

describe('LandeliesComponent', () => {
  let component: LandeliesComponent;
  let fixture: ComponentFixture<LandeliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandeliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandeliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
