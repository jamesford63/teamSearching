import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSearchingComponent } from './project-searching.component';

describe('ProjectSearchingComponent', () => {
  let component: ProjectSearchingComponent;
  let fixture: ComponentFixture<ProjectSearchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSearchingComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
