import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Round } from 'src/app/round';

@Component({
  selector: 'game-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

  @Input() round : Round | null;
  @Input() gameTimePassed : number;

  @Output() roundComplete: EventEmitter<any> = new EventEmitter();

  private currentRoundTime : number = 0;
  private progressPercent : number = 0;
  private guessed : boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.reset();
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
    }
  }

  get progress(): number {
    return this.progressPercent
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
