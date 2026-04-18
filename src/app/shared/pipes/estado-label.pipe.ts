import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoLabel',
  standalone: true
})
export class EstadoLabelPipe implements PipeTransform {
  transform(value: string | undefined): string {
    switch (value) {
      case 'Pendiente':
        return 'En revisión';
      case 'Confirmada':
        return 'Confirmada';
      case 'Cancelada':
        return 'Cancelada';
      default:
        return 'Sin definir';
    }
  }
}
