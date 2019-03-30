import { Usuario } from './usuario';
import { RolAsignado } from './rolAsignado';
import { REDS } from './mock-reds';

export const ASIGNACIONES : RolAsignado[] = [
  {
    fechaInicio: '2018-12-15',
    fechaFin: '',
    rol: 'Graficador',
    usuario: {
      nombres: 'Sergio', 
      apellidos: 'Cárdenas',
      email: '',
      tipoIdentificacion: '',
      numeroIdentificacion: '1',
    },
    red: REDS[0],
  },
  {
    fechaInicio: '2019-02-25',
    fechaFin: '',
    rol: 'Diseñador',
    usuario: {
      nombres: 'Sergio', 
      apellidos: 'Cárdenas',
      email: '',
      tipoIdentificacion: '',
      numeroIdentificacion: '1',
    },
    red: REDS[1],
  },
  {
    fechaInicio: '2019-02-10',
    fechaFin: '',
    rol: 'Diseñador',
    usuario: {
      nombres: 'Jairo', 
      apellidos: 'Ruano',
      email: '',
      tipoIdentificacion: '',
      numeroIdentificacion: '2',
    },
    red: REDS[1],
  },
  {
    fechaInicio: '2019-02-25',
    fechaFin: '',
    rol: 'Diseñador',
    usuario: {
      nombres: 'Jairo', 
      apellidos: 'Ruano',
      email: '',
      tipoIdentificacion: '',
      numeroIdentificacion: '2',
    },
    red: REDS[2],
  },
]
