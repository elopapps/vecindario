import { Injectable } from '@angular/core';
import { Neighbour } from '../classes/neighbour';

@Injectable()
export class MemoryService {

  constructor() { }

  saveGnomes(items:Neighbour[]){
      const arrayToObjectId = (array) =>
      array.reduce((obj, item) => {
        obj[item.id] = item
        return obj
      }, {})
      const arrayToObjectName = (array) =>
      array.reduce((obj, item) => {
        obj[item.name] = item
        return obj
      }, {})
      const gnomesById  = arrayToObjectId([...items]);
      const gnomesByName  = arrayToObjectName([...items]);
      localStorage.setItem("peopleById", JSON.stringify(gnomesById)); 
      localStorage.setItem("peopleByName", JSON.stringify(gnomesByName)); 
      localStorage.setItem("current-date", JSON.stringify(Date.now()));
      console.log("GNOMES SAVED BY ID", gnomesById);
      console.log("GNOMES SAVED BY NAME", gnomesByName);
  }

  private getGnomesMapedId():Neighbour[]{
      let peopleObject:Object = JSON.parse(localStorage.getItem("peopleById"));
      return this.convertToArray(peopleObject);
  }

  private getGnomesMapedName():Object{
    let peopleObject:Object = JSON.parse(localStorage.getItem("peopleByName"));
    return peopleObject;
  }

  private getGnomesFilteredName(names:string[]){
    let spread:Object= {...this.getGnomesMapedName()};
    const filtered = Object.keys(spread)
    .filter(key => names.includes(key))
    .reduce((obj, key) => {
        return {
        ...obj,
        [key]: spread[key]
        };
    }, {});

    return filtered;
  }

  private convertToArray(obj:Object):Neighbour[]{
      if(obj){
        let peopleArray:Neighbour[] = Object.keys(obj).map(i => obj[i]);
        console.log("ARRAY OF PEOPLE FROM MEMORY : ", peopleArray);
        return peopleArray;
      }
      else{
          return [];
      }
  }

  getGnome(id:number):Neighbour{
      console.log("GNOME GET FROM MEMORY: ", this.getGnomesMapedId()[id]);
      return this.getGnomesMapedId()[id];
  }

  getGnomes():Neighbour[]{
     return this.getGnomesMapedId();
  }

  areSavedGnomes():boolean{
      return this.getGnomes().length > 0;
  }

  getFriends(names:string[]){
      return this.convertToArray(this.getGnomesFilteredName(names));
  }

  getLastTime():number{
      return JSON.parse(localStorage.getItem("current-date")) || null;
  }
}
