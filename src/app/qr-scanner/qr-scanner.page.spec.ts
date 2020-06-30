import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QRScannerPage } from './qr-scanner.page';

describe('QRScannerPage', () => {
  let component: QRScannerPage;
  let fixture: ComponentFixture<QRScannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRScannerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QRScannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
