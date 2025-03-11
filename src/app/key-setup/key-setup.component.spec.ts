import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeySetupComponent } from './key-setup.component';

describe('KeySetupComponent', () => {
  let component: KeySetupComponent;
  let fixture: ComponentFixture<KeySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeySetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
