import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserPostService {

  constructor(private dataService: DataService) { }

  AddUpdateUserPost(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('UserPost/AddUpdateUserPost', data);
  }


  GetAllUserPost()
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserPost/GetAllUserPost');
  }
  
  GetUserPostDetailByUserPostId(UserPostId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserPost/GetUserPostDetailByUserPostId?id='+UserPostId);
  }
 
  editUserPost(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('UserPost/AddUpdateUserPost', data);
  }
 
  deleteUserPost(UserPostId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserPost/deleteUserPost?Id='+UserPostId);
  }
 
  fileUploadInUserPost(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('UserPost/fileUploadInUserPost', data);
  }
 
  videoUploadInUserPost(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('UserPost/videoUploadInUserPost', data);
  }

  deleteVideoInUserPost(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('TourTheme/deleteVideoInUserPost?oldVideoName='+oldVideoName);
  }

  GetAllUserPostByUserId(userId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserPost/GetAllUserPostByUserId?userId='+userId);
  }
  GetLoggedInUserPost(userId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserPost/GetLoggedInUserPost?userId='+userId);
  }
  GetLoggedInUserFriendPost(userId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('UserPost/GetLoggedInUserFriendPost?userId='+userId);
  }

  userReactOnPost(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('UserPost/userReactOnPost',data);
  }

  userCommentOnPost(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('UserPost/userCommentOnPost',data);
  }

  reactOnPostComment(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('UserPost/reactOnPostComment',data);
  }
 
  GetBuzzWallPost(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('UserPost/GetBuzzWallPost',data);
  }
 
  GetPostLoadComment(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('UserPost/GetPostLoadComment',data);
  }

  
}
