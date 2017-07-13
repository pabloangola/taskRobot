import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionBatchComponent } from './informacion-batch.component';

describe('InformacionBatchComponent', () => {
  let component: InformacionBatchComponent;
  let fixture: ComponentFixture<InformacionBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionBatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
