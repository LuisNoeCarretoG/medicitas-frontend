import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DoctoresService } from '../../core/services/doctores.service';
import { Doctor } from '../../core/models/doctor.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private readonly doctoresService = inject(DoctoresService);

  readonly doctores = signal<Doctor[]>([]);
  readonly totalDoctores = computed(() => this.doctores().length);

  constructor() {
    this.doctoresService.getDoctores().subscribe({
      next: (data) => this.doctores.set(data)
    });
  }
}
