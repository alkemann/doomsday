import { Injectable } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { BehaviorSubject, Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private _showingRulesSubject = new BehaviorSubject<boolean>(false);
  public get showingRules() : BehaviorSubject<boolean> { return this._showingRulesSubject; }
  public rulesToggle(event: MatSlideToggleChange) {
    this._showingRulesSubject.next(event.checked);
  }

  private _showingHintsSubject = new BehaviorSubject<boolean>(false);
  public get showingHints() : BehaviorSubject<boolean> { return this._showingHintsSubject; }
  public hintsToggle(event: MatSlideToggleChange) {
    this._showingHintsSubject.next(event.checked);
  };
}