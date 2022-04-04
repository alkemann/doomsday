import { HighscoreService, List, Score } from './../../services/highscore.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Config } from 'src/app/interfaces/config';

@Component({
  selector: 'game-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit {

  @Input() config: Config;
  public list: List;

  @Output() next: EventEmitter<any> = new EventEmitter();

  constructor(private HighscoreService: HighscoreService) { }

  ngOnInit(): void {
    this.HighscoreService
      .list(this.config)
      .subscribe(
        (scores: Score[]) => {
          this.list = {
              name: "2022 x 8",
              config: this.config,
              scores: scores
            };
        }
      );
  }
}
