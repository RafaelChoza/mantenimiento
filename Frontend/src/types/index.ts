export type Tech = {
    idTecnico: number;
    nombreTecnico: string;
    apellidoTecnico: string;
    correo: string;
    numNomina: number;
    fechaAlta: string;
}

export type Order = {
  id: number;
  serviceDateTime: string;
  requestorName: string;
  requestorLastName: string;
  area: string;
  idMachine: string;
  stoppedMachine: boolean;
  attentionRequired: boolean;
  serviceDescription: string;
  receptionDate: string;
  personnelAsigned: string;
  observations: string;
  serviceSolution: string;
  closeDate: string;
}

export type Area = {
  id: number,
  areaName: string,
}

export type MantenimientoOrden = {
  id: number;
  requestorName: string;
  requestorLastName: string;
  area: string;
  idMachine: string;
  stoppedMachine: boolean;
  attentionRequired: boolean;
  serviceDescription: string;
  receptionDate: Date;
  receptionTime: string;
  personnelAsigned: string;
  programmedDate: string;
  observations: string;
  serviceSolution: string;
  equipmentDisposal: boolean;
  notificateCalibration: boolean;
  usedParts: number;
  partNumber: string;
  descriptionPart: string;
  partOrigin: string;
  coversInstalled: boolean;
  interlocksTested: boolean;
  guardsInstalled: boolean;
  electricityConnected: boolean;
  comments: string;
  closeDate: Date;
}