import { Routes } from '@angular/router';
import { Profiles } from './profiles/profiles';
import { Welcome } from './welcome/welcome';
import { Doctors } from './doctors/doctors';
import { Medications } from './medications/medications';
import { Orders } from './orders/orders';
import { Settings } from './settings/settings';


export const routes: Routes = [
  {
    path: '',
    component: Welcome,
  },
  {
    path: 'profiles',
    component: Profiles,
  },
  {
    path: 'doctors',
    component: Doctors,
  },
  {
    path: 'medications',
    component: Medications,
  },
  {
    path: 'order',
    component: Orders,
  },
  {
    path: 'settings',
    component: Settings,
  },
];