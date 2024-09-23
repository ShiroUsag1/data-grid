import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagridFooterComponent } from './datagrid-footer.component';

describe('DatagridFooterComponent', () => {
  let component: DatagridFooterComponent;
  let fixture: ComponentFixture<DatagridFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatagridFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatagridFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
