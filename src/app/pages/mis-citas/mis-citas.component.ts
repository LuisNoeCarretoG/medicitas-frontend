import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { CitasService } from '../../core/services/citas.service';
import { Cita } from '../../core/models/cita.model';
import { UiMessageService } from '../../core/services/ui-message.service';
import { EstadoLabelPipe } from '../../shared/pipes/estado-label.pipe';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [NgClass, EstadoLabelPipe],
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent {
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

  cancelar(id: number | undefined): void {
    if (!id) {
      return;
    }

    this.citasService.updateEstado(id, 'Cancelada').subscribe({
      next: () => {
        this.uiMessage.show('La cita fue cancelada.', 'info');
        this.loadCitas();
      },
      error: () => this.uiMessage.show('No fue posible actualizar la cita.', 'error')
    });
  }
}
