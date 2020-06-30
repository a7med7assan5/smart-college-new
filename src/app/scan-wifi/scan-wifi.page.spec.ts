import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { scanWifiPage } from './scan-wifi.page';

describe('scanWifiPage', () => {
  let component: scanWifiPage;
  let fixture: ComponentFixture<scanWifiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ scanWifiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(scanWifiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
