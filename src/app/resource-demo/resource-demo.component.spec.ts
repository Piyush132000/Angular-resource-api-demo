import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceDemoComponent } from './resource-demo.component';

describe('ResourceDemoComponent', () => {
  let component: ResourceDemoComponent;
  let fixture: ComponentFixture<ResourceDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
