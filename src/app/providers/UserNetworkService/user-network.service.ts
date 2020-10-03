import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserNetworkService {

  constructor(private dataService: DataService, private router: Router) { }

  sendFriendRequest(data){
    return <Observable<ResponseModel>> this.dataService.postData('UserNetwork/sendFriendRequest', data);
  }

  getAddFriendRequestList(userid){
    return <Observable<ResponseModel>> this.dataService.getData('UserNetwork/getAddFriendRequestList?userid='+userid);
  }

  actionOnFriendRequest(data){
    return <Observable<ResponseModel>> this.dataService.postData('UserNetwork/actionOnFriendRequest', data);
  }
  
  userFriendList(userId){
    return <Observable<ResponseModel>> this.dataService.getData('UserNetwork/userFriendList?userId='+userId);
  }

  userPendingRequestList(userId){
    return <Observable<ResponseModel>> this.dataService.getData('UserNetwork/userPendingRequestList?userId='+userId);
  }

  cancelFriendRequest(userId){
    return <Observable<ResponseModel>> this.dataService.getData('UserNetwork/cancelFriendRequest?userId='+userId);
  }

  GetAllUserInNetwork(userId){
    return <Observable<ResponseModel>> this.dataService.getData('UserNetwork/GetAllUserInNetwork?userId='+userId);
  }


  cancelSendFriendRequest(data){
    return <Observable<ResponseModel>> this.dataService.postData('UserNetwork/cancelSendFriendRequest', data);
  }

  unfriend(data){
    return <Observable<ResponseModel>> this.dataService.postData('UserNetwork/unfriend', data);
  }

  SearchUserByText(data){
    return <Observable<ResponseModel>> this.dataService.postData('UserNetwork/SearchUserByText', data);
  }


}
