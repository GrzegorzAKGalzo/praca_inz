import { Component, Input, OnInit, Output } from '@angular/core';
import { Repair } from '../repair';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  title = "Kokpit";
  @Output() showModal: boolean = false;

  public actualRepairs: Repair[] = [];






  constructor(

  ) {
  
   }
   public addRepair() {
    this.showModal = !this.showModal;
  }
  ngOnInit() {
 
  }
 
}
