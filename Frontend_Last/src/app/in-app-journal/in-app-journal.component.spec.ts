import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InAppJournalComponent } from './in-app-journal.component';

describe('InAppJournalComponent', () => {
  let component: InAppJournalComponent;
  let fixture: ComponentFixture<InAppJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InAppJournalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InAppJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
