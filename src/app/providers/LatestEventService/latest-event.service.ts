import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class LatestEventService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateLatestEvent(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('LatestEvent/AddUpdateLatestEvent', data);
  }


  GetAllLatestEvent()
  {
    
    return <Observable<ResponseModel>> this.dataService.getData('LatestEvent/GetAllLatestEvent');
  }
  
  GetLatestEventDetailByEventId(LatestEventId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('LatestEvent/GetLatestEventDetailByEventId?id='+LatestEventId);
  }
 
  editLatestEvent(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('LatestEvent/AddUpdateLatestEvent', data);
  }
 
  deleteLatestEvent(LatestEventId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('LatestEvent/deleteLatestEvent?Id='+LatestEventId);
  }
 
  fileUploadInLatestEvent(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('LatestEvent/fileUploadInLatestEvent', data);
  }
  
  videoUploadInLatestEvent(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('LatestEvent/videoUploadInLatestEvent', data);
  }
  deleteVideoInLatestEvent(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('LatestEvent/deleteVideoInLatestEvent?oldVideoName='+oldVideoName);
  }

  GetAllLatestEventInFrontEnd() {
    return <Observable<ResponseModel>>this.dataService.getData('LatestEvent/GetAllLatestEventInFrontEnd');
  }
}
