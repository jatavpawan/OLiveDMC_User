import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CurrentNewsService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateCurrentNews(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('CurrentNews/AddUpdateCurrentNews', data);
  }


  GetAllCurrentNews()
  {
    return <Observable<ResponseModel>> this.dataService.getData('CurrentNews/GetAllCurrentNews');
  }
  
  GetCurrentNewsDetailByCurrentNewsId(CurrentNewsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('CurrentNews/GetCurrentNewsDetailByCurrentNewsId?id='+CurrentNewsId);
  }
 
  editCurrentNews(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('CurrentNews/AddUpdateCurrentNews', data);
  }
 
  deleteCurrentNews(CurrentNewsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('CurrentNews/deleteCurrentNews?Id='+CurrentNewsId);
  }
 
  fileUploadInCurrentNews(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('CurrentNews/fileUploadInCurrentNews', data);
  }
  
  videoUploadInCurrentNews(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('CurrentNews/videoUploadInCurrentNews', data);
  }

  deleteVideoInCurrentNews(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('TourTheme/deleteVideoInCurrentNews?oldVideoName='+oldVideoName);
  }



}
