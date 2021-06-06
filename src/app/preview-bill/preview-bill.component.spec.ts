import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBillComponent } from './preview-bill.component';

describe('PreviewBillComponent', () => {
  let component: PreviewBillComponent;
  let fixture: ComponentFixture<PreviewBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
