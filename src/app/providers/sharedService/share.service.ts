import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DataService } from '../dataservice/data.service';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  hideHeaderFooter = new Subject();
  userLOggedIn = new Subject();
  hideSocialMediaBtn = new Subject();

  constructor(private dataService: DataService) { 
    this.hideHeaderFooter.asObservable();
    this.userLOggedIn.asObservable();
    this.hideSocialMediaBtn.asObservable();
  }

  hideHeaderFooterAction(val){
    this.hideHeaderFooter.next(val);
  }
  
  userLOggedInAction(val){
    this.userLOggedIn.next(val);
  }
  
  hideSocialMediaBtnAction(val){
    this.hideSocialMediaBtn.next(val);
  }

  GetAllPage()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Banner/GetAllPage');
  }
}
