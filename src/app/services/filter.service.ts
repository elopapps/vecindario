import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FilterService {

  private subject = new Subject<any>();

  constructor() { }

  sendTerm(message: string) {
      this.subject.next({ text: message });
  }

  clearTerm() {
      this.subject.next();
  }

  getTerm(): Observable<any> {
      return this.subject.asObservable();
  }

}
