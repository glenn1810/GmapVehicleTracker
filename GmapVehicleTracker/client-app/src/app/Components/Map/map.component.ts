import { Component, OnInit } from '@angular/core';
import { Vehicle, Company } from '../../Models';
import { SharedService } from '../../SharedService/shared.service';


declare function initializeGoogleMap(): any;
declare function onChangeRoute(vehicles: any): any;
declare function onHighlightRouteByCompany(company: any): any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  vehicles: Vehicle[] = [];
  companies: Company[] = [];
  newVehicle: Vehicle = {id:0, companyName:'',destination:'',origin: '',name:'',revenue:378.23,status:'Ready'};


  constructor(private service: SharedService) { }

  ngOnInit(): void {

    //var vehicle: Vehicle = {
    //  id: 1,
    //  companyName: ' A CORP',
    //  name: 'Bus AA',
    //  origin: 'BGC Corporate Center, 30th St, Taguig, 1634 Metro Manila',
    //  destination: 'B. Morcilla St, Pateros, 1620 Metro Manila'
    //};

    //this.vehicles.push(vehicle);

    //var vehicle1: Vehicle = {
    //  id: 2,
    //  companyName: ' B CORP',
    //  name: 'Bus BB',
    //  origin: 'Fully Booked Ground Floor, B6, Bonifacio High Street Taguig Metro Manila Philippines',
    //  destination: 'Fifth Avenue Place 5th Avenue corner 21st Dr Taguig 1630 Metro Manila'
    //};
   
    //this.vehicles.push(vehicle1);

    //var vehicle2: Vehicle = {
    //  id: 3,
    //  companyName: ' A CORP',
    //  name: 'Bus AC',
    //  origin: 'Ridgewood Towers Taguig Carlos P.Garcia Ave Taguig 1632 Metro Manila Philippines',
    //  destination: 'Iglesia Ni Cristo - Lokal ng Pembo Milflores Makati Metro Manila Philippines'
    //};


    //this.vehicles.push(vehicle2);

    this.getVehicleRouteList();


    initializeGoogleMap();
  }

  onchangeRoute(): void {
    onChangeRoute(this.vehicles);
  }

  onCreateNewRoute(): void {
    var model = this.newVehicle;

    if (model.companyName && model.destination && model.origin
      && model.revenue && model.status && model.name) {
      if(model.destination === model.origin)
        alert("Origin and Destination is the same.")
      else
        this.createNewVehicleRoute();
    }
    else {
      alert("Some of the fields are empty.")
    }
  }

  onhighlightRoute(company: Company): void {
    console.log(company.companyName + "-" + company.isChecked);
    onHighlightRouteByCompany(company);
  }

  private getVehicleRouteList() : void {
    this.service.getGmapVehicleRouteTrackerList().subscribe(data => {
      this.vehicles = data;
      this.populateCompanyList(this.vehicles);
    });
  }

  private createNewVehicleRoute(): void {
    this.service.createNewVehicleRoute(this.newVehicle).subscribe(
      x => {
        location.reload();
      });
  }

  private populateCompanyList(vehicles: Vehicle[]): void {
    var companies = vehicles.map(x => x.companyName).filter((v, i, a) => a.indexOf(v) === i)

    for (let value of companies) {
      const company: Company = {
        companyName: value,
        isChecked: false
      };

      this.companies.push(company);
    }
  }
}
