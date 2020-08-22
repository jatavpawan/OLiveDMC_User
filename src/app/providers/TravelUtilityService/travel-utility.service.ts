import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TravelUtilityService {

  constructor(private dataService: DataService) { }

  AddUpdateUtility(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('Utility/AddUpdateUtility', data);
  }


  GetAllUtility()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Utility/GetAllUtility');
  }
 
  editUtility(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('Utility/AddUpdateUtility', data);
  }
 
  deleteUtility(UtilityId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Utility/deleteUtility?Id='+UtilityId);
  }
 
  fileUploadInUtility(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('Utility/fileUploadInUtility', data);
  }
  
  getUtilityDetailByUtilityType(UtilityType)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Utility/getUtilityDetailByUtilityType?UtilityType='+UtilityType);
  }

  videoUploadInUtility(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('Utility/videoUploadInUtility', data);
  }

  deleteVideoInUtility(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('Utility/deleteVideoInUtility?oldVideoName='+oldVideoName);
  }

  // <-------------------------------Travel Utility Query------------------------------------>

  AddUpdateTravelUtilityQuery(data){
    return <Observable<ResponseModel>> this.dataService.postData('TravelUtilityQuery/AddUpdateTravelUtilityQuery', data);
  }


}
