import { GameStateService } from './../services/game-state.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Config } from '../interfaces/config';
import { Round } from '../interfaces/round';
import { States } from '../enums/states';
import { Subscription } from 'rxjs';

@Component({
  selector: 'doomsday-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  public config: Config = {
    startYear: 2022,
    endYear: 2022,
    count: 8,
    timer: false,
    maxTime: 60
  }

  private subs : Subscription[] = [];
  public showrules : boolean = false;
  public showhints : boolean = false;

  public stateType = States;
  public state : States = States.SETUP;
  public round : Round | null;
  public timer: number = 40;
  public score: number = 0;

  rounds : Round[];
  roundIndex : number = 0;

  private MON_TEXT :string[] = [
    "Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"
  ];

  constructor(
    private gameState: GameStateService
  ) {}

  ngOnInit(): void {
    const s1 = this.gameState.showingRules.subscribe((v) => this.showrules = v);
    this.subs.push(s1);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  restart(): void {
    this.state = States.SETUP;
  }

  configUpdated(): void {
    this.score = 0;
    this.roundIndex = 0;
    this.rounds = [];
    const dates = this.randomDates(this.config.count);
    for (let index = 0; index < this.config.count; index++) {
      const mon = this.MON_TEXT[dates[index].getMonth()];
      this.rounds[index] = {
        fullDate: dates[index].toDateString(),
        date: dates[index].getDate() +' '+ mon  +' '+ dates[index].getFullYear()   ,
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
    if (this.config.timer) {
      this.timer += round.timed;
    }
    if (round.guess == round.correct) {
      this.score ++ ;
    }
    this.state = States.JUDGE;
  }

  nextRound(): void {
    if (this.roundIndex  < this.rounds.length - 1) {
      this.state = States.ROUND;
      this.roundIndex ++ ;
      this.round = this.rounds[this.roundIndex];
    } else {
      this.state = States.RESULT;
      this.round = null;
    }
  }

  highscore(): void {
    this.state = States.HIGHSCORE;
  }

  randomDates(n:number) {
    const min = new Date(this.config.startYear, 0, 1).getTime();
    const max =   new Date(this.config.endYear, 11, 31, 23, 59, 59).getTime();
    let dates = [];
    for (let index = 0; index < n; index++) {
      const rn = Math.floor(Math.random() * (max - min + 1) + min)
      dates[index] = new Date(rn);

    }
    return dates;
  }
}
