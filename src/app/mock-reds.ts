import { Red } from './red';
import { PROYECTO_CONECTATE } from './mock-proyecto-conectate';
import { FASES } from './fases';

export const REDS : Red[] = [
  {
    codigo: 'RED001',
    nombre: 'infografía para el curso Educación, Juventud y Drogas',
    nombreCorto: 'infografía drogas',
    descripcion: 'esta es una descripción breve',
    fechaInicio: '2018-12-10',
    fechaCierre: '2019-04-01',
    fechaCreacion: '2016-02-01',
    porcentajeAvance: 100,
    tipo: 'infografía',
    solicitante: 'la profe',
    horasTrabajadas: 50,
    horasEstimadas: 60,
    proyectoConectate: PROYECTO_CONECTATE,
    historialEstados: [
      {
        fechaCambio: '2018-12-11',
        nombreEstado: 'En proceso',
      },
      {
        fechaCambio: '2018-12-20',
        nombreEstado: 'Terminado',
      },
    ],
    fase: FASES[1]
  },
  {
    codigo: 'RED002',
    nombre: 'video para el curso Educación, Juventud y Drogas',
    nombreCorto: 'video drogas',
    descripcion: 'esta es una descripción breve',
    fechaInicio: '2019-02-25',
    fechaCierre: '2019-04-05',
    fechaCreacion: '2016-02-01',
    porcentajeAvance: 90,
    tipo: 'video',
    solicitante: 'la profe',
    horasTrabajadas: 110,
    horasEstimadas: 130,
    proyectoConectate: PROYECTO_CONECTATE,
    historialEstados: [
      {
        fechaCambio: '2019-02-25',
        nombreEstado: 'En proceso',
      },
    ],
    fase: FASES[0]
  },
  {
    codigo: 'RED003',
    nombre: 'animación para el curso Educación, Juventud y Drogas',
    nombreCorto: 'animación drogas',
    descripcion: 'esta es una descripción breve',
    fechaInicio: '2019-02-25',
    fechaCierre: '2019-03-25',
    fechaCreacion: '2016-02-01',
    porcentajeAvance: 50,
    tipo: 'animación',
    solicitante: 'la profe',
    horasTrabajadas: 110,
    horasEstimadas: 130,
    proyectoConectate: PROYECTO_CONECTATE,
    historialEstados: [
      {
        fechaCambio: '2019-02-25',
        nombreEstado: 'En proceso',
      },
      {
        fechaCambio: '2019-03-28',
        nombreEstado: 'Terminado',
      },
    ],
    fase: FASES[2]
  },
]