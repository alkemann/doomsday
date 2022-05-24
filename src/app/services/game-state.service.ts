import { Injectable } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { BehaviorSubject, Subject } from "rxjs";
import { Config } from "../interfaces/config";


@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  private _config: Config;
  private _configSubject = new Subject<Config>();
  public get config() : Subject<Config> { return this._configSubject; }
  public setNewConfig(config: Config) {
    this._config = config;
    this._configSubject.next(config);
  }
  public get previousConfig() : Config { return this._config ?? {
    startYear: 2022,
    endYear: 2022,
    count: 8,
    timer: false,
    maxTime: 60
  }; };


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