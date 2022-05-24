import { GameStateService } from 'src/app/services/game-state.service';
import { Round } from 'src/app/interfaces/round';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.scss']
})
export class JudgeComponent implements OnInit {

  public round: Round | null;
  private days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  constructor(
    private gameState: GameStateService
  ) {}

  ngOnInit(): void {
    this.round = this.gameState.activeRound;
  }

  public guessToString(n: number): string {
    return this.days[n];
  }

  public done(): void {
    this.gameState.nextRound()
  }
}
