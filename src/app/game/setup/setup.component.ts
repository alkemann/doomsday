import { Config } from './../../config';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'game-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  @Input() config: Config;

  
  @Output() setupSaved: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public resetConfig(): void {

  }

  public saveConfig(): void {
    this.setupSaved.emit();
  }
}
