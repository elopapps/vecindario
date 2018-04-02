import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VillageComponent } from './components/village/village.component';
import { GnomeComponent } from './components/gnome/gnome.component';
import { LoggedinComponent } from './components/loggedin/loggedin.component';
import { LoginComponent } from './components/login/login.component';
import { OnlyLoggedGuard } from './guards/only-logged-guard';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'loggedin', component: LoggedinComponent, canActivate: [OnlyLoggedGuard], children: [
        {path: '', redirectTo: 'village' , pathMatch: 'full'}, 
        {path: 'village', component: VillageComponent}, 
        {path:'gnome/:id', component: GnomeComponent}, 
    ]},
    {path: '**', component: LoginComponent}
/*     ,
    { path:'village', component: VillageComponent},
    { path:'gnome', component: GnomeComponent} */
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule{}