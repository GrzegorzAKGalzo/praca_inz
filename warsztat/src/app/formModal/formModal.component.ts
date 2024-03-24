import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'formModal',
  templateUrl: './formModal.component.html',
  styleUrls: ['./formModal.component.css']
})
export class FormModalComponent implements OnInit {
  @Input() isVisible: boolean = true;

  constructor() { }
  ngOnInit() {
  }
  @Input('toggle')
  toggle() {
    this.isVisible = !this.isVisible;
  }
}
