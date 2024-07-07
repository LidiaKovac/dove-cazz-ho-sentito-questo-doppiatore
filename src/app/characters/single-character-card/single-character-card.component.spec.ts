import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCharacterCardComponent } from './single-character-card.component';

describe('SingleCharacterCardComponent', () => {
  let component: SingleCharacterCardComponent;
  let fixture: ComponentFixture<SingleCharacterCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleCharacterCardComponent]
    });
    fixture = TestBed.createComponent(SingleCharacterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
