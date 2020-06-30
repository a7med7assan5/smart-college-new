import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { changeEmailPage } from './change-email.page';

describe('changeEmailPage', () => {
  let component: changeEmailPage;
  let fixture: ComponentFixture<changeEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ changeEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(changeEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
