import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { DataService } from "../dataservice/data.service";

import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: "root",
})
export class BookingService {
  airports: any = [];
  countries: any = [];
  // endpoint:string= "http://rsmartservices.com/";
  endpoint:string= "http://localhost:4200/";


  constructor(private dataService: DataService, private http: HttpClient) {}

  GetCityandAirportDetails(data) {
  //  debugger;
    return <Observable<ResponseModel>> this.dataService.postFormData('Booking/GetFlightCityList', data);
    // return this.airports.length
    //   ? of(this.airports)
    //   : this.http
    //       .post<any>(
    //         this.endpoint+"api/B2CUserControl/FlightForm2.asmx/GetCityandAirportDetails_",
    //         JSON.stringify(data),
    //         {
    //           headers: new HttpHeaders({
    //             "Content-type": "application/json; charset=UTF-8",
    //           }),
    //         }
    //       )
    //       .pipe(tap((data) => (this.airports = data)));
  }

  GetLocationList(data) {
    return <Observable<ResponseModel>> this.dataService.postData('Booking/GetLocationList', data);
    // return this.countries.length
    //   ? of(this.countries)
    //   : this.http
    //       .post<any>(
    //         this.endpoint+"api/B2CUserControl/HotelForm.asmx/GetHotelCountryDetails_",
    //         JSON.stringify(data),
    //         {
    //           headers: new HttpHeaders({
    //             "Content-type": "application/json; charset=UTF-8",
    //           }),
    //         }
    //       )
    //       .pipe(tap((data) => (this.countries = data)));
  }

  GetHotelCityDetails(data) {
    return this.countries.length
      ? of(this.countries)
      : this.http
          .post<any>(
            this.endpoint+"api/B2CUserControl/HotelForm.asmx/GetHotelCityDetails_",
            JSON.stringify(data),
            {
              headers: new HttpHeaders({
                "Content-type": "application/json; charset=UTF-8",
              }),
            }
          )
          .pipe(tap((data) => (this.countries = data)));
  }

  // GetCityandAirportDetails(data): Observable<any> {
  //   return this.http.post(this.endpoint+'api/B2CUserControl/FlightForm2.asmx/GetCityandAirportDetails_', JSON.stringify(data), { headers : new HttpHeaders ({ "Content-type": "application/json; charset=UTF-8" }) })
  //   .pipe(
  //     tap((response: any) => {
  //       response = response
  //         .filter( (airport :string) => this._normalizeValue(airport).includes(this._normalizeValue(data.prefixText)))

  //       return response;
  //     })
  //   )
  // }
}
