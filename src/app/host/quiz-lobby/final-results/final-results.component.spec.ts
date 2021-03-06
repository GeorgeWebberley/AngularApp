import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalResultsComponent } from './final-results.component';

describe('FinalResultsComponent', () => {
  let component: FinalResultsComponent;
  let fixture: ComponentFixture<FinalResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalResultsComponent],
      imports: [BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
