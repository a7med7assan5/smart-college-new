import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { changeEmailPage } from './change-email.page';

const routes: Routes = [
  {
    path: '',
    component: changeEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class changeEmailPageRoutingModule {}
