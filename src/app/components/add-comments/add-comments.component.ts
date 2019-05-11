import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { AddCommentsService } from '../../services/comentario/add-comments/add-comments.service';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common'
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.css']
})
/**
 * Componente con la lógica para agregar comentarios a cada recurso de un RED.
 */
@Injectable({
  providedIn: 'root'
})
export class AddCommentsComponent implements OnInit {
public Editor = ClassicEditor;


   public addCommentsForm: FormGroup;

  constructor(private route: ActivatedRoute, private addCommentsService: AddCommentsService, private location: Location) {

  }


public model = {
  editorData: '<p>abcd</p>'
};


  ngOnInit() {

    this.addCommentsForm = new FormGroup({
      contenido: new FormControl(),
      recurso_id: new FormControl(),
      usuario_id: new FormControl(),
      version_id: new FormControl()
   });
  }

  addComments(){
    var result =
      this.addCommentsService.addComments(
        this.addCommentsForm.get('contenido').value,
        this.addCommentsForm.get('recurso_id').value,
        this.addCommentsForm.get('usuario_id').value,
        this.addCommentsForm.get('version_id').value);
  }
  goBack(): void {
    this.location.back()
  }
}
