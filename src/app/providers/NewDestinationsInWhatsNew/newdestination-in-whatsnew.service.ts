import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class NewdestinationInWhatsnewService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateNewDestinationsInWhatsNew(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('NewDestinationsInWhatsNew/AddUpdateNewDestinationsInWhatsNew', data);
  }


  GetAllNewDestinationsInWhatsNew()
  {
    return <Observable<ResponseModel>> this.dataService.getData('NewDestinationsInWhatsNew/GetAllNewDestinationsInWhatsNew');
  }
  
  GetNewDestinationsInWhatsNewDetailByDestinationsId(NewDestinationsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('NewDestinationsInWhatsNew/GetNewDestinationsInWhatsNewDetailByDestinationsId?id='+NewDestinationsId);
  }
 
  editNewDestinationsInWhatsNew(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('NewDestinationsInWhatsNew/AddUpdateNewDestinationsInWhatsNew', data);
  }
 
  deleteNewDestinationsInWhatsNew(NewDestinationsInWhatsNewId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('NewDestinationsInWhatsNew/deleteNewDestinationsInWhatsNew?Id='+NewDestinationsInWhatsNewId);
  }
 
  fileUploadInNewDestinationsInWhatsNew(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('NewDestinationsInWhatsNew/fileUploadInNewDestinationsInWhatsNew', data);
  }
 
  videoUploadInNewDestinationsInWhatsNew(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('NewDestinationsInWhatsNew/videoUploadInNewDestinationsInWhatsNew', data);
  }

  deleteVideoInNewDestinationsInWhatsNew(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('NewDestinationsInWhatsNew/deleteVideoInNewDestinationsInWhatsNew?oldVideoName='+oldVideoName);
  }
 
  GetAllNewDestinationsInWhatsNewFrontEnd(){
    return <Observable<ResponseModel>> this.dataService.getData('NewDestinationsInWhatsNew/GetAllNewDestinationsInWhatsNewFrontEnd');
  }
}
