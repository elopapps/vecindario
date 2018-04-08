import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user';
import { Subject } from 'rxjs/Subject';
import { Router } from "@angular/router";

@Injectable()
export class LoginService {

    /*** MOCK API FOR LOGIN PURPOSES ***/

    private endpoint:string = "/api/users";
    private isLoggedIn = new Subject<boolean>();

    constructor(private http:HttpClient, private router:Router) { 
    }

    private getUser(username:string, password:string):Observable<User[]>{
        let url:string = this.endpoint + "?username=" + username + "&password=" + password;
        return this.http.get<User[]>(url);
    }

    logIn(user:string, pass:string):Observable<boolean>{
        this.getUser(user, pass).subscribe(result => {
            if (result.length != 0){
                this.isLoggedIn.next(true);
                localStorage.setItem('loggedIn', JSON.stringify(true));
            }
            else{
                this.isLoggedIn.next(false);
                localStorage.setItem('loggedIn', JSON.stringify(false));
            }
        },
        err => {
            this.isLoggedIn.next(false);
            console.log(err );
        });

        return this.isUserLoggedChange();
    }

    isUserLoggedChange(): Observable<boolean> {
        return this.isLoggedIn.asObservable();
    }

    isUserLogged():boolean{
        if (localStorage.getItem('loggedIn')) {
            // logged in so return true
            if(JSON.parse(localStorage.getItem('loggedIn'))){
                return true;
            }
        }
        return false;
    }

    logOut(){
        this.isLoggedIn.next(false);
        /** Clean cache items. Clean logged info and Gnomes too **/
        localStorage.setItem('loggedIn', JSON.stringify(false));
        localStorage.setItem("peopleById", JSON.stringify([])); 
        localStorage.setItem("peopleByName", JSON.stringify({})); 
        this.router.navigate(['']);
    }

}
