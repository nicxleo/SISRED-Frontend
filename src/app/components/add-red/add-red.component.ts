import { Component, OnInit, Injectable } from '@angular/core';
import { AddRedService } from '../../services/proyectoRed/add-red/add-red.service';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD

=======
import { Dropbox } from 'dropbox';
>>>>>>> fd069d7c5bf39610fde3c9a906be4f6bb5f8c63a
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common'

declare function setup(): any;

@Component({
  selector: 'app-add-red',
  templateUrl: './add-red.component.html',
  styleUrls: ['./add-red.component.css']
})

/**
 * Componente con la lógica para agregar Proyectos al RED.
 */
@Injectable({
  providedIn: 'root'
})
export class AddRedComponent implements OnInit {

  public addRedForm: FormGroup;


  constructor(private route: ActivatedRoute, private addRedService: AddRedService, private location: Location) { 
    
  }

  ngOnInit() {
    setup();
    this.addRedForm = new FormGroup({
      name: new FormControl(),
      type: new FormControl(),
      author: new FormControl(),
      description: new FormControl(),
      folder: new FormControl(),
      filetest: new FormControl()
   });
  }

  addRed(){
    var result =
      this.addRedService.addRed(
        this.addRedForm.get('name').value,
        this.addRedForm.get('type').value,
        this.addRedForm.get('author').value,
        this.addRedForm.get('description').value,
        this.addRedForm.get('folder').value,
        this.route.snapshot.params.idRed);
  }  

  //Método para subir un archivo individual
  uploadFile() {
    var ACCESS_TOKEN = 'I0Ng9kItu5AAAAAAAAAAHR16cYlxD2zh7tyDcSjg7cRFs0brDmSS088zp6kwqIEx';
<<<<<<< HEAD
    //var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    var fileInput = (<HTMLInputElement> document.getElementById('filetest'));
    var file = fileInput.files[0];
    /*dbx.filesUpload({path: '/' + file.name, contents: file}).then(function(response) {
=======
    var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    var fileInput = (<HTMLInputElement> document.getElementById('filetest'));
    var file = fileInput.files[0];
    dbx.filesUpload({path: '/' + file.name, contents: file})
      .then(function(response) {
>>>>>>> fd069d7c5bf39610fde3c9a906be4f6bb5f8c63a
        var results = document.getElementById('results');
        results.appendChild(document.createTextNode('File uploaded!'));
        console.log(response);
      })
      .catch(function(error) {
        console.error(error);
<<<<<<< HEAD
      });*/
=======
      });
>>>>>>> fd069d7c5bf39610fde3c9a906be4f6bb5f8c63a
    return false;
  }

  //Método que recibe un listado de archivos de una carpeta y crea un array
  public filesPickedToArray(files: FileList) {
    var filesArray: Array<File> = new Array<File>();
    var pathsArray: Array<String> = new Array<String>();

    for (let i = 0; i < files.length; i++) {
      filesArray.push(files.item(i));
      pathsArray.push('files/');
      console.log(pathsArray[i]);
    }

    this.uploadFiles(filesArray, pathsArray);
  }

  //Método recursivo que recibe un array de archivos y los envía a una cuenta de dropbox referenciada por ACCESS_TOKEN
  public uploadFiles(files: Array<File>, paths: Array<String>) {
    var ACCESS_TOKEN = 'I0Ng9kItu5AAAAAAAAAAHR16cYlxD2zh7tyDcSjg7cRFs0brDmSS088zp6kwqIEx';
<<<<<<< HEAD
   // var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
=======
    var dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
>>>>>>> fd069d7c5bf39610fde3c9a906be4f6bb5f8c63a
    var newFiles: Array<File> = files.slice(0, files.length - 1);
    var newPaths: Array<String> = paths.slice(0, files.length - 1);

    if (files.length > 0) {
      for (let i = 0; i < files.length - 1; i++) {
        const file = files[i];
        newFiles.push()
      }

<<<<<<< HEAD
     /* if (files[files.length - 1].name != '.DS_Store') {
        //dbx.filesUpload({path: '/'+ paths[files.length - 1], contents: files[files.length - 1]})
=======
      if (files[files.length - 1].name != '.DS_Store') {
        dbx.filesUpload({path: '/'+ paths[files.length - 1], contents: files[files.length - 1]})
>>>>>>> fd069d7c5bf39610fde3c9a906be4f6bb5f8c63a
        .then(function(response) {
            console.log(response);
            if (files.length - 1 > 0) {
              return this.uploadFiles(newFiles, newPaths);  
            }
            else {
              this.addRed();  
            } 
          }.bind(this))
          .catch(function(error) {
            console.error(error);
        });
      }
      else {
        if (files.length - 1 > 0) {
          return this.uploadFiles(newFiles, newPaths);   
        }
<<<<<<< HEAD
      }*/
=======
      }
>>>>>>> fd069d7c5bf39610fde3c9a906be4f6bb5f8c63a
      
    }

    return
    
  }

  goBack(): void {
    this.location.back()
  }

}
