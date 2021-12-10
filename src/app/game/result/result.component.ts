import { Round } from 'src/app/round';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

export interface Result {
 round: number,
 time: number,
 guess: string,
 date: string,
 correct: boolean,
 points: number,
}

export interface Totals {
  time: number,
  score: number,
  correct: number
}

@Component({
  selector: 'game-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input() rounds: Round[];

  @Output() restart: EventEmitter<any> = new EventEmitter();

  public results: Result[];
  public total: Totals;

  public d : string[] = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ];

  displayedColumns: string[] = ['round', 'guess', 'date'  ]; // , 'correct', 'points' 'time', 

  constructor() { }

  ngOnInit(): void {
    this.scorebard();

  }

  ngOnChange(): void {
    this.scorebard();
  }

  private scorebard(): void {
    console.log("Updating scoreboard!");
    this.results = [];
    this.total = {
      time: 0,
      score: 0,
      correct: 0
    };
    for (let index = 0; index < this.rounds.length; index++) {
      const r = this.rounds[index];
      this.results[index] = {
        round: index + 1,
        time: r.timed,
        guess: this.d[r.guess],
        date: r.fullDate,
        correct: r.correct === r.guess,
        points: r.correct === r.guess ? 1 : 0
      }
      this.total.time += r.timed;
      this.total.correct += r.correct === r.guess ? 1 : 0;
      this.total.score += r.correct === r.guess ? 1 : -1;
      this.total.score = Math.max(this.total.score, 0);
    }
  }

}
