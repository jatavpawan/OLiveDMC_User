import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserGalleryService {

  constructor(private dataService: DataService) { }

  AddUpdateUserGallery(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('UserGallery/AddUpdateUserGallery', data);
  }


  GetAllUserGallery()
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserGallery/GetAllUserGallery');
  }
  
  GetUserGalleryById(UserGalleryId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserGallery/GetUserGalleryById?id='+UserGalleryId);
  }
 
  deleteUserGallery(UserGalleryId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserGallery/deleteUserGallery?Id='+UserGalleryId);
  }
 
  videoUploadInUserGallery(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('UserGallery/videoUploadInUserGallery', data);
  }

  deleteVideoInUserGallery(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('UserGallery/deleteVideoInUserGallery?oldVideoName='+oldVideoName);
  }

  GetAllUserGalleryByUserId(userId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserGallery/GetAllUserGalleryByUserId?userId='+userId);
  }

  userReactOnGallery(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('UserGallery/userReactOnGallery',data);
  }

  userCommentOnGallery(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('UserGallery/userCommentOnGallery',data);
  }

  reactOnGalleryComment(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('UserGallery/reactOnGalleryComment',data);
  }

  GalleryDetailByUserId(galleryId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserGallery/GalleryDetailByUserId?galleryId='+galleryId);
  }

}


