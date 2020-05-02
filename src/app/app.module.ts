import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { BaseComponent } from './components/base/base.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {CookieService} from 'ngx-cookie-service';
import {MatListModule} from '@angular/material/list';
import { ServerstatusComponent } from './components/base/views/serverstatus/serverstatus.component';
import { HomeComponent } from './components/base/views/home/home.component';
import { EcotrackerComponent } from './components/base/views/ecotracker/ecotracker.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    NavigationComponent,
    BaseComponent,
    ServerstatusComponent,
    HomeComponent,
    EcotrackerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatSidenavModule,
    RouterModule,
    AppRoutingModule,
    MatListModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
