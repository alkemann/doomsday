import { GameLogicService } from './game-logic.service';
import { Injectable } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { BehaviorSubject, Subject } from "rxjs";
import { States } from "../enums/states";
import { Config } from "../interfaces/config";
import { Round } from "../interfaces/round";


@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  public constructor(private gameLogic: GameLogicService) {}

  private MON_TEXT :string[] = [
    "Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"
  ];

  // Match (sums across a set of rounds)
  public rounds : Round[];
  private roundIndex : number = 0;

  // Round
  private _round: Round | null;
  public get activeRound(): Round|null { return this._round; }

  // Score
  private _scoreSubject = new BehaviorSubject<number>(0);
  public get score(): number { return this._scoreSubject.value; }

  // Game state STATE
  private _stateSubject = new BehaviorSubject<States>(States.SETUP);
  public get stateChanges() : BehaviorSubject<States> { return this._stateSubject; }
  public get state(): States { return this._stateSubject.value; }
  public set state(s: States) { this._stateSubject.next(s); }

  guessWasMade(round: Round) {
    if (round.guess == round.correct) {
      this._scoreSubject.next(this.score + 1) ;
    }
    this.state = States.JUDGE;
  }

  highscore(): void {
    this.state = States.HIGHSCORE;
  }

  restart(): void {
    this.state = States.SETUP;
  }

  nextRound(): void {
    if (this.roundIndex  < this.rounds.length - 1) {
      this.state = States.ROUND;
      this.roundIndex ++ ;
      this._round = this.rounds[this.roundIndex];
    } else {
      this.state = States.RESULT;
      this._round = null;
    }
  }

  // Game setup
  private _config: Config;
  private _configSubject = new Subject<Config>();
  public get config() : Subject<Config> { return this._configSubject; }
  public setNewConfig(config: Config) {
    this._config = config;
    this.configUpdated(config);
    this._configSubject.next(config);
  }

  public get previousConfig() : Config { return this._config ?? {
    startYear: 2022,
    endYear: 2022,
    count: 8,
    timer: false,
    maxTime: 60
  }; };

  private configUpdated(config: Config): void {
    this._scoreSubject.next(0);
    this.roundIndex = 0;
    this.rounds = [];
    const dates = this.gameLogic.randomDates(config.count, config.startYear, config.endYear);
    for (let index = 0; index < config.count; index++) {
      const mon = this.MON_TEXT[dates[index].getMonth()];
      this.rounds[index] = {
        fullDate: dates[index].toDateString(),
        date: dates[index].getDate() +' '+ mon  +' '+ dates[index].getFullYear()   ,
        roundNumber: index,
        maxRounds: config.count,
        timed: 0,
        correct: dates[index].getDay(),
        guess: -1
      };
    }
    this._round = this.rounds[this.roundIndex];
    this.state = States.ROUND;
  }

  // Help page
  private _showingRulesSubject = new BehaviorSubject<boolean>(false);
  public get showingRules() : BehaviorSubject<boolean> { return this._showingRulesSubject; }
  public rulesToggle(event: MatSlideToggleChange) {
    this._showingRulesSubject.next(event.checked);
  }

  // Hints display
  private _showingHintsSubject = new BehaviorSubject<boolean>(false);
  public get showingHints() : BehaviorSubject<boolean> { return this._showingHintsSubject; }
  public hintsToggle(event: MatSlideToggleChange) {
    this._showingHintsSubject.next(event.checked);
  };
}