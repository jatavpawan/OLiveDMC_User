import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateFaq(data){
    return <Observable<ResponseModel>> this.dataService.postData('Faq/AddUpdateFaq', data);
  }


  GetAllFaq()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Faq/GetAllFaq');
  }
  
  GetFaqDetailByFaqId(FaqId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Faq/GetFaqDetailByFaqId?id='+FaqId);
  }
 
  editFaq(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('Faq/AddUpdateFaq', data);
  }
 
  deleteFaq(FaqId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Faq/deleteFaq?Id='+FaqId);
  }
 
  fileUploadInFaq(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('Faq/fileUploadInFaq', data);
  }
 
}
