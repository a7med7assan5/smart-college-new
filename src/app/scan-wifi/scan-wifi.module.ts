import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { scanWifiPageRoutingModule } from './scan-wifi-routing.module';

import { scanWifiPage } from './scan-wifi.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    scanWifiPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [scanWifiPage]
})
export class scanWifiPageModule {}
