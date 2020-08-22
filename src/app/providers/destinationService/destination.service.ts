import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { Observable } from 'rxjs';
import { DataService } from '../dataservice/data.service';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor( private dataService : DataService) { }

  
  AddUpdateDestinationInCountry(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('Destination/AddUpdateDestinationInCountry', data);
  }

  GetCountryInfoByCountryCode(countryCode:string){
    return <Observable<ResponseModel>> this.dataService.getData('Destination/GetCountryInfoByCountryCode?countryCode='+countryCode);
  }

  deleteCountryInfoById(id)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Destination/deleteCountryInfoById?Id='+id);
  }
 

  GetAllDestinationCountry()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Destination/GetAllDestinationCountry');
  }

  fileUploadInDestination(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('Destination/fileUploadInDestination', data);
  }
  
  videoUploadInDestination(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('Destination/videoUploadInDestination', data);
  }

}
