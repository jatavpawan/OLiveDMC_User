import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { DataService } from '../dataservice/data.service';

@Injectable({
  providedIn: 'root'
})
export class StudentCareerService {

  constructor(private dataService: DataService) { }

  AddUpdateStudentCareer(data){
    return <Observable<ResponseModel>> this.dataService.postData('StudentCareer/AddUpdateStudentCareer', data);
  }


  GetAllStudentCareer()
  {
    return <Observable<ResponseModel>> this.dataService.getData('StudentCareer/GetAllStudentCareer');
  }
  
  GetStudentCareerById(StudentCareerId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('StudentCareer/GetStudentCareerDetailByStudentCareerId?id='+StudentCareerId);
  }
  
  deleteStudentCareer(StudentCareerId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('StudentCareer/deleteStudentCareer?Id='+StudentCareerId);
  }
 
}
