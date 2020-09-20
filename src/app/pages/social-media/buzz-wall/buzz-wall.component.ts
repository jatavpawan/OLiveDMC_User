import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/model/ResponseModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { UserPostService } from 'src/app/providers/UserPostService/user-post.service';
import * as moment from 'moment';
import { UserPersonalInfoService } from 'src/app/providers/UserPersonalInfoService/user-personal-info.service';
import { DatePipe } from '@angular/common';
import { OfferAdsService } from 'src/app/providers/OfferAdsService/offer-ads.service';
declare var $: any;

@Component({
  selector: 'app-buzz-wall',
  templateUrl: './buzz-wall.component.html',
  styleUrls: ['./buzz-wall.component.css']
})
export class BuzzWallComponent implements OnInit {

  apiendpoint: string = environment.apiendpoint;
  userId: number = 0;
  allPost: Array<any> = [];
  postCommentForm: FormGroup;
  currentAddPostTab: string = "update-status-tab"
  fileUploaded: boolean = false;
  // galleryfiles: Array<any> = [];
  imageFiles: any;
  uploadFileUrls: Array<any> = [];
  userPostImgSrcPath: string = '';
  readMorePost: any;
  initLoadCommentInPost : number;
  file: any;
  previewUrl:any = null;
  infiniteLoader: boolean =  true;
  pageNo: number =  0;
  editfileUploaded: boolean = false;
  buzzWallLoader: boolean = false;
  userLoggedinInfo: any;
  userPersonalInfoForm: FormGroup;
  aboutMeForm: FormGroup;
  userPersonalInfo: any;
  offerAdsList: Array<any> = [];
  profileImgsrcpath: string = '';
  offerAdsImgSrcPath: string = '';


  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private userPostService: UserPostService,
    private dialog: MatDialog,
    private userPersonalInfoService: UserPersonalInfoService,
    private datePipe: DatePipe,
    private offerAdsService: OfferAdsService,

  ) {

    this.offerAdsImgSrcPath = environment.apiendpoint + 'Uploads/OfferAds/image/';
    this.userPostImgSrcPath = environment.apiendpoint + 'Uploads/UserPost/image/';
    this.profileImgsrcpath = this.apiendpoint + 'Uploads/SocialMedia/UserProfilePic/image/';

    this.postCommentForm = this.formBuilder.group({
      comment: ['', Validators.required],
    })

    this.userPersonalInfoForm = this.formBuilder.group({
      userId: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      birthday: ['', Validators.required],
      occupation: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
    })

    this.aboutMeForm = this.formBuilder.group({
      userId: [0],
      aboutDescription: ['', Validators.required],
    })

    if (this.authService.isLoggedIn()) {
      debugger;
      this.userLoggedinInfo = JSON.parse(this.authService.getUserdata());
      this.userPersonalInfoForm.get('userId').setValue(this.userLoggedinInfo.id);
      this.userPersonalInfoForm.get('firstName').setValue(this.userLoggedinInfo.firstName);
      this.userPersonalInfoForm.get('lastName').setValue(this.userLoggedinInfo.lastName);
      this.userPersonalInfoForm.get('email').setValue(this.userLoggedinInfo.emailId);
      this.userPersonalInfoForm.get('mobile').setValue(this.userLoggedinInfo.mobileNo);
      this.aboutMeForm.get('userId').setValue(this.userLoggedinInfo.id);

      this.GetUserPersonalInfoByUserId(this.userLoggedinInfo.id);

    }

  }

  ngOnInit(): void {
    this.GetAllOfferAdsByPageId(2007);
    this.GetAllUserPostByUserId()
  }

  submitUserPersonalInfo() {
    debugger;
    this.userPersonalInfoService.AddUpdateUserPersonalInfo(this.userPersonalInfoForm.value).subscribe(resp => {
      if (resp.status == Status.Success) {
        Swal.fire('', resp.message, 'success');
        this.resetUserPersonalInfoForm();
        $("#personal-info").modal('hide');
        this.GetUserPersonalInfoByUserId(this.userLoggedinInfo.id);

      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
        $("#personal-info").modal('hide');
      }
      this.spinner.hide();
    })
  }

  AddUpdateUserAboutDescription() {
    debugger;

    this.userPersonalInfoService.AddUpdateUserAboutDescription(this.aboutMeForm.value).subscribe(resp => {
      if (resp.status == Status.Success) {
        Swal.fire('', resp.message, 'success');
        $("#about-modal").modal('hide');
        this.resetAboutMeForm();
        this.GetUserPersonalInfoByUserId(this.userLoggedinInfo.id);
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })
  }


  GetUserPersonalInfoByUserId(userId) {
    debugger;
    this.userPersonalInfoService.GetUserPersonalInfoByUserId(userId).subscribe(resp => {
      if (resp.status == Status.Success) {
        this.userPersonalInfo = resp.data;

      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })
  }

  GetAllUserPostByUserId() {
    debugger;
    this.spinner.show();
    this.buzzWallLoader = true;
    this.userPostService.GetAllUserPostByUserId(this.userLoggedinInfo.id).subscribe(resp => {
      this.spinner.hide();
      this.buzzWallLoader =  false;
      if (resp.status == Status.Success) {
        this.allPost = resp.data;
        if (this.allPost != undefined && this.allPost.length != 0) {
          this.allPost.map(post => {

            if(post?.profileImg != null){
              post.shortUserName = post.userFirstName[0] + post.userLastName[0]     
            }
            if (post.updatedDate != null) {
              post.postTimeFromNow = moment(post.updatedDate).fromNow();
            }
            else {
              post.postTimeFromNow = moment(post.createdDate).fromNow();
            }

            if(post.commentcount >= 1 ){
              post.commentList.map(comment => {
                if(comment?.commentUserProfileImg != null){
                  comment.shortUserName = comment.commentUserFirstName[0] + comment.commentUserLastName[0];     
                }
                if (comment.updatedDate != null) {
                  comment.postTimeFromNow = moment(comment.updatedDate).fromNow();
                }
                else {
                  comment.postTimeFromNow = moment(comment.createdDate).fromNow();
                }
    
              })
            }
            return post;
          })
        }
      }
      else {
        Swal.fire('Oops...', resp.error, 'error');
      }
    })
  }


  UserReactionOnPost(post, reaction_id?, postType?:string) {
    debugger
    let ReactionStatus = !post.reactionStatus;
    
      let index: number =  this.allPost.findIndex(item => item.id == post.id);
      if(index != -1){
        this.allPost[index].reactionStatus = ReactionStatus;
  
        ReactionStatus == false ?  this.allPost[index].likecount = this.allPost[index].likecount -1 :  this.allPost[index].likecount = this.allPost[index].likecount +1;
      }
    

    let obj:any = {
      postId: post.id,
      UserId: this.userLoggedinInfo.id,
      ReactionStatus: ReactionStatus,

    }
    if(ReactionStatus == true){
      obj.ReactionId=  reaction_id;
    }
    
    this.userPostService.userReactOnPost(obj).subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success) {
        console.log('Your Post Reaction  has been saved.')
        // Swal.fire(
        //   'like!',
        //   'Your Post Reaction  has been saved.',
        //   'success'
        // )
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }

  UserCommentOnPost(post, comment, postType?:string) {
    debugger

    if(comment.value != "" ){
      let obj:any = {
        postId: post.id,
        UserId: this.userLoggedinInfo.id,
        Comment: comment.value
      }

      this.postCommentForm.get('comment').setValue('');
      this.userPostService.userCommentOnPost(obj).subscribe(resp => {
        comment.value == "";
        this.spinner.hide();
        if (resp.status == Status.Success) {

            this.GetAllUserPostByUserId();
          console.log('Your Post Comment  has been saved.')
        }
        else {
          Swal.fire('Oops...', resp.message, 'error');
        }
      })
    }
    
  }

  UserShareOnPost(post) {
     
  }

  initialLoadCommentOnPost(post){
    this.initLoadCommentInPost = post.id;
  }

  reactOnPostComment(comment, reaction_id,postType?:string){
    debugger;
    let ReactionStatus = !comment.userCommentReactionStatus;

      let postIndex: number =  this.allPost.findIndex(item => item.id == comment.postId);
      if(postIndex != -1){
        let commentIndex: number =  this.allPost[postIndex].commentList.findIndex(item => item.id == comment.id);
        if(commentIndex != -1){
          this.allPost[postIndex].commentList[commentIndex].userCommentReactionStatus = ReactionStatus;
          let currentReactionCount:number =  this.allPost[postIndex].commentList[commentIndex].reactionCount;
          ReactionStatus == false ?  --currentReactionCount :  ++currentReactionCount;
          this.allPost[postIndex].commentList[commentIndex].reactionCount =  currentReactionCount;
        }
      }   

   
    let obj:any = {
      postId: comment.postId,
      commentId: comment.id,
      UserId: this.userLoggedinInfo.id,
      ReactionStatus: ReactionStatus,
      reactionId : reaction_id

    }
    this.userPostService.reactOnPostComment(obj).subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success) {
        console.log('Your Post Comment Reaction  has been saved.')
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })


  }


  
  resetUserPersonalInfoForm() {
    this.userPersonalInfoForm.setValue({
      userId: this.userLoggedinInfo.id,
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      birthday: '',
      occupation: '',
      country: '',
      state: '',
      city: '',
    })
  }

  resetAboutMeForm() {
    this.aboutMeForm.setValue({
      userId: this.userLoggedinInfo.id,
      aboutDescription: '',
    })

  }

  editPersonalInfo() {
    debugger
    if (this.userPersonalInfo != undefined) {
      this.userPersonalInfoForm.setValue({
        userId: this.userLoggedinInfo.id,
        firstName: this.userPersonalInfo.firstName,
        lastName: this.userPersonalInfo.lastName,
        email: this.userPersonalInfo.email,
        mobile: this.userPersonalInfo.mobile,
        // birthday:  this.userPersonalInfo.birthday,
        birthday: this.datePipe.transform(this.userPersonalInfo.birthday, 'yyyy-MM-dd'),
        occupation: this.userPersonalInfo.occupation,
        country: this.userPersonalInfo.country,
        state: this.userPersonalInfo.state,
        city: this.userPersonalInfo.city,
      })
    }
  }

  GetAllOfferAdsByPageId(pageId) {
    debugger;
    this.spinner.show();
    this.offerAdsService.GetAllOfferAdsByPageId(pageId).subscribe(resp => {
      if (resp.status == Status.Success) {
        this.offerAdsList = resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })
  }


}

