import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryLoginDbService implements InMemoryDbService {

  constructor() { }

  createDb() {
      let users = [
        { id: 1, username: 'jonoesido' , password: 'macarrones!' },
        { id: 2, username: 'anadando', password: 'torrijas!' }
      ];
      return {users};
    }
}
