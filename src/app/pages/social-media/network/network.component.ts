import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/model/ResponseModel';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';
import { UserNetworkService } from 'src/app/providers/UserNetworkService/user-network.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {

  apiendpoint: string = environment.apiendpoint;
  userId: number = 0;
  userPersonalInfo: any;
  profileImgsrcpath: string;
  userLoggedinInfo: any;
  infiniteLoader: boolean =  true;
  pageNo: number =  0;
  userList: Array<any> = [];
  userFriends: Array<any> = [];
  friendRequestList: Array<any> = [];
  pendingRequestList: Array<any> = [];
  friendSuggestionLoader: boolean = false;
  pendingRequestLoader: boolean = false;
  friendRequestLoader: boolean = false;
  friendListLoader: boolean = false;
  coverImgsrcpath: string = '';
  userSearchForm: FormGroup;
  searchUserList: Observable<any[]>;

  constructor(
    private authService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private userNetworkService: UserNetworkService,
    private formBuilder: FormBuilder,

  ) {

    this.coverImgsrcpath = this.apiendpoint + 'Uploads/SocialMedia/UserCoverImage/image/';
    this.profileImgsrcpath = this.apiendpoint + 'Uploads/SocialMedia/UserProfilePic/image/';

    if (this.authService.isLoggedIn()) {
      debugger;
      this.userLoggedinInfo = JSON.parse(this.authService.getUserdata());
    }

    this.userSearchForm = this.formBuilder.group({
      searchUser  : [''],
    });

  }

  ngOnInit(): void {

    this.searchUserList = this.userSearchForm.get("searchUser").valueChanges.pipe(
      startWith(""),
      debounceTime(400),
      switchMap((val) => {
        debugger;
        if (val.length >= 1) {
          return this.searchUserByText(val);
        } else {
          return [];
        }
      })
    );




    this.GetAllUserInNetwork();
    this.getAddFriendRequestList();
    this.userFriendList();
    this.userPendingRequestList();
  }



  TabClicked(tabValue) {
    debugger;
    if (tabValue == 'network') {
      this.GetAllUserInNetwork();
      this.getAddFriendRequestList();
      this.userFriendList();
      this.userPendingRequestList();
    }
    else if (tabValue == 'friends_request') {
      this.getAddFriendRequestList();
    }
    else if (tabValue == 'user_friends') {
      this.userFriendList();
    }
    else if (tabValue == 'pending_request') {
      this.userPendingRequestList();
    }

  }
  GetAllUserInNetwork(){

    debugger;
    this.friendSuggestionLoader = true;
    this.userNetworkService.GetAllUserInNetwork(this.userLoggedinInfo.id).subscribe(resp => {
      this.friendSuggestionLoader = false;

      if (resp.status == Status.Success) {
        this.userList =  resp.data;
        if(this.userList !=  undefined && this.userList.length !=0 ){
          this.userList =   this.userList.map(user =>{
            user.sendRequest = false; 
            return user;
          })
        }
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }

  sendFriendRequest(friendId){

    debugger;
    let obj ={
      UserId: this.userLoggedinInfo.id,
      RequestFriendId: friendId,
    }  
    
    this.userNetworkService.sendFriendRequest(obj).subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success) {

        let userIndex =  this.userList.findIndex(user =>  user.id == friendId );
        this.userList[userIndex].sendRequest = true;

        this.userPendingRequestList();

        console.log(resp.message);
        Swal.fire('Request!', resp.message,'success'); 

      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }


  cancelSendRequest(friendId){

    debugger;
    let obj ={
      UserId: this.userLoggedinInfo.id,
      RequestFriendId: friendId,
    }  
    
    // this.userNetworkService.cancelSendRequest(obj).subscribe(resp => {
    //   this.spinner.hide();
    //   if (resp.status == Status.Success) {

    //     let userIndex =  this.userList.findIndex(user =>  user.id == friendId );
    //     this.userList[userIndex].sendRequest = true;

    //     console.log(resp.message);
    //     Swal.fire('Request!', resp.message,'success'); 

    //   }
    //   else {
    //     Swal.fire('Oops...', resp.message, 'error');
    //   }
    // })
  }

  getAddFriendRequestList(){

    debugger;
    this.friendRequestLoader =  true;
    this.userNetworkService.getAddFriendRequestList(this.userLoggedinInfo.id).subscribe(resp => {
      this.friendRequestLoader =  false;
      if (resp.status == Status.Success) {
        this.friendRequestList =  resp.data;
        console.log("");

      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }

  actionOnFriendRequest(requestId, action){

    debugger;

    let obj ={
      UserId: this.userLoggedinInfo.id,
      Id: requestId,
      Status: action
    }  

    this.userNetworkService.actionOnFriendRequest(obj).subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success) {
        let requestIndex =   this.friendRequestList.findIndex(request =>  request.id == requestId );
         this.friendRequestList.splice(requestIndex,1); 
         Swal.fire('Add Friend!', resp.message,'success'); 
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }

  userFriendList(){

    debugger;
    this.friendListLoader =  true;
    this.userNetworkService.userFriendList(this.userLoggedinInfo.id).subscribe(resp => {
      this.friendListLoader =  false;
      if (resp.status == Status.Success) {
        this.userFriends =  resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }

  userPendingRequestList(){

    debugger;
    this.pendingRequestLoader = true;
    this.userNetworkService.userPendingRequestList(this.userLoggedinInfo.id).subscribe(resp => {
      this.pendingRequestLoader =  false;
      if (resp.status == Status.Success) {
        this.pendingRequestList =  resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }

  cancelFriendRequest(friend){

    debugger;

    this.userNetworkService.cancelFriendRequest(friend).subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success) {
        this.pendingRequestList =  resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }

  
resetSearchUser() {
  this.userSearchForm.get('searchUser').setValue("")
  // this.allCategoryBlog();
}

displayUserProperty(value) {
  if (value) {
    return value.title;
  }
}

onUserSelectionChange(event){
  debugger;
  console.log('onSelectionChange called', event.option.value);
  // this.showBlogPriorityList =  [];
  // this.showBlogPriorityList.push(event.option.value);
  // this.infiniteLoader = false;
}



searchUserByText(val: string): Observable<any[]> {
  debugger;
  let obj = {
    PageNo: 0,
    Text: val,
    UserId: this.userLoggedinInfo.id
    
  };

  return this.userNetworkService.SearchUserByText(obj).pipe(
    map((response) => {
      if(response.data.length == 0){
        return [ { id: 0 , title: "Matching Not Found"} ];
      }
      else{
        return response.data;
      }
      
    })
  );
}


}

