import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadorComponent } from './chamador.component';

describe('ChamadorComponent', () => {
  let component: ChamadorComponent;
  let fixture: ComponentFixture<ChamadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
