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
    {points: 15, time: 15, name: "Alexander"},
    {points: 14, time: 18, name: "Alexander"},
    {points: 12, time: 23, name: "Ralph"},
    {points: 9, time: 40, name: "Tom"},
  ];

  constructor() { }

  public list(): Observable<Score[]> {
    return of(this.data).pipe(delay(3000));
  }

  public submit(score: Score): Observable<boolean> {
    this.data.push(score);
    this.data.sort( (a:Score, b:Score) => a.points > b.points ? -1 : 1 );
    return of(true).pipe(delay(2000));
  }
}
