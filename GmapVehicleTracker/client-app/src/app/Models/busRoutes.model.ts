import { latLong } from './latlong.model';

export class BusRoutes {
  companyName: string;
  busName: string;
  origin: latLong;
  destination: latLong;
  wayPoints: latLong[];
  revenue: number;
}
