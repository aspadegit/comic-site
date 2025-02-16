import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindComicRowComponent } from './find-comic-row.component';

describe('FindComicRowComponent', () => {
  let component: FindComicRowComponent;
  let fixture: ComponentFixture<FindComicRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindComicRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindComicRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
