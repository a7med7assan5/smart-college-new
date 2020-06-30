import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { scanBluetoothPage } from './scan-bluetooth.page';

const routes: Routes = [
  {
    path: '',
    component: scanBluetoothPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class scanBluetoothPageRoutingModule {}
