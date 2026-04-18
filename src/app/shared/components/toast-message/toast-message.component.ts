import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { UiMessageService } from '../../../core/services/ui-message.service';

@Component({
  selector: 'app-toast-message',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css']
})
export class ToastMessageComponent {
  readonly uiMessage = inject(UiMessageService);
}
