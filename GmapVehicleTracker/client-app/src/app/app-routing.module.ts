import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapComponent } from './Components/Map/map.component';
import { DummayMapComponent } from './Components/DummyMap/dummyMap.component';


const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'dummyMap', component: DummayMapComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
