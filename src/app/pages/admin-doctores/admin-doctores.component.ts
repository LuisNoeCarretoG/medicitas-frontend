import { Component, inject, signal } from '@angular/core';
import { DoctoresService } from '../../core/services/doctores.service';
import { Doctor } from '../../core/models/doctor.model';

@Component({
  selector: 'app-admin-doctores',
  standalone: true,
  templateUrl: './admin-doctores.component.html',
  styleUrls: ['./admin-doctores.component.css']
})
export class AdminDoctoresComponent {
  private readonly doctoresService = inject(DoctoresService);

  readonly doctores = signal<Doctor[]>([]);
  readonly cargando = signal(true);

  constructor() {
    this.loadDoctores();
  }

  loadDoctores(): void {
    this.cargando.set(true);

    this.doctoresService.getDoctores().subscribe({
      next: (data) => {
        this.doctores.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.doctores.set([]);
        this.cargando.set(false);
      }
    });
  }
}