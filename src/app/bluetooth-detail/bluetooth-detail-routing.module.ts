import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { bluetoothDetailPage } from './bluetooth-detail.page';

const routes: Routes = [
  {
    path: '',
    component: bluetoothDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class bluetoothDetailPageRoutingModule {}
