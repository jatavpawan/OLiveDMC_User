import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class TopDestinationService {

  constructor(private dataService: DataService) { }

  AddUpdateTopDestination(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('TopDestination/AddUpdateTopDestination', data);
  }


  GetAllTopDestination()
  {
    return <Observable<ResponseModel>> this.dataService.getData('TopDestination/GetAllTopDestination');
  }
  
  GetTopDestinationDetailByTopDestinationId(TopDestinationId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('TopDestination/GetTopDestinationDetailByTopDestinationId?id='+TopDestinationId);
  }
 
  deleteTopDestination(TopDestinationId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('TopDestination/deleteTopDestination?Id='+TopDestinationId);
  }
 
  fileUploadInTopDestination(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('TopDestination/fileUploadInTopDestination', data);
  }
 
  videoUploadInTopDestination(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('TopDestination/videoUploadInTopDestination', data);
  }

  deleteVideoInTopDestination(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('TourTheme/deleteVideoInTopDestination?oldVideoName='+oldVideoName);
  }
}
