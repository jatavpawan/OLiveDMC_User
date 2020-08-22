import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UpcommingNewsService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateUpcommingNews(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('UpcommingNews/AddUpdateUpcommingNews', data);
  }


  GetAllUpcommingNews()
  {
    return <Observable<ResponseModel>> this.dataService.getData('UpcommingNews/GetAllUpcommingNews');
  }
  
  GetUpcommingNewsDetailByUpcommingNewsId(UpcommingNewsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('UpcommingNews/GetUpcommingNewsDetailByUpcommingNewsId?id='+UpcommingNewsId);
  }
 
  editUpcommingNews(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('UpcommingNews/AddUpdateUpcommingNews', data);
  }
 
  deleteUpcommingNews(UpcommingNewsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('UpcommingNews/deleteUpcommingNews?Id='+UpcommingNewsId);
  }
 
  fileUploadInUpcommingNews(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('UpcommingNews/fileUploadInUpcommingNews', data);
  }
 
  videoUploadInUpcommingNews(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('UpcommingNews/videoUploadInUpcommingNews', data);
  }

  deleteVideoInUpcommingNews(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('TourTheme/deleteVideoInUpcommingNews?oldVideoName='+oldVideoName);
  }
}
