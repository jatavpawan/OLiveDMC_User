import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateContactUs(data){
    return <Observable<ResponseModel>> this.dataService.postData('ContactUs/AddUpdateContactUs', data);
  }

}
