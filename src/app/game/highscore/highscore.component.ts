import { HighscoreService, Score } from './../../services/highscore.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'game-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.scss']
})
export class HighscoreComponent implements OnInit {

  public scores: Score[];

  @Output() restart: EventEmitter<any> = new EventEmitter();

  constructor(private HighscoreService: HighscoreService) { }

  ngOnInit(): void {
    this.HighscoreService.list().subscribe(
      scores => this.scores = scores
    );
    // await this.HighscoreService.list().then((s:Score[]) => {
    //   this.scores = s
    //   console.log("GOT IT");
    //   console.debug(this);
    // });
    // console.debug(this.scores);
  }

}
