export type Tech = {
    id: number;
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