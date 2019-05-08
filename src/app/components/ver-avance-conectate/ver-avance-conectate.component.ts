import { Component, OnInit } from '@angular/core';

declare function setup(): any;

@Component({
  selector: 'app-ver-avance-conectate',
  templateUrl: './ver-avance-conectate.component.html',
  styleUrls: ['./ver-avance-conectate.component.css']
})
export class VerAvanceConectateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setup();
  }
}
