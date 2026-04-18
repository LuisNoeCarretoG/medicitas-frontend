import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Doctor } from '../../../core/models/doctor.model';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css']
})
export class DoctorCardComponent {
  @Input({ required: true }) doctor!: Doctor;
  @Output() reservar = new EventEmitter<number>();

  onReservar(): void {
    this.reservar.emit(this.doctor.id_doctor);
  }
}
