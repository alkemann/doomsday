import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Score {
  name: string;
  points: number;
  time: number;
}

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {

  constructor() { }

  public list(): Observable<Score[]> {
    const data = of([
      {points: 15, time: 15, name: "Alexander"},
      {points: 14, time: 18, name: "Alexander"},
      {points: 12, time: 23, name: "Ralph"},
      {points: 9, time: 40, name: "Tom"},
    ]).pipe(delay(10000));
    return data;
  }
}
