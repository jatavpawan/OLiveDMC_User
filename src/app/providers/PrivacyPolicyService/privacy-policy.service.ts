import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PrivacyPolicyService {

  constructor( private dataService: DataService) { }

  // <----------------------About-us------------------------------------------------->
  
  AddUpdatePrivacyPolicyDetail(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('PrivacyPolicy/AddUpdatePrivacyPolicyDetail', data);
  }
  removePrivacyPolicyDetail(id)
  {
    return <Observable<ResponseModel>> this.dataService.getData('PrivacyPolicy/deletePrivacyPolicyInfo?Id='+id);
  }
  
  GetPrivacyPolicyDetail()
  {
    return <Observable<ResponseModel>> this.dataService.getData('PrivacyPolicy/GetPrivacyPolicyDetail');
  }
 
  fileUploadInPrivacyPolicy(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('PrivacyPolicy/fileUploadInPrivacyPolicy', data);
  }
}
