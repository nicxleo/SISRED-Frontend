import { ComentarioMultimedia } from './comentario-multimedia.model';
export class Comentario {
  contenido: string;
  fechaCreacion: string;
  cerrado: boolean;
  comentarioMultimedia: ComentarioMultimedia | null | undefined;
  usuario: string;
}