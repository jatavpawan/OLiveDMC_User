import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { DataService } from '../dataservice/data.service';

@Injectable({
  providedIn: 'root'
})
export class FresherCareerService {

  constructor(private dataService: DataService) { }

  AddUpdateFresherCareer(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('FresherCareer/AddUpdateFresherCareer', data);
  }


  GetAllFresherCareer()
  {
    return <Observable<ResponseModel>> this.dataService.getData('FresherCareer/GetAllFresherCareer');
  }
  
  GetFresherCareerById(FresherCareerId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('FresherCareer/GetFresherCareerDetailByFresherCareerId?id='+FresherCareerId);
  }
  
  deleteFresherCareer(FresherCareerId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('FresherCareer/deleteFresherCareer?Id='+FresherCareerId);
  }
 
}
