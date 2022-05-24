import { GameStateService } from './../services/game-state.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { States } from '../enums/states';
import { Subscription } from 'rxjs';

@Component({
  selector: 'doomsday-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  private subs : Subscription[] = [];
  public showrules : boolean = false;

  public stateType = States;
  public state : States;

  constructor(
    private gameState: GameStateService
  ) {}

  ngOnInit(): void {
    this.state = this.gameState.state;

    const s1 = this.gameState.showingRules.subscribe((v) => this.showrules = v);
    const s2 = this.gameState.stateChanges.subscribe( s => this.state = s )

    this.subs.push(s1, s2);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

}
