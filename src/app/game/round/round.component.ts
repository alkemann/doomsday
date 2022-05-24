import { GameStateService } from './../../services/game-state.service';
import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Round } from 'src/app/interfaces/round';
import { Subscription } from 'rxjs';

@Component({
  selector: 'game-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit, OnDestroy {

  public round: Round | null;
  public score: number;
  public showHints: boolean;

  public scored: number;
  public progressPercent: number = 0;

  private guessed: boolean = false;
  private sub: Subscription;

  constructor(
    private gameState: GameStateService
  ) {}

  ngOnInit(): void {
    const config = this.gameState.previousConfig;
    this.round = this.gameState.activeRound;
    this.score = this.gameState.score;
    if (this.round) {
      this.progressPercent = Math.round( 100 * this.round.roundNumber / this.round.maxRounds);
      this.scored = Math.round( 100 * this.score / config.count );
    } else {
      console.error("Round component got no round object");
    }
    this.sub = this.gameState.showingHints.subscribe((v) => this.showHints = v);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public guess(day: number): void {
    if (this.guessed || this.round === null) return; // only one guess
    this.guessed = true;
    this.round.guess = day;
    this.gameState.guessWasMade(this.round);
  }

}
