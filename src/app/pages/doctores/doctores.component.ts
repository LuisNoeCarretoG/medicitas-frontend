import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DoctoresService } from '../../core/services/doctores.service';
import { Doctor } from '../../core/models/doctor.model';
import { Especialidad } from '../../core/models/especialidad.model';
import { DoctorCardComponent } from '../../shared/components/doctor-card/doctor-card.component';

@Component({
  selector: 'app-doctores',
  standalone: true,
  imports: [FormsModule, DoctorCardComponent],
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent {
  private readonly doctoresService = inject(DoctoresService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  especialidadSeleccionada = 'todas';
  readonly doctores = signal<Doctor[]>([]);
  readonly especialidades = signal<Especialidad[]>([]);
  readonly cargando = signal(true);

  constructor() {
    this.doctoresService.getEspecialidades().subscribe({
      next: (data) => this.especialidades.set(data)
    });

    this.route.queryParamMap.subscribe((params) => {
      const especialidad = params.get('especialidad') ?? 'todas';
      this.especialidadSeleccionada = especialidad;
      this.loadDoctores(especialidad);
    });
  }

  loadDoctores(especialidad: string): void {
    this.cargando.set(true);

    this.doctoresService.getDoctores(especialidad).subscribe({
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

  aplicarFiltro(): void {
    const queryParams = this.especialidadSeleccionada === 'todas'
      ? {}
      : { especialidad: this.especialidadSeleccionada };

    this.router.navigate(['/doctores'], { queryParams });
  }

  irAgendar(idDoctor: number): void {
    this.router.navigate(['/agendar'], {
      queryParams: { doctorId: idDoctor }
    });
  }
}
