import { Config } from './../interfaces/config';
import { Injectable } from '@angular/core';
import { Observable, of, map, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Score {
  name: string;
  points: number;
  time: number;
}

export interface List {
  name: string;
  config: Config;
  scores: Score[];
}

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {

  private scoresUrl = 'api/scores';

  constructor(
    private http: HttpClient,
  ) { }

  public list(config:Config): Observable<Score[]> {
    return this.http
      .get<Score[]>(this.scoresUrl)
      .pipe(
        tap(_ => console.log("GOT HIGHSCORE!")),
        catchError(this.handleError<Score[]>('list', [])),
        map((list:Score[]) => list.sort((a:Score, b:Score) => a.points < b.points ? 1 : -1))
      );
  }

  handleError<T>(operation:string = 'op', result?: T) {
    return (error: any): Observable<T> => {
      console.error({error, operation, result});
      return of(result as T);
    };
  }

  public submit(score: Score): Observable<Score> {
    return this.http.post<Score>(this.scoresUrl, score)
      .pipe(tap( r => console.log({r, m:"Got one"})));
  }
}
