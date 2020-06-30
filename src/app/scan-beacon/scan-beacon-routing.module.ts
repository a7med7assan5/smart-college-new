import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { scanBeaconPage } from './scan-beacon.page';

const routes: Routes = [
  {
    path: '',
    component: scanBeaconPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class scanBeaconPageRoutingModule {}
