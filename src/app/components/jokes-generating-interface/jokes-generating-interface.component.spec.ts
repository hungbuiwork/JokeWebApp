import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokesGeneratingInterfaceComponent } from './jokes-generating-interface.component';

describe('JokesGeneratingInterfaceComponent', () => {
  let component: JokesGeneratingInterfaceComponent;
  let fixture: ComponentFixture<JokesGeneratingInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JokesGeneratingInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokesGeneratingInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
