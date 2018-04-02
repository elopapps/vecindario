import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private filterActive:boolean = false;
  private form: FormGroup;
  private inListMode:boolean = true;

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
  }

  sendFilter(search){
      // send message to subscribers via observable subject
      this.filterService.sendTerm(search.target.value);
      console.log("FILTER SEARCH ON HEADER: ", search);
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
