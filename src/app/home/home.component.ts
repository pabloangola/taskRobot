import { Component, OnInit, EventEmitter } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   sideNavActions = new EventEmitter<any|MaterializeAction>();
    closeSideNav() {
            this.sideNavActions.emit({action: "sideNav", params: ['hide']});
    }

}
