import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FilterService {

  private subject = new Subject<any>();

  constructor() { }

  //Get filter term changes from header
  sendTerm(message: string) {
      this.subject.next({ text: message });
  }

  clearTerm() {
      this.subject.next();
  }

  //Send filter term to consumer (VillageComponent)
  getTerm(): Observable<any> {
      return this.subject.asObservable();
  }

}
