import { Round } from 'src/app/round';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'game-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  @Input() rounds: Round[];

  @Output() restart: EventEmitter<any> = new EventEmitter();

  public d : string[] = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
