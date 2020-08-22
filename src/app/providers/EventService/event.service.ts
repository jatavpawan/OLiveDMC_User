import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateEvent(data) {
    return <Observable<ResponseModel>>this.dataService.postFormData('Event/AddUpdateEvent', data);
  }


  GetAllEvent() {

    return <Observable<ResponseModel>>this.dataService.getData('Event/GetAllEvent');
  }
  GetAllEventInFrontEnd() {

    return <Observable<ResponseModel>>this.dataService.getData('Event/GetAllEventInFrontEnd');
  }
  
  // GetAllLatestEventInFrontEnd() {

  //   return <Observable<ResponseModel>>this.dataService.getData('Event/GetAllLatestEventInFrontEnd');
  // }

  GetEventDetailByEventId(EventId) {
    return <Observable<ResponseModel>>this.dataService.getData('Event/GetEventDetailByEventId?id=' + EventId);
  }

  editEvent(data) {
    return <Observable<ResponseModel>>this.dataService.postData('Event/AddUpdateEvent', data);
  }

  deleteEvent(EventId) {
    return <Observable<ResponseModel>>this.dataService.getData('Event/deleteEvent?Id=' + EventId);
  }

  fileUploadInEvent(data) {
    return <Observable<ResponseModel>>this.dataService.postFormData('Event/fileUploadInEvent', data);
  }

  videoUploadInEvent(data) {
    return <Observable<ResponseModel>>this.dataService.postFormData('Event/videoUploadInEvent', data);
  }
  deleteVideoInEvent(oldVideoName: string) {
    return <Observable<ResponseModel>>this.dataService.getData('TourTheme/deleteVideoInEvent?oldVideoName=' + oldVideoName);
  }
 


}
