import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { changePasswordPage } from './change-password.page';

describe('changePasswordPage', () => {
  let component: changePasswordPage;
  let fixture: ComponentFixture<changePasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ changePasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(changePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
