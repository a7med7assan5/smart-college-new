import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { scanWifiPage } from './scan-wifi.page';

const routes: Routes = [
  {
    path: '',
    component: scanWifiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class scanWifiPageRoutingModule {}
