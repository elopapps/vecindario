import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd,Router } from "@angular/router";
import { MemoryService } from '../../services/memory.service';
import { Neighbour } from '../../classes/neighbour';
import { FadeAnimation } from '../../animations/fade';

@Component({
  selector: 'app-gnome',
  templateUrl: './gnome.component.html',
  animations: [FadeAnimation],
  styleUrls: ['./gnome.component.css']
})
export class GnomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private memServ:MemoryService, private router:Router) { }
  private idSel:number;
  private gnomeFound:boolean = false;
  private theGnome:Neighbour;
  private theFriends:any[];

  ngOnInit() {
/*       this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)){
            return;
        }
        if(this.route.snapshot["_routerState"].url!="/loggedin/village"){
          window.scrollTo(0, 0)
        }
      }); */

      this.route.params.subscribe( params => {
          this.idSel = params['id'];
          this.theGnome = this.memServ.getGnome(this.idSel);
          this.theFriends = this.memServ.getFriends(this.theGnome.friends);
      });
  }

}
