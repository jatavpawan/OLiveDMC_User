import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class TrendingNewsService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateTrendingNews(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('TrendingNews/AddUpdateTrendingNews', data);
  }


  GetAllTrendingNews()
  {
    return <Observable<ResponseModel>> this.dataService.getData('TrendingNews/GetAllTrendingNews');
  }
  
  GetTrendingNewsDetailByTrendingNewsId(TrendingNewsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('TrendingNews/GetTrendingNewsDetailByTrendingNewsId?id='+TrendingNewsId);
  }
 
  editTrendingNews(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('TrendingNews/AddUpdateTrendingNews', data);
  }
 
  deleteTrendingNews(TrendingNewsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('TrendingNews/deleteTrendingNews?Id='+TrendingNewsId);
  }
 
  fileUploadInTrendingNews(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('TrendingNews/fileUploadInTrendingNews', data);
  }
 
  videoUploadInTrendingNews(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('TrendingNews/videoUploadInTrendingNews', data);
  }

  deleteVideoInTrendingNews(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('TourTheme/deleteVideoInTrendingNews?oldVideoName='+oldVideoName);
  }
}
