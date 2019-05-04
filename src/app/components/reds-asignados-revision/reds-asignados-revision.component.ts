import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from "@angular/common";

@Component({
  selector: 'app-reds-asignados-revision',
  templateUrl: './reds-asignados-revision.component.html',
  styleUrls: ['./reds-asignados-revision.component.css']
})
export class RedsAsignadosRevisionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
  }

}
