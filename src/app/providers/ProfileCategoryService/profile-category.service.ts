import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { Observable } from 'rxjs';
import { DataService } from '../dataservice/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileCategoryService {

  constructor(private dataService: DataService) { }

  AddUpdateProfileCategory(data){
    return <Observable<ResponseModel>> this.dataService.postData('ProfileCategory/AddUpdateProfileCategory', data);
  }


  GetAllProfileCategory()
  {
    return <Observable<ResponseModel>> this.dataService.getData('ProfileCategory/GetAllProfileCategory');
  }
  
  GetProfileCategoryById(profileCategoryId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('ProfileCategory/GetProfileCategoryDetailByProfileCategoryId?id='+profileCategoryId);
  }
  
  deleteProfileCategory(profileCategoryId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('ProfileCategory/deleteProfileCategory?Id='+profileCategoryId);
  }
 
}
