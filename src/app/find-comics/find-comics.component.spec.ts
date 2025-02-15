import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindComicsComponent } from './find-comics.component';

describe('FindComicsComponent', () => {
  let component: FindComicsComponent;
  let fixture: ComponentFixture<FindComicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindComicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
