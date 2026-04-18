import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DoctoresService } from '../../core/services/doctores.service';
import { CitasService } from '../../core/services/citas.service';
import { UiMessageService } from '../../core/services/ui-message.service';
import { Doctor } from '../../core/models/doctor.model';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.css']
})
export class AgendarCitaComponent {
  private readonly fb = inject(FormBuilder);
  private readonly doctoresService = inject(DoctoresService);
  private readonly citasService = inject(CitasService);
  private readonly uiMessage = inject(UiMessageService);
  private readonly route = inject(ActivatedRoute);

  readonly doctores = signal<Doctor[]>([]);
  readonly enviando = signal(false);

  readonly fechaMinima = new Date().toISOString().split('T')[0];

  readonly form = this.fb.group({
    nombrePaciente: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
    correoPaciente: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    telefonoPaciente: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.minLength(10)]],
    idDoctor: [0, [Validators.required, Validators.min(1), Validators.max(9999)]],
    fecha: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    hora: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    motivo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]]
  });

  constructor() {
    this.doctoresService.getDoctores().subscribe({
      next: (data) => this.doctores.set(data)
    });

    this.route.queryParamMap.subscribe((params) => {
      const doctorId = Number(params.get('doctorId'));

      if (doctorId) {
        this.form.patchValue({ idDoctor: doctorId });
      }
    });
  }

  getField(name: string) {
    return this.form.get(name);
  }

  isInvalid(name: string): boolean {
    const field = this.getField(name);
    return !!field && field.touched && field.invalid;
  }

  hasError(name: string, error: string): boolean {
    return !!this.getField(name)?.hasError(error);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.uiMessage.show('Revisa los campos obligatorios del formulario.', 'error');
      return;
    }

    this.enviando.set(true);

    this.citasService.createCita(this.form.getRawValue() as never).subscribe({
      next: () => {
        this.uiMessage.show('La cita se registró correctamente.', 'success');
        this.form.reset({
          nombrePaciente: '',
          correoPaciente: '',
          telefonoPaciente: '',
          idDoctor: 0,
          fecha: '',
          hora: '',
          motivo: ''
        });
        this.enviando.set(false);
      },
      error: () => {
        this.uiMessage.show('No fue posible registrar la cita.', 'error');
        this.enviando.set(false);
      }
    });
  }
}