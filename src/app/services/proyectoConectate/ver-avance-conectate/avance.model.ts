// Model Avance

export class Avance {
  totalReds: number;
  totalRedsAlerta: number;
  totalRedsNormal: number;
  totalRedsCerrado: number;
  lstRedsAlerta: Array<FaseRED>;
  lstRedsNormal: Array<FaseRED>;
  lstRedsCerrado: Array<FaseRED>;
}

export class FaseRED {
  idRed: number;
  nombre: string;
  nombreCorto: string;
  fechaInicio: Date;
  fase: string;
  inicioFase: Date;
  ultimaModificacion: Date;
  lstAsignados: Array<AsignadosRED>;
}

export class AsignadosRED {
  nombreCompleto: string;
}
