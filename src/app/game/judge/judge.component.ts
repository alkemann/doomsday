import { Round } from 'src/app/round';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'game-judge',
  templateUrl: './judge.component.html',
  styleUrls: ['./judge.component.scss']
})
export class JudgeComponent implements OnInit {

  @Input() round: Round | null;
  @Output() next: EventEmitter<any> = new EventEmitter();

  private days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  constructor() { }
  ngOnInit(): void { }

  guessToString(n: number): string
  {
    
    return this.days[n];
  }
}
