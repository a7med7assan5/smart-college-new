import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { changePasswordPage } from './change-password.page';

const routes: Routes = [
  {
    path: '',
    component: changePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class changePasswordPageRoutingModule {}
