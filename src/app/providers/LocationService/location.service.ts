import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  constructor(private dataService: DataService) { }

  // -----------------------------------------------Country Methods--------------------------------------------------

  AddUpdateCountry(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('Location/AddUpdateCountry', data);
  }


  GetAllCountry()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Location/GetAllCountry');
  }
 
  deleteCountry(CountryId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Location/deleteCountry?Id='+CountryId);
  }

  GetCountryDetailByCountryId(CountryId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Location/GetCountryDetailByCountryId?Id='+CountryId);
  }


  // -----------------------------------------------State Methods--------------------------------------------------
  

  AddUpdateState(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('Location/AddUpdateState', data);
  }


  GetAllState()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Location/GetAllState');
  }
 
  deleteState(StateId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Location/deleteState?Id='+StateId);
  }

  GetStateDetailByStateId(StateId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Location/GetStateDetailByStateId?Id='+StateId);
  }


  // -----------------------------------------------City Methods--------------------------------------------------

  AddUpdateCity(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('Location/AddUpdateCity', data);
  }


  GetAllCity()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Location/GetAllCity');
  }
 
  deleteCity(CityId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Location/deleteCity?Id='+CityId);
  }

  GetCityDetailByCityId(CityId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Location/GetCityDetailByCityId?Id='+CityId);
  }
 
  GetStateByCountryId(countryId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Location/GetStateByCountryId?countryId='+countryId);
  }
  
  GetCityByStateId(stateId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Location/GetCityByStateId?stateId='+stateId);
  }


}
