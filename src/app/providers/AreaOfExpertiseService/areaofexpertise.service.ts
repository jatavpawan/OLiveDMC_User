import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { DataService } from '../dataservice/data.service';

@Injectable({
  providedIn: 'root'
})
export class AreaofexpertiseService {

  constructor(private dataService: DataService) { }

  AddUpdateAreaofexpertise(data){
    return <Observable<ResponseModel>> this.dataService.postData('Areaofexpertise/AddUpdateAreaofexpertise', data);
  }


  GetAllAreaofexpertise()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Areaofexpertise/GetAllAreaofexpertise');
  }
  
  GetAreaofexpertiseById(AreaofexpertiseId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Areaofexpertise/GetAreaofexpertiseDetailByAreaofexpertiseId?id='+AreaofexpertiseId);
  }
  
  deleteAreaofexpertise(AreaofexpertiseId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Areaofexpertise/deleteAreaofexpertise?Id='+AreaofexpertiseId);
  }
 
}
