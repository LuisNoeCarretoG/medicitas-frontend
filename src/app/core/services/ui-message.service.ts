import { Injectable, computed, signal } from '@angular/core';

export type UiMessageType = 'success' | 'error' | 'info';

interface UiMessageState {
  text: string;
  type: UiMessageType;
}

@Injectable({ providedIn: 'root' })
export class UiMessageService {
  private readonly _message = signal<UiMessageState | null>(null);
  readonly message = computed(() => this._message());

  show(text: string, type: UiMessageType = 'info'): void {
    this._message.set({ text, type });
    setTimeout(() => this.clear(), 3000);
  }

  clear(): void {
    this._message.set(null);
  }
}
