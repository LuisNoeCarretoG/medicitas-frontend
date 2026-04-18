import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactoService } from '../../core/services/contacto.service';
import { UiMessageService } from '../../core/services/ui-message.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  private readonly contactoService = inject(ContactoService);
  private readonly uiMessage = inject(UiMessageService);

  readonly enviando = signal(false);

  contacto = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  };

  onSubmit(contactForm: NgForm): void {
    if (contactForm.invalid) {
      this.uiMessage.show('Revisa los campos obligatorios del formulario.', 'error');
      return;
    }

    this.enviando.set(true);

    this.contactoService.sendMessage(this.contacto).subscribe({
      next: () => {
        this.uiMessage.show('Tu mensaje se envió correctamente.', 'success');
        this.contacto = {
          nombre: '',
          correo: '',
          asunto: '',
          mensaje: ''
        };
        contactForm.resetForm({
          nombre: '',
          correo: '',
          asunto: '',
          mensaje: ''
        });
        this.enviando.set(false);
      },
      error: () => {
        this.uiMessage.show('No fue posible enviar tu mensaje.', 'error');
        this.enviando.set(false);
      }
    });
  }
}