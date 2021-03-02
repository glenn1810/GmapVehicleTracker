import { Component, OnInit } from '@angular/core';
import { Vehicle, Company } from '../../Models';
import { SharedService } from '../../SharedService/shared.service';
import { BusRoutes } from '../../Models/busRoutes.model';
import { latLong } from '../../Models/latlong.model';

declare function initializeGoogleMap(busesRoutes: any): any;
declare function onSelectBusByCompany(index: any, isChecked: any, companies: any): any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  vehicles: Vehicle[] = [];
  companies: Company[] = [];
  newVehicle: Vehicle = { id: 0, companyName: '', destination: '', origin: '', name: '', revenue: 378.23, status: 'Ready' };
  busesRoutes: BusRoutes[] = [];


  constructor(private service: SharedService) { }

  ngOnInit(): void {

    this.getDummyData();

    this.populateCompanyList(this.busesRoutes);

    //this.getVehicleRouteList();

    initializeGoogleMap(this.busesRoutes);
  }


  onCompanySelected(company: Company): void {
    onSelectBusByCompany(this.busesRoutes.findIndex(x => x.companyName == company.companyName), company.isChecked, this.companies);
  }

  private getVehicleRouteList() : void {
    this.service.getGmapVehicleRouteTrackerList().subscribe(data => {
      this.vehicles = data;
      this.populateCompanyList(this.busesRoutes);
    });
  }

  private populateCompanyList(vehicles: BusRoutes[]): void {
    var companies = vehicles.map(x => x.companyName).filter((v, i, a) => a.indexOf(v) === i)

    for (let value of companies) {
      const company: Company = {
        companyName: value,
        isChecked: true
      };

      this.companies.push(company);
    }
  }

  private getDummyData(): void {
    let waypoints: latLong[] = [];

    let originLatLong: latLong = {
      lat: 14.547180638798155,
      long: 121.0545825212618
    };

    let destinationLatLong: latLong = {
      lat: 14.547159869034074,
      long: 121.0544752329037
    }

    let waypoint1: latLong = {
      lat: 14.553868401214913,
      long: 121.05211488902596
    }

    let waypoint2: latLong = {
      lat: 14.55241455705643,
      long: 121.04559175685475
    }

    waypoints.push(waypoint1);
    waypoints.push(waypoint2);

    let busroute1: BusRoutes = {
      busName: "Bus A",
      companyName: "A Corp",
      destination: destinationLatLong,
      origin: originLatLong,
      revenue: 500,
      waypoints: waypoints
    }

    let busroute2: BusRoutes = {
      busName: "Bus B",
      companyName: "B Corp",
      destination: destinationLatLong,
      origin: originLatLong,
      revenue: 700,
      waypoints: waypoints
    }

    let busroute3: BusRoutes = {
      busName: "Bus C",
      companyName: "C Corp",
      destination: destinationLatLong,
      origin: originLatLong,
      revenue: 1000,
      waypoints: waypoints
    }

    this.busesRoutes.push(busroute1);
    this.busesRoutes.push(busroute2);
    this.busesRoutes.push(busroute3);
  }
}
