import { GameStateService } from './../../services/game-state.service';
import { Config } from '../../interfaces/config';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Round } from 'src/app/interfaces/round';
import { Subscription } from 'rxjs';

@Component({
  selector: 'game-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit, OnDestroy {

  @Input() round : Round | null;
  @Input() config : Config;
  @Input() gameTimePassed : number;
  @Input() score: number;
  public showHints: boolean;

  @Output() roundComplete: EventEmitter<any> = new EventEmitter();

  public scored : number;
  public progressPercent : number = 0;

  private currentRoundTime : number = 0;
  private guessed : boolean = false;

  private subs : Subscription[] = [];

  constructor(private gameState: GameStateService) { }

  ngOnInit(): void {
    this.reset();

    const s2 = this.gameState.showingHints.subscribe((v) => this.showHints = v);
    this.subs.push(s2);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  ngOnChanges(): void {
    if (this.round) {
      this.reset();
    }
  }

  private reset(): void {
    if (this.round) {
      this.guessed = false;
      this.progressPercent = Math.round( 100 * this.round.roundNumber / this.round.maxRounds);
      this.currentRoundTime = 0;
      this.scored = Math.round( 100 * this.score / this.config.count );
    }
  }

  get roundTime(): string {
    return this.secondsToTimer(this.currentRoundTime);
  }

  get gameTime(): string {
    return this.secondsToTimer(this.gameTimePassed  + this.currentRoundTime);
  }

  private secondsToTimer(s: number): string
  {
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return (""+minutes).padStart(2, '0') + ':' + (""+seconds).padStart(2, '0');
  }

  public guess(day: number): void {
    if (this.guessed || this.round === null) return; // only one guess
    this.guessed = true;
    this.round.guess = day;
    this.round.timed = this.currentRoundTime;
    this.roundComplete.emit(this.round);
  }

}
