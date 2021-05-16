import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectAnswerComponent } from './correct-answer.component';

describe('CorrectAnswerComponent', () => {
  let component: CorrectAnswerComponent;
  let fixture: ComponentFixture<CorrectAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorrectAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
