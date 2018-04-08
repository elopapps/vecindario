import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Village } from '../classes/village';

@Injectable()
export class VillageService {

  private endpoint:string = "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

  constructor(private http:HttpClient) { }
  
  /** Fecth gnomes from server **/
  getItems():Observable<Village>{
      return this.http.get<Village>(this.endpoint);
  }
}
