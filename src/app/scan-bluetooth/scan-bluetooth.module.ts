import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { scanBluetoothPageRoutingModule } from './scan-bluetooth-routing.module';

import { scanBluetoothPage } from './scan-bluetooth.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    scanBluetoothPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [scanBluetoothPage]
})
export class scanBluetoothPageModule {}
