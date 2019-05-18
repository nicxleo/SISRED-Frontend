import { ComentarioMultimedia } from './comentario-multimedia.model';
import { ComentarioHijoPdfModel } from './comentario-pdf-hijo.model';

export class ComentarioPdfModel {
  id: string;
  contenido: string;
  coordenadas: ComentarioMultimedia;
  fechaCreacion: Date;
  version: string;
  idUsuario: string;
  width: string;
  height:string;
  rutaArchivo: string;
  comentariosHijos: ComentarioHijoPdfModel[];
  cerrado: boolean;
  resuelto: boolean;
  esCierre: boolean;
  UsuarioComentario: string;
}
