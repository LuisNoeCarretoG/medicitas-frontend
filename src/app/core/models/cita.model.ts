export interface Cita {
  id_cita?: number;
  fecha: string;
  hora: string;
  motivo: string;
  estado?: 'Pendiente' | 'Confirmada' | 'Cancelada';
  id_doctor?: number;
  id_paciente?: number;
  paciente_nombre?: string;
  paciente_correo?: string;
  paciente_telefono?: string;
  doctor_nombre?: string;
  doctor_apellido?: string;
  especialidad_nombre?: string;
}

export interface CrearCitaPayload {
  nombrePaciente: string;
  correoPaciente: string;
  telefonoPaciente: string;
  idDoctor: number;
  fecha: string;
  hora: string;
  motivo: string;
}
