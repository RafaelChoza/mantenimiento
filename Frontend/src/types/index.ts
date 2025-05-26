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
  id?: number;
  requestorName: string;
  requestorLastName: string;
  area: string;
  idMachine: string;
  stoppedMachine: boolean;
  attentionRequired: boolean;
  serviceDateTime: string;
  serviceDescription: string;
  receptionDate: string;
  receptionTime: string;
  personnelAsigned: string;
  programmedDate: string;
  observations: string;
  problemCauseSolution: string;
  equipmentDisposal: boolean;
  notificateCalibration: boolean;
  usedParts: number;
  partNumber: string;
  descriptionPart: string;
  partOrigin: string;
  coversInstalled: boolean;
  interlocksTested: boolean;
  guardsInstalled: boolean;
  completeRevision: boolean;
  cleanArea: boolean;
  electricityConnected: boolean;
  waterAirGasConnected: boolean;
  taggedProperly: boolean;
  comments: string;
  closeDate: string;
}

export type RegisterUser = {
  id: number;
  username: string;
  password: string;
  password_verification: string;
  firstname: string;
  lastname: string;
  country: string;
  role: number;
}

export type MyToken = {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}

export type OrderCompleted = {
  id: number,
  serviceDateTime: string,
  serviceTime: string,
  requestorName: string,
  requestorLastName: string,
  area: string,
  idMachine: string,
  stoppedMachine: boolean,
  attentionRequired: boolean,
  serviceDescription: string,
  receptionDate: string,
  receptionTime: string,
  personnelAssigned: string,
  programmedDate: string,
  observations: string,
  problemCauseSolution: string,
  equipmentDisposal: boolean,
  notificateCalibration: boolean,
  usedParts: number,
  partNumber: string,
  descriptionPart: string
  partOrigin: string
  coversInstalled: boolean
  interlocksTested: boolean
  guardsInstalled: boolean,
  electricityConnected: boolean,
  completeRevision: boolean,
  cleanArea: boolean,
  waterAirGasConnected: boolean,
  taggedProperly: boolean,
  comments: string,
  closeDate: string,
  fechaTransferencia: string
}