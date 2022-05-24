import { GameStateService } from 'src/app/services/game-state.service';
import { HighscoreService, List, Score } from './../../services/highscore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit {

  public list: List;

  constructor(
    private HighscoreService: HighscoreService,
    private gameState: GameStateService
  ) { }

  ngOnInit(): void {
    const config = this.gameState.previousConfig;
    this.HighscoreService
      .list(config)
      .subscribe(
        (scores: Score[]) => {
          this.list = {
              name: "2022 x 8",
              config: config,
              scores: scores
            };
        }
      );
  }

  public done() {
    this.gameState.restart();
  }
}
