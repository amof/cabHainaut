import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RocglaceComponent } from './rocglace.component';

describe('RocglaceComponent', () => {
  let component: RocglaceComponent;
  let fixture: ComponentFixture<RocglaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RocglaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RocglaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
