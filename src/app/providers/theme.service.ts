import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { DataService } from './dataservice/data.service';
import { Router } from '@angular/router';
import { ResponseModel } from '../model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateTheme(data){
    return <Observable<any>> this.dataService.postFormData('TourTheme/AddUpdateTheme', data);
  }


  GetAllTourTheme()
  {
    return <Observable<ResponseModel>> this.dataService.getData('TourTheme/GetAllTheme');
  }
 
  editTourTheme(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('TourTheme/AddUpdateTheme', data);
  }
 
  deleteTourTheme(themeId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('TourTheme/deleteTourTheme?Id='+themeId);
  }
 
  fileUploadInTourTheme(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('TourTheme/fileUploadInTourTheme', data);
  }
  GetThemeDetailByThemeId(themeId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('TourTheme/GetThemeDetailByThemeId?id='+themeId);
  }

  videoUploadInTheme(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('TourTheme/videoUploadInTheme', data);
  }

  deleteVideoInTheme(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('TourTheme/deleteVideoInTheme?oldVideoName='+oldVideoName);
  }
 
}
