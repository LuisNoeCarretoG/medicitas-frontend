import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DoctoresComponent } from './pages/doctores/doctores.component';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';
import { AgendarCitaComponent } from './pages/agendar-cita/agendar-cita.component';
import { MisCitasComponent } from './pages/mis-citas/mis-citas.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdminDoctoresComponent } from './pages/admin-doctores/admin-doctores.component';
import { AdminCitasComponent } from './pages/admin-citas/admin-citas.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'doctores', component: DoctoresComponent },
  { path: 'doctor/:id', component: DoctorDetailComponent },
  { path: 'agendar', component: AgendarCitaComponent },
  { path: 'mis-citas', component: MisCitasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'admin/doctores', component: AdminDoctoresComponent },
  { path: 'admin/citas', component: AdminCitasComponent },
  { path: '**', component: NotFoundComponent }
];
