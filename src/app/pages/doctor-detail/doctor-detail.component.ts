import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DoctoresService } from '../../core/services/doctores.service';
import { Doctor } from '../../core/models/doctor.model';

@Component({
  selector: 'app-doctor-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.css']
})
export class DoctorDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly doctoresService = inject(DoctoresService);

  readonly doctor = signal<Doctor | null>(null);
  readonly cargando = signal(true);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (!id) {
        this.doctor.set(null);
        this.cargando.set(false);
        return;
      }

      this.cargando.set(true);

      this.doctoresService.getDoctorById(id).subscribe({
        next: (data) => {
          this.doctor.set(data);
          this.cargando.set(false);
        },
        error: () => {
          this.doctor.set(null);
          this.cargando.set(false);
        }
      });
    });
  }

  agendarConDoctor(idDoctor: number): void {
    this.router.navigate(['/agendar'], {
      queryParams: { doctorId: idDoctor }
    });
  }
}
