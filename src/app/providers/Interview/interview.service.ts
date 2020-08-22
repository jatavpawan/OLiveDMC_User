import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateInterview(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('Interview/AddUpdateInterview', data);
  }


  GetAllInterview()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Interview/GetAllInterview');
  }
  
  GetInterviewDetailByInterviewId(InterviewId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Interview/GetInterviewDetailByInterviewId?id='+InterviewId);
  }
 
  editInterview(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('Interview/AddUpdateInterview', data);
  }
 
  deleteInterview(InterviewId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Interview/deleteInterview?Id='+InterviewId);
  }
 
  fileUploadInInterview(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('Interview/fileUploadInInterview', data);
  }
 
  videoUploadInInterview(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('Interview/videoUploadInInterview', data);
  }

  deleteVideoInInterview(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('Interview/deleteVideoInInterview?oldVideoName='+oldVideoName);
  }
}
