import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateNews(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('News/AddUpdateNews', data);
  }


  GetAllNews()
  {
    return <Observable<ResponseModel>> this.dataService.getData('News/GetAllNews');
  }
  
  GetNewsDetailByNewsId(NewsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('News/GetNewsDetailByNewsId?id='+NewsId);
  }
 
  editNews(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('News/AddUpdateNews', data);
  }
 
  deleteNews(NewsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('News/deleteNews?Id='+NewsId);
  }
 
  fileUploadInNews(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('News/fileUploadInNews', data);
  }
 
  videoUploadInNews(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('News/videoUploadInNews', data);
  }

  deleteVideoInNews(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('TourTheme/deleteVideoInNews?oldVideoName='+oldVideoName);
  }

  GetAllNewsinFrontEnd()
  {
    return <Observable<ResponseModel>> this.dataService.getData('News/GetAllNewsinFrontEnd');
  }
}
