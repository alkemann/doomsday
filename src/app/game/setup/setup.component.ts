import { Config } from '../../interfaces/config';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GameStateService } from 'src/app/services/game-state.service';

@Component({
  selector: 'game-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  public config: Config;
  public reset: Config;

  constructor(private gameState: GameStateService) { }

  ngOnInit(): void {
    this.config = this.gameState.previousConfig;
    this.reset = {...this.config }
  }

  public resetConfig(): void {
    this.config = this.reset;
  }

  public saveConfig(): void {
    this.gameState.setNewConfig(this.config);
  }
}
