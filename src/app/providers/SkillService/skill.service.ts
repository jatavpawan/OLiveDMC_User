import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { DataService } from '../dataservice/data.service';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private dataService: DataService) { }

  AddUpdateSkills(data){
    return <Observable<ResponseModel>> this.dataService.postData('Skills/AddUpdateSkills', data);
  }


  GetAllSkills()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Skills/GetAllSkills');
  }
  
  GetSkillsById(SkillsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Skills/GetSkillsDetailBySkillsId?id='+SkillsId);
  }
  
  deleteSkills(SkillsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Skills/deleteSkills?Id='+SkillsId);
  }
 
}
