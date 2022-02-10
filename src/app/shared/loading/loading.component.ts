import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-loading',
  templateUrl: './loading.component.html'
})
export class LoadingComponent {

  @Input() message ?: string;


  constructor() { }

}
