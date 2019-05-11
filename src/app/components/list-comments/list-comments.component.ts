import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ListComments} from "../../services/comentario/list-comments/list-comments.model";
import {ListCommentsService} from "../../services/comentario/list-comments/list-comments.service";
import {Location} from '@angular/common';
declare function setup(): any;

console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
/**
 * Componente para mostrar el listado de comentarios de un recurso.
 */
@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {

  listComments: ListComments[] = null;
  idRecurso: number;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private listCommentsService: ListCommentsService,
              private location: Location) {

  }

  ngOnInit() {
    //setup();
    console.log('1111111');
    this.idRecurso = this.activatedRoute.snapshot.params.idRecurso;
    console.log('2222222');
    console.log(this.idRecurso);
    console.log("3333333");
    this.getListComments();
  }

  getListComments(): void {
    if(this.idRecurso == null) this.idRecurso = 1;
    this.listCommentsService.getListComments(this.idRecurso).subscribe(listComments => this.listComments = listComments);
    console.log("4444444");
    console.log(this.idRecurso);
    console.log("5555555");
  }


  goBack(): void {
    this.location.back()
  }

}
