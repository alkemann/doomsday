import { HighscoreService, Score } from './../../services/highscore.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'game-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit {

  public scores: Score[];

  @Output() next: EventEmitter<any> = new EventEmitter();

  constructor(private HighscoreService: HighscoreService) { }

  ngOnInit(): void {
    this.HighscoreService.list().subscribe(
      scores => this.scores = scores
    );
  }
}
