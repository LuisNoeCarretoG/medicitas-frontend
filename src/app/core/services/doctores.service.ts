import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';
import { Doctor } from '../models/doctor.model';
import { Especialidad } from '../models/especialidad.model';

@Injectable({ providedIn: 'root' })
export class DoctoresService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_URL}/doctores`;
  private readonly especialidadesUrl = `${API_URL}/especialidades`;

  getDoctores(especialidad?: string): Observable<Doctor[]> {
    let params = new HttpParams();

    if (especialidad && especialidad !== 'todas') {
      params = params.set('especialidad', especialidad);
    }

    return this.http.get<Doctor[]>(this.apiUrl, { params });
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  getEspecialidades(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.especialidadesUrl);
  }
}
