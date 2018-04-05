import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../classes/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  private user:User;
  private formError:boolean = false;
  private isLoading:boolean = false;

  constructor(private loginService:LoginService, private fb:FormBuilder, private router:Router) { 
        this.loginForm  = fb.group({
            inputUser: ['',[Validators.required,]],
            inputPassword: ['',[Validators.required,]],
        })
  }

    ngOnInit() {
        if(this.loginService.isUserLogged()){
            this.router.navigate(['/loggedin']);
        }
    }

    public onFormSubmit() {
        if(this.loginForm.valid) {
            this.formError = false;
            this.isLoading = true;
            let user = this.loginForm.controls['inputUser'].value;
            let pass = this.loginForm.controls['inputPassword'].value;
            this.loginService.logIn(user,pass).subscribe(result => {
                this.isLoading = false;
                if(result){
                    this.router.navigate(['loggedin']);
                }
                else{
                    this.formError = true;
                }
            },
            err => {
                this.isLoading = false;
                this.formError = true;
                console.log(err );
            });

        }
        else{
            this.formError = true;
        }
    }

}
