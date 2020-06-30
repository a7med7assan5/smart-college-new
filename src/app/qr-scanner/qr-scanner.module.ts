import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRScannerPageRoutingModule } from './qr-scanner-routing.module';

import { QRScannerPage } from './qr-scanner.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRScannerPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [QRScannerPage]
})
export class QRScannerPageModule {}
