import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoViewItem } from './to-do-view-item';

describe('ToDoViewItem', () => {
  let component: ToDoViewItem;
  let fixture: ComponentFixture<ToDoViewItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoViewItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoViewItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
