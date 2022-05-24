import { Injectable } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { Subject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private _showRules = false;
  private _showingRulesSubject = new Subject<boolean>();
  public get showingRules() : Subject<boolean> { return this._showingRulesSubject; }
  public rulesToggle(event: MatSlideToggleChange) {
    this._showRules = event.checked;
    this._showingRulesSubject.next(this._showRules);
  }

  private _showHints = false;
  private _showingHintsSubject = new Subject<boolean>();
  public get showingHints() : Subject<boolean> { return this._showingHintsSubject; }
  public hintsToggle(event: MatSlideToggleChange) {
    this._showHints = event.checked;
    this._showingHintsSubject.next(this._showHints);
  };
}