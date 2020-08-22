import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OfferAdsService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateOfferAds(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('OfferAds/AddUpdateOfferAds', data);
  }


  GetAllOfferAds()
  {
    return <Observable<ResponseModel>> this.dataService.getData('OfferAds/GetAllOfferAds');
  }
  
  GetOfferAdsDetailByOfferAdsId(OfferAdsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('OfferAds/GetOfferAdsDetailByOfferAdsId?id='+OfferAdsId);
  }
 
  deleteOfferAds(OfferAdsId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('OfferAds/deleteOfferAds?Id='+OfferAdsId);
  }
 
  fileUploadInOfferAds(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('OfferAds/fileUploadInOfferAds', data);
  }
  
  GetAllOfferAdsInFrontEnd()
  {
    return <Observable<ResponseModel>> this.dataService.getData('OfferAds/GetAllOfferAdsInFrontEnd');
  }

  GetAllOfferAdsByPageId(pageId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('OfferAds/GetAllOfferAdsByPageId?id='+pageId);
  }
}
