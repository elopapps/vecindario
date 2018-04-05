import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private filterActive:boolean = false;
  private form: FormGroup;
  private inListMode:boolean = true;
  private formCtrlSub:Subscription;

  constructor(private filterService: FilterService, private activatedRoute: ActivatedRoute, private fb:FormBuilder, 
              private loginService:LoginService, private router:Router) {
    this.form  = fb.group({
        search: ['']
    })
   }

  ngOnInit() {
      this.activatedRoute.url.subscribe(url =>{
          this.inListMode = (this.activatedRoute.snapshot["_routerState"].url=="/loggedin/village");
      });

      // send message to subscribers via observable subject
      this.formCtrlSub = this.form.controls["search"].valueChanges
        .debounceTime(500)
        .subscribe(newValue => this.filterService.sendTerm(newValue));
  }

  sendFilter(search){

  }

  clearFilter(): void {
      // clear message
      this.filterService.clearTerm();
  }

  logout(){
      this.loginService.logOut();
  }

  goToList(){
      this.router.navigate(['/loggedin/village']);
  }

}
