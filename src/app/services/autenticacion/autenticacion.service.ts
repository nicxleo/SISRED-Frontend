import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as crypto from 'crypto-js';
import { DatosUsuario } from 'src/app/models/datos-usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  constructor(private http: HttpClient) {}

  public autenti = false;

  // Verifica si existe un usuario autenticado
  autenticado(): boolean {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token') !== null;
  }

  // Obtiene el token de inicio de sesión
  obtenerToken() {
    const token = localStorage.getItem('token');
    if (token === null) {
      this.borrarDatos();
    }
    return token;
  }

  // Obtiene los datos del usuario
  obtenerDatosUsuario(): DatosUsuario {

    let datosUsuario = null;
    const token = this.obtenerToken();
    const usuarioTexto = localStorage.getItem('SISRED');
    if (usuarioTexto === null) {
      this.borrarDatos();
      //window.location.reload();
    } else {
      try {
        const usuario = JSON.parse(
          crypto.AES.decrypt(usuarioTexto, token).toString(crypto.enc.Utf8)
        );

        datosUsuario = {
          nombre: usuario.firstName,
          apellido: usuario.lastName,
          idConectate: usuario.idConectate,
          email: usuario.email,
          numeroIdentificacion: usuario.numeroIdentificacion
        };
      } catch (err) {
        this.borrarDatos();
        window.location.reload();
      }
    }
    return datosUsuario;
  }

  // Obtiene los roles que tiene el usuario en cuestión del RED
  confirmarAutorizado(idRed) {
    return new Promise((resolve, reject) => {
      const tokenSisred = this.obtenerToken();
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Token ' + tokenSisred
        })
      };
      this.http
        .get(environment.apiUrl + 'getRolAsignadoRED/' + idRed + '/', options)
        .subscribe(
          data => {
            console.log(data);
            resolve(data);
          },
          err => {
            console.log(err);
            reject(err);
          }
        );
    });
  }

  // Inicia sesión para un usuario a partir de su usuario (correo) y contrasena
  login(username, password) {
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http
        .post(
          environment.apiUrl + 'login/',
          {
            username,
            password
          },
          options
        )
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err.error.error);
          }
        );
    });
  }

  // Guarda los datos de un usuario en el local storage usando crypto para asegurarlos
  guardarDatos(data, email) {
    const token = data.token;
    localStorage.setItem('token', token);
    delete data.token;
    data.email = email;

    console.log(data);

    localStorage.setItem(
      'SISRED',
      crypto.AES.encrypt(JSON.stringify(data), token).toString()
    );
  }

  // Se encarga de hacer la petición para borrar el token de la base de datos
  cerrarSesion() {
    return new Promise((resolve, reject) => {
      const tokenSisred = this.obtenerToken();
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Token ' + tokenSisred
        })
      };
      this.http.get(environment.apiUrl + 'logout/', options).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  // Elimina los datos de la sesión. Borrando el local storage
  borrarDatos() {
    localStorage.clear();
    window.location.reload();
  }
}
