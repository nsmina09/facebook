import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EachMessageComponent } from './each-message.component';

describe('EachMessageComponent', () => {
  let component: EachMessageComponent;
  let fixture: ComponentFixture<EachMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EachMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EachMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
