import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';
import { Cita, CrearCitaPayload } from '../models/cita.model';

@Injectable({ providedIn: 'root' })
export class CitasService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_URL}/citas`;

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  getCitaById(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.apiUrl}/${id}`);
  }

  createCita(payload: CrearCitaPayload): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, payload);
  }

  updateEstado(id: number, estado: 'Pendiente' | 'Confirmada' | 'Cancelada'): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/${id}`, { estado });
  }
}