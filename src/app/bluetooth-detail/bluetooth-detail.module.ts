import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { bluetoothDetailPageRoutingModule } from './bluetooth-detail-routing.module';

import { bluetoothDetailPage } from './bluetooth-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    bluetoothDetailPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [bluetoothDetailPage]
})
export class bluetoothDetailPageModule {}
