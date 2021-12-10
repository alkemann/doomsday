import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { Round } from '../round';
import { States } from '../states';

@Component({
  selector: 'doomsday-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public config: Config = {
    startYear: 1900,
    endYear: 2100,
    count: 5,
    maxTime: 60
  }

  public state : States = States.SETUP;
  public round : Round | null;
  public timer: number = 40;

  rounds : Round[];
  roundIndex : number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  restart(): void {
    this.state = States.SETUP;
  }

  configUpdated(): void {
    this.roundIndex = 0;
    this.rounds = [];
    const dates = this.randomDates(this.config.count);
    for (let index = 0; index < this.config.count; index++) {
      this.rounds[index] = {
        fullDate: dates[index].toDateString(),
        date: dates[index].getDate() +'-'+ (dates[index].getMonth()+1)  +'-'+ dates[index].getFullYear()   ,
        roundNumber: index,
        maxRounds: this.config.count,
        timed: 0,
        correct: dates[index].getDay(),
        guess: -1
      };
    }
    this.round = this.rounds[this.roundIndex];
    this.state = States.ROUND;
  }

  guessWasMade(round: Round) {
    // this.timer += round.timed;
    // this.state = States.JUDGE;
    this.nextRound();
  }

  nextRound(): void {
    if (this.roundIndex  < this.rounds.length - 1) {
      this.state = States.ROUND;
      this.roundIndex ++ ;
      this.round = this.rounds[this.roundIndex];
      console.log('next round');
    } else {
      console.log('results now');
      this.state = States.RESULT;
      this.round = null;
    }
  }

  randomDates(n:number) {
    const min = new Date(this.config.startYear, 1, 1).getTime();
    const max = new Date(this.config.endYear, 12, 31).getTime();
    let dates = [];
    for (let index = 0; index < n; index++) {
      const rn = Math.floor(Math.random() * (max - min + 1) + min)
      dates[index] = new Date(rn);
      
    }
    return dates;
  }

  public get States() {
    return States;
  }
}
