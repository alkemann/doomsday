import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  private nextId: number = 51;

  constructor() { }

  createDb() {
    const scores = [
      {id: 11, points: 6, time: 15, name: "Great"},
      {id: 21, points: 4, time: 18, name: "Good"},
      {id: 31, points: 3, time: 23, name: "Meh"},
      {id: 41, points: 2, time: 40, name: "Bad"},
    ];
    return {scores};
  }

  getId() {
    const now = this.nextId;
    this.nextId += 10;
    return now;
  }

}
