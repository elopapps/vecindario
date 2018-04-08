import { Component, OnInit } from '@angular/core';
import { VillageService } from '../../services/village.service';
import { MemoryService } from '../../services/memory.service';
import { FilterService } from '../../services/filter.service';
import { Neighbour } from '../../classes/neighbour';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { FadeAnimation } from '../../animations/fade';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  animations: [FadeAnimation],
  //host: { '[@fadeAnimation]': '' },
  styleUrls: ['./village.component.css']
})
export class VillageComponent implements OnInit {

  page:number = 0;
  people:Neighbour[] = [];
  scrumbles:Neighbour[];
  size:number = 50;
  private subscription:Subscription;
  private filter:string = "";
  private noresults:boolean = false;
  private disposeObs;
  private isLoading:boolean = false;

  constructor(private vilServ:VillageService, private memServ:MemoryService, private activeRoute:ActivatedRoute, 
  private router:Router, private filterServ:FilterService) { }

  ngOnInit() {
    if(this.filter==''){
        if(this.memServ.areSavedGnomes()){
            this.loadGnomesFromCache();
        }
        else{
          this.fetchServerData();
        }
    }

    //Subscribe to filter subject
    this.subscription = this.filterServ.getTerm().subscribe(message => { 
      this.filter = message.text; 
      this.filterGnomes();
     
    });

  }

  filterGnomes(){
    /***** Filters by name, hair color and profession *****/
      window.scrollTo(0, 0);

      this.loadGnomesFromCache();
      if(this.filter !== ""){
          let filterByName:Neighbour[] = [...this.people].filter(gnome => gnome.name.toUpperCase().indexOf(this.filter.toUpperCase()) > -1);
          let filterByHairColor:Neighbour[] = [...this.people].filter(gnome => gnome.hair_color.toUpperCase().indexOf(this.filter.toUpperCase()) > -1);
          let filterByProfession:Neighbour[] = [...this.people].filter(gnome => gnome.professions.join().toUpperCase().indexOf(this.filter.toUpperCase()) > -1);
          this.people = [...filterByName, ...filterByHairColor, ...filterByProfession];

          this.scrumbleGnomes(0);
          
      }
  }

  loadGnomesFromCache(){
      this.people = this.memServ.getGnomes();
      this.scrumbleGnomes(this.page);
  }

  scrumbleGnomes(page:number){
    /******Divide global data in segments for infinite scroll loading*********/
    const start:number = page*this.size
    const end:number = start + this.size -1;
    this.scrumbles = [...this.people].slice(0, end);
    this.noresults = !this.scrumbles.length;
    this.isLoading = false;;
  }

  onScroll() {
    /** Infinite scroll event callback **/
    this.isLoading = true;
    this.page++;
    this.scrumbleGnomes(this.page);
  }

  neighbourClicked(id:number){
    /* Show gnome detail. Change route. */
    this.router.navigate(['loggedin/gnome', id]), {relativeTo:this.activeRoute};
    console.log("NEIGHBOUR CLICKED: ", id);
  }

  fetchServerData():Neighbour[]{
    this.isLoading = true;
    this.vilServ.getItems().subscribe(result => {
      this.isLoading = false;
      this.people = result.Brastlewark;
      this.memServ.saveGnomes(this.people);
      this.scrumbleGnomes(0);

      console.log("ALL THE GNOMES : " , this.people);
    },
    err => {
        console.log(err );
    });

    return this.people;
  }

  ngOnDestroy() {
    /** Unsubscribe to active observables **/
    if(this.disposeObs){
      this.disposeObs.unsubscribe();
    }
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  
  }

}
