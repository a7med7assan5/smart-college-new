import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { scanBeaconPage } from './scan-beacon.page';

describe('scanBeaconPage', () => {
  let component: scanBeaconPage;
  let fixture: ComponentFixture<scanBeaconPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ scanBeaconPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(scanBeaconPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
