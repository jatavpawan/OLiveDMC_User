import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private dataService: DataService) { }

  AddUpdateBanner(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('Banner/AddUpdateBanner', data);
  }


  GetAllBanner()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Banner/GetAllBanner');
  }
 
  editBanner(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('Banner/AddUpdateBanner', data);
  }
 
  deleteBanner(BannerId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Banner/deleteBanner?Id='+BannerId);
  }
 
  fileUploadInBanner(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('Banner/fileUploadInBanner', data);
  }
  
  videoUpload(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('Banner/videoUpload', data);
  }

  GetBannerDetailByPageId(pageId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Banner/GetBannerDetailByPageId?Id='+pageId);
  }

}
