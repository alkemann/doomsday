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

  private data = [
    {points: 6, time: 15, name: "Great"},
    {points: 4, time: 18, name: "Good"},
    {points: 3, time: 23, name: "Meh"},
    {points: 2, time: 40, name: "Bad"},
  ];

  constructor() { }

  public list(): Observable<Score[]> {
    return of(this.data).pipe(delay(1000));
  }

  public submit(score: Score): Observable<boolean> {
    this.data.push(score);
    this.data.sort( (a:Score, b:Score) => a.points > b.points ? -1 : 1 );
    return of(true).pipe(delay(1000));
  }
}
