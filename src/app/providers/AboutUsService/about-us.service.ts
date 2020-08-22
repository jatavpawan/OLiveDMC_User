import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor( private dataService: DataService) { }

  AddUpdateAboutUsDetail(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('AboutUs/AddUpdateAboutUsDetail', data);
  }
  removeAboutUsDetail(id)
  {
    return <Observable<ResponseModel>> this.dataService.getData('AboutUs/deleteAboutUsInfo?Id='+id);
  }
  
  GetAboutUsDetail()
  {
    return <Observable<ResponseModel>> this.dataService.getData('AboutUs/GetAboutUsDetail');
  }
 
  fileUploadInAboutUs(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('AboutUs/fileUploadInAboutUs', data);
  }

  GetAllAboutUsStatementinFrontEnd()
  {
    return <Observable<ResponseModel>> this.dataService.getData('AboutUsStatement/GetAllAboutUsStatementinFrontEnd');
  }

  GetAboutUsIntroductionDetail()
  {
    return <Observable<ResponseModel>> this.dataService.getData('AboutUsIntroduction/GetAboutUsIntroductionDetail');
  }
 
}
