import { CanActivate } from "@angular/router";
import { LoginService } from "../services/login.service";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class OnlyLoggedGuard implements CanActivate {
    private logged = false;

    constructor(private loginService:LoginService, private router:Router ){
    }

    canActivate() {
        if (this.loginService.isUserLogged()) {
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['']);
        return false;
    }
}