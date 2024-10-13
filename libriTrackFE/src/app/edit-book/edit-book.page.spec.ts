import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBookPage } from './edit-book.page';

describe('EditBookPage', () => {
  let component: EditBookPage;
  let fixture: ComponentFixture<EditBookPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
