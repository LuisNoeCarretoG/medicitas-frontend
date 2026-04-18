import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api.config';
import { ContactoPayload } from '../models/contacto.model';

@Injectable({ providedIn: 'root' })
export class ContactoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${API_URL}/contactos`;

  sendMessage(payload: ContactoPayload): Observable<ContactoPayload> {
    return this.http.post<ContactoPayload>(this.apiUrl, payload);
  }
}
