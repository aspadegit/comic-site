import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComicRowComponent } from './my-comic-row.component';

describe('MyComicRowComponent', () => {
  let component: MyComicRowComponent;
  let fixture: ComponentFixture<MyComicRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComicRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyComicRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
