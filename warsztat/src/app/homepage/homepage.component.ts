import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  title = "Kokpit";
  @Output() showModal: boolean = false;
  constructor(

  ) {
  
   }
   public addRepair() {
    this.showModal = !this.showModal;
  }
  ngOnInit() {
 
  }
 
}
