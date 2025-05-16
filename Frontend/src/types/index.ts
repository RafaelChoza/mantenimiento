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
  requestorName: string;
  requestorLastName: string;
  area: string;
  idMachine: string;
  stoppedMachine: boolean;
  attentionRequired: boolean;
  serviceDescription: string;
  receptionDate: string;
  receptionTime: string;
  personnelAsigned: string;
  programmedDate: string;
  observations: string;
  problemaCausaSolucion: string;
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
  revisionCompleta: boolean;
  limpiezaArea: boolean;
  electricityConnected: boolean;
  aireGasAguaConectada: boolean;
  etiquetadoAdecuado: boolean;
  comments: string;
  closeDate: string;
}