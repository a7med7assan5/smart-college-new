import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { scanBeaconPageRoutingModule } from './scan-beacon-routing.module';

import { scanBeaconPage } from './scan-beacon.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    scanBeaconPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [scanBeaconPage]
})
export class scanBeaconPageModule {}
