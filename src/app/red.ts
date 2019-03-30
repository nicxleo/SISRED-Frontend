import { ProyectoConectate } from './proyectoConectate';
import { HistorialEstados } from './historialEstados';

export class Red {
  codigo: string;
  nombre: string;
  nombreCorto: string;
  descripcion: string;
  fechaInicio: string;
  fechaCierre: string;
  fechaCreacion: string;
  porcentajeAvance: number;
  tipo: string;
  solicitante: string;
  horasTrabajadas: number;
  horasEstimadas: number;
  proyectoConectate: ProyectoConectate| undefined;
  historialEstados: HistorialEstados[] | undefined;
  fase: string;
}