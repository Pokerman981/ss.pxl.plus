/*
 * Copyright (c) 2020. Troy Gidney
 * All rights reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * File Last Modified: 4/29/20, 3:55 AM
 * File: app-routing.module.ts
 * Project: ss.pxl.plus
 */

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {BaseComponent} from './components/base/base.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'base', component: BaseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
