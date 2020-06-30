import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { bluetoothDetailPage } from './bluetooth-detail.page';

describe('bluetoothDetailPage', () => {
  let component: bluetoothDetailPage;
  let fixture: ComponentFixture<bluetoothDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ bluetoothDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(bluetoothDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
