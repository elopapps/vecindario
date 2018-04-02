import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { VillageComponent } from './components/village/village.component';
import { GnomeComponent } from './components/gnome/gnome.component';
import { AppRoutingModule } from './app-routing.module';
import { VillageService } from './services/village.service';
import { NeighboursComponent } from './components/village/neighbours/neighbours.component';
import { HeaderComponent } from './components/header/header.component';
import { FilterService } from './services/filter.service';
import { LoggedinComponent } from './components/loggedin/loggedin.component';
import { LoginComponent } from './components/login/login.component';
import { MemoryService } from './services/memory.service';
import { LoginService } from './services/login.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryLoginDbService } from './services/dummy/in-memory-login-db.service';
import { OnlyLoggedGuard } from './guards/only-logged-guard';


@NgModule({
  declarations: [
    AppComponent,
    VillageComponent,
    GnomeComponent,
    NeighboursComponent,
    HeaderComponent,
    LoggedinComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryLoginDbService ,{passThruUnknownUrl: true}),
    ReactiveFormsModule
  ],
  providers: [VillageService, FilterService, MemoryService, LoginService, OnlyLoggedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
