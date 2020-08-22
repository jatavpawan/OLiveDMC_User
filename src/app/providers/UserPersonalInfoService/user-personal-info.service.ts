import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserPersonalInfoService {

  constructor(private dataService: DataService) { }

  AddUpdateUserPersonalInfo(data){
    return <Observable<ResponseModel>> this.dataService.postData('UserPersonalInfo/AddUpdateUserPersonalInfo', data);
  }


  GetAllUserPersonalInfo()
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserPersonalInfo/GetAllUserPersonalInfo');
  }
  
  GetUserPersonalInfoByUserId(UserPersonalInfoId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserPersonalInfo/GetUserPersonalInfoByUserId?id='+UserPersonalInfoId);
  }
 
  deleteUserPersonalInfo(UserPersonalInfoId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserPersonalInfo/deleteUserPersonalInfo?Id='+UserPersonalInfoId);
  }

  AddUpdateUserProfileImage(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('UserPersonalInfo/AddUpdateUserProfileImage', data);
  }

  AddUpdateUserAboutDescription(data){
    return <Observable<ResponseModel>> this.dataService.postData('UserPersonalInfo/AddUpdateUserAboutDescription', data);
  }

  AddUpdateUserCoverImage(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('UserPersonalInfo/AddUpdateUserCoverImage', data);
  }

 
}
