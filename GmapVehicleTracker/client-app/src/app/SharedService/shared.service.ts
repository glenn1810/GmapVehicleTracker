import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { googleMapRequest } from '../Models';

@Injectable({
  providedIn: 'root'
})


export class SharedService {

  readonly APIUrl = "/api/";

  constructor(private http: HttpClient) { }

  getGmapVehicleRouteTrackerList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + 'vehicleRouteTracker').pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
