import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FestivalService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateFestival(data) {
    return <Observable<ResponseModel>>this.dataService.postFormData('Festival/AddUpdateFestival', data);
  }


  GetAllFestival() {

    return <Observable<ResponseModel>>this.dataService.getData('Festival/GetAllFestival');
  }

  GetFestivalDetailByFestivalId(FestivalId) {
    return <Observable<ResponseModel>>this.dataService.getData('Festival/GetFestivalDetailByFestivalId?id=' + FestivalId);
  }

  editFestival(data) {
    return <Observable<ResponseModel>>this.dataService.postData('Festival/AddUpdateFestival', data);
  }

  deleteFestival(FestivalId) {
    return <Observable<ResponseModel>>this.dataService.getData('Festival/deleteFestival?Id=' + FestivalId);
  }

  fileUploadInFestival(data) {
    return <Observable<ResponseModel>>this.dataService.postFormData('Festival/fileUploadInFestival', data);
  }

  videoUploadInFestival(data) {
    return <Observable<ResponseModel>>this.dataService.postFormData('Festival/videoUploadInFestival', data);
  }
  deleteVideoInFestival(oldVideoName: string) {
    return <Observable<ResponseModel>>this.dataService.getData('TourTheme/deleteVideoInFestival?oldVideoName=' + oldVideoName);
  }
  GetAllFestivainFrontEnd() {
    return <Observable<ResponseModel>>this.dataService.getData('Festival/GetAllFestivainFrontEnd');
  }


}
