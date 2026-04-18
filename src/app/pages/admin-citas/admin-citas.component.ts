import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { CitasService } from '../../core/services/citas.service';
import { Cita } from '../../core/models/cita.model';
import { UiMessageService } from '../../core/services/ui-message.service';

@Component({
  selector: 'app-admin-citas',
  standalone: true,
  imports: [NgClass],
  templateUrl: './admin-citas.component.html',
  styleUrls: ['./admin-citas.component.css']
})
export class AdminCitasComponent {
  private readonly citasService = inject(CitasService);
  private readonly uiMessage = inject(UiMessageService);

  readonly citas = signal<Cita[]>([]);
  readonly cargando = signal(true);

  constructor() {
    this.loadCitas();
  }

  loadCitas(): void {
    this.cargando.set(true);

    this.citasService.getCitas().subscribe({
      next: (data) => {
        this.citas.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.citas.set([]);
        this.cargando.set(false);
      }
    });
  }

  cambiarEstado(id: number | undefined, estado: 'Pendiente' | 'Confirmada' | 'Cancelada'): void {
    if (!id) {
      return;
    }

    this.citasService.updateEstado(id, estado).subscribe({
      next: () => {
        this.uiMessage.show('Estado de la cita actualizado.', 'success');
        this.loadCitas();
      },
      error: () => this.uiMessage.show('No fue posible actualizar el estado.', 'error')
    });
  }
}