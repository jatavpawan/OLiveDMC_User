import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class InterviewInWhatsnewService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateInterviewsInWhatsNew(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('InterviewsInWhatsNew/AddUpdateInterviewsInWhatsNew', data);
  }


  GetAllInterviewsInWhatsNew()
  {
    return <Observable<ResponseModel>> this.dataService.getData('InterviewsInWhatsNew/GetAllInterviewsInWhatsNew');
  }
  
  GetInterviewsInWhatsNewDetailByInterviewsId(InterviewsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('InterviewsInWhatsNew/GetInterviewsInWhatsNewDetailByInterviewsId?id='+InterviewsId);
  }
 
  editInterviewsInWhatsNew(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('InterviewsInWhatsNew/AddUpdateInterviewsInWhatsNew', data);
  }
 
  deleteInterviewsInWhatsNew(InterviewsInWhatsNewId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('InterviewsInWhatsNew/deleteInterviewsInWhatsNew?Id='+InterviewsInWhatsNewId);
  }
 
  fileUploadInInterviewsInWhatsNew(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('InterviewsInWhatsNew/fileUploadInInterviewsInWhatsNew', data);
  }
 
  videoUploadInInterviewsInWhatsNew(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('InterviewsInWhatsNew/videoUploadInInterviewsInWhatsNew', data);
  }

  deleteVideoInInterviewsInWhatsNew(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('InterviewsInWhatsNew/deleteVideoInInterviewsInWhatsNew?oldVideoName='+oldVideoName);
  }

  GetAllInterviewsInWhatsNewFrontEnd()
  {
    return <Observable<ResponseModel>> this.dataService.getData('InterviewsInWhatsNew/GetAllInterviewsInWhatsNewFrontEnd');
  }
}
