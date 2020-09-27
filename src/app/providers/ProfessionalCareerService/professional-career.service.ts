import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { DataService } from '../dataservice/data.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalCareerService {

  constructor(private dataService: DataService) { }

  AddUpdateProfessionalCareer(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('ProfessionalCareer/AddUpdateProfessionalCareer', data);
  }


  GetAllProfessionalCareer()
  {
    return <Observable<ResponseModel>> this.dataService.getData('ProfessionalCareer/GetAllProfessionalCareer');
  }
  
  GetProfessionalCareerById(ProfessionalCareerId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('ProfessionalCareer/GetProfessionalCareerDetailByProfessionalCareerId?id='+ProfessionalCareerId);
  }
  
  deleteProfessionalCareer(ProfessionalCareerId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('ProfessionalCareer/deleteProfessionalCareer?Id='+ProfessionalCareerId);
  }
 
}
