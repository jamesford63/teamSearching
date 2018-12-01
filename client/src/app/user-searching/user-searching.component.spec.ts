import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchingComponent } from './user-searching.component';

describe('UserSearchingComponent', () => {
  let component: UserSearchingComponent;
  let fixture: ComponentFixture<UserSearchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchingComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
