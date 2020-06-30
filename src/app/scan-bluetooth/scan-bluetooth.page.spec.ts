import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { scanBluetoothPage } from './scan-bluetooth.page';

describe('scanBluetoothPage', () => {
  let component: scanBluetoothPage;
  let fixture: ComponentFixture<scanBluetoothPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ scanBluetoothPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(scanBluetoothPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
