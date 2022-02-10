import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-loading',
  template: `<div class="loading">
    <img src="assets/loading.gif" alt="Loading">
    <p *ngIf="message">{{message}}</p>
  </div>
`
})
export class LoadingComponent {
  @Input() message ?: string;
  constructor() { }
}
