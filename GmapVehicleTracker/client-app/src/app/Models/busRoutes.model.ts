import { latLong } from './latlong.model';

export class BusRoutes {
  companyName: string;
  busName: string;
  origin: latLong;
  destination: latLong;
  waypoints: latLong[];
  revenue: number;
}
