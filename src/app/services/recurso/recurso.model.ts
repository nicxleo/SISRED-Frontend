// Model Recurso
export class Recurso {
  id: number;
  nombre: string;
  archivo: string;
  thumbnail: string;
  fechaCreacion: string;
  fechaUltimaModificacion: string;
  tipo: string;
  descripcion: string;
  metadata: Array<string>;
  autor: number;
  usuarioUltimaModificacion: number;
}
