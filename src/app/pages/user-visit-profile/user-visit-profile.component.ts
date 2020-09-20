import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/model/ResponseModel';
import { BannerService } from 'src/app/providers/BannerService/banner.service';
import * as $ from 'jquery';
import { UserPersonalInfoService } from 'src/app/providers/UserPersonalInfoService/user-personal-info.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';
import { DatePipe } from '@angular/common';
import { OfferAdsService } from 'src/app/providers/OfferAdsService/offer-ads.service';
import { UserGalleryService } from 'src/app/providers/UserGalleryService/user-gallery.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPostDialogComponent } from '../add-post-dialog/add-post-dialog.component';
import { UserPostService } from 'src/app/providers/UserPostService/user-post.service';
import * as moment from 'moment';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { BlogCategoryService } from 'src/app/providers/BlogCategoryService/blog-category.service';
import { UserNetworkService } from 'src/app/providers/UserNetworkService/user-network.service';
import { ActivatedRoute } from '@angular/router';
// import { ShareSocialMediaComponent } from '../share-social-media/share-social-media.component';

declare var $: any;

@Component({
  selector: 'app-user-visit-profile',
  templateUrl: './user-visit-profile.component.html',
  styleUrls: ['./user-visit-profile.component.css']
})
export class UserVisitProfileComponent implements OnInit {

  bannerImgsrcpath: string = "";
  bannerDetail: any;
  apiendpoint: string = environment.apiendpoint;
  userId: number = 0;
  userPersonalInfo: any;
  profileImageUrl: any = null;
  socialImgsrcpath: string = "";
  coverImgsrcpath: string;
  profileImgsrcpath: string;
  allGallery: Array<any> = [];
  galleryImgsrcpath: string = '';
  galleryDetail: any;
  editGalleryAction: boolean = false;
  editGalleryImg: string = '';
  profileImagefile: any;
  profileImageUploaded: boolean = false;
  coverImageUrl: any = null;
  allPost: Array<any> = [];
  LoggedInUserPosts: Array<any> = [];
  userPersonalInfoForm: FormGroup;
  aboutMeForm: FormGroup;
  photoGalleryForm: FormGroup;
  postCommentForm: FormGroup;
  galleryCommentForm: FormGroup;
  userLoggedinInfo: any;
  currentAddPostTab: string = "update-status-tab"
  offerAdsList: Array<any> = [];
  offerAdsImgSrcPath: string = '';
  fileUploaded: boolean = false;
  galleryfiles: File[] = [];
  imageFiles: any;
  uploadFileUrls: Array<any> = [];
  userPostImgSrcPath: string = '';
  readMorePost: any;
  initLoadCommentInPost : number;
  initLoadCommentInGallery: number;
  blogForm: FormGroup;
  file: any;
  previewUrl:any = null;
  submitBlogForm: boolean =  false; 
  tinymceConfig: any;
  characterCount:number = 0;
  blogFile: any;
  BlogFileUploaded: boolean =  false;
  categories: Array<any> = [];
  infiniteLoader: boolean =  true;
  pageNo: number =  0;
  blogList: Array<any> = [];
  blogimgsrcpath: string = '';
  edit_blog: boolean = false;
  blogId: string = '0';
  editfileUploaded: boolean = false;
  userList: Array<any> = [];
  userFriends: Array<any> = [];
  friendRequestList: Array<any> = [];
  pendingRequestList: Array<any> = [];
  galleryLoader: boolean = false;
  buzzWallLoader: boolean = false;
  myPostLoader: boolean = false;
  blogLoader: boolean = false;
  friendSuggestionLoader: boolean = false;
  pendingRequestLoader: boolean = false;
  friendRequestLoader: boolean = false;
  friendListLoader: boolean = false;
  userPostCount:any = 0;
  userFriendCount:any = 0;
  videoUrlInGallery: Array<any> = [];
  videoNameInGallery: Array<any> = [];
  visitUserId: any;
  userVisitCount: any = 0;

  constructor(
    private shareService: ShareService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
    private userPersonalInfoService: UserPersonalInfoService,
    private userGalleryService: UserGalleryService,
    private datePipe: DatePipe,
    private offerAdsService: OfferAdsService,
    private userPostService: UserPostService,
    private dialog: MatDialog,
    private blogService: BlogService,
    private categoryService: BlogCategoryService,
    private userNetworkService: UserNetworkService,
    private activatedRoute: ActivatedRoute,
  ) {

    this.activatedRoute.params.subscribe(param =>{
      debugger;
      this.visitUserId = param.userId;
    })

    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(false);
    this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';
    this.coverImgsrcpath = this.apiendpoint + 'Uploads/SocialMedia/UserCoverImage/image/';
    this.profileImgsrcpath = this.apiendpoint + 'Uploads/SocialMedia/UserProfilePic/image/';
    this.offerAdsImgSrcPath = environment.apiendpoint + 'Uploads/OfferAds/image/';
    this.userPostImgSrcPath = environment.apiendpoint + 'Uploads/UserPost/image/';
    this.blogimgsrcpath = this.apiendpoint + 'Uploads/Blog/image/';


    // this.blogForm = this.formBuilder.group({
    //   userId: [0],
    //   title: ['', Validators.required],
    //   description: ['', Validators.required],
    //   category: ['0', Validators.required],
    //   featuredImage: [''],
    //   shortDescription: [''],
    //   approvalStatus: [false],
    //   status: [false],
    // })


    this.photoGalleryForm = this.formBuilder.group({
      userId: [0],
      title: [''],
      gallery: [''],
    })
    this.postCommentForm = this.formBuilder.group({
      comment: ['', Validators.required],
    })
    this.galleryCommentForm = this.formBuilder.group({
      comment: ['', Validators.required],
    })

    if (this.authService.isLoggedIn()) {
      debugger;
      this.userLoggedinInfo = JSON.parse(this.authService.getUserdata());
      // this.blogForm.get('userId').setValue(this.userLoggedinInfo.id);

      this.GetUserPersonalInfoByUserId(this.visitUserId);
    }
    this.galleryImgsrcpath = this.apiendpoint + 'Uploads/UserGallery/image/';


  }

  ngOnInit(): void {
    $(document).ready(function () {
      $(".delete-video, .delete-photos").click(function () {
        $(".events-main, .evnts-video-main").fadeOut("slow");
      });

      $(".add-blogs-hide").click(function () {
        $(".blogs-tab-main").fadeOut();
      });

      $(".remove-image").click(function () {
        $(".user-img-list").fadeOut();
      });

    });


    this.getBannerDetail(2007);
    this.GetAllOfferAdsByPageId(2007);
    this.GetAllUserPostByUserId();
    // this.GetLoggedInUserFriendPost();
  }


  getBannerDetail(pageId) {
    debugger;
    this.bannerService.GetBannerDetailByPageId(pageId).subscribe(resp => {
      if (resp.status == Status.Success) {
        this.bannerDetail = resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })
  }


  GetUserPersonalInfoByUserId(visitUserId) {
    debugger;
    this.userPersonalInfoService.GetUserPersonalInfoByUserId(visitUserId).subscribe(resp => {
      if (resp.status == Status.Success) {
        this.userPersonalInfo = resp.data;
        console.log("this.userPersonalInfo", this.userPersonalInfo);

        this.userPersonalInfo != undefined ? this.userPostCount = this.userPersonalInfo.postCount : this.userPostCount = 0;
        this.userPersonalInfo != undefined ? this.userFriendCount = this.userPersonalInfo.friendCount : this.userFriendCount = 0;
        this.userPersonalInfo != undefined ? this.userVisitCount = this.userPersonalInfo.visitCount : this.userVisitCount = 0;
        if (this.userPersonalInfo.coverImage != undefined) {
          this.coverImageUrl = this.coverImgsrcpath + this.userPersonalInfo.coverImage;
        }
        if (this.userPersonalInfo.profileImg != undefined) {
          this.profileImageUrl = this.profileImgsrcpath + this.userPersonalInfo.profileImg;
        }
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })
  }

  // AddUpdateUserProfileImage() {
  //   debugger;
  //   let formData = new FormData();
  //   formData.append('UserId', this.userPersonalInfoForm.get('id').value);
  //   formData.append('ProfileImg', this.profileImagefile);

  //   this.userPersonalInfoService.AddUpdateUserProfileImage(formData).subscribe(resp => {
  //     if (resp.status == Status.Success) {
  //       this.shareService.userLOggedInAction(true);
  //     }
  //     else {
  //       Swal.fire('Oops...', resp.error, 'error');
  //     }
  //     this.spinner.hide();
  //   })
  // }

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

  // uploadPhotos(file) {

  //   debugger;

  //   let imageArray:any = file.files;

  //   for (let index = 0; index < imageArray.length; index++) {
  //     const element = imageArray[index];
  //     console.log("element", element);

  //     let files =  element;

  //     var mimeType = files.type;
  //     if (mimeType.match(/image\/*/) == null) {
  //       this.changeVideo(files);
  //     }
  //     else{
  //       let reader = new FileReader();      
  //       reader.readAsDataURL(files); 
  //       reader.onload = (_event) => { 
  //         this.uploadFileUrls.push(reader.result); 
  //       }
  //       this.galleryfiles.push(files);
  //     }
  //   }
  //   this.fileUploaded = true;
  // }

  // addUpdateGallery() {
  //   debugger;
  //   let formData = new FormData();
  //   formData.append('UserId', this.userLoggedinInfo.id);
  //   formData.append('Title', "Adventure trip");
  //   if ((this.editGalleryAction == false) || (this.editGalleryAction == true && (this.galleryfiles == undefined && this.galleryfiles.length !=0) )) {
  //     this.galleryfiles.forEach(file => {
  //       formData.append('Gallery', file);
  //     });
  //   }
  //   else {
  //     formData.append('Gallery', null);
  //   }

  //   this.userGalleryService.AddUpdateUserGallery(formData).subscribe(resp => {
  //     this.uploadFileUrls = [];
  //     this.galleryfiles = [];
  //     this.photoGalleryForm.get('gallery').setValue('');
  //     if (resp.status == Status.Success) {
  //       Swal.fire('', resp.message, 'success');
  //       this.GetAllUserGalleryByUserId();

  //     }
  //     else {
  //       Swal.fire('Oops...', resp.error, 'error');
  //     }
  //     this.spinner.hide();
  //   })
  // }


  GetAllUserGalleryByUserId() {
    debugger;
    // this.spinner.show();
      this.galleryLoader =  true;
    
    this.userGalleryService.GetAllUserGalleryByUserId(this.visitUserId).subscribe(resp => {
      debugger;
      this.galleryLoader = false;
      this.spinner.hide();
      if (resp.status == Status.Success) {
        this.allGallery = resp.data;
        if (this.allGallery != undefined && this.allGallery.length != 0) {
          this.allGallery.map(gallery => {

            if(gallery?.profileImg != null){
              // let wordArray: Array<string> = gallery.userName.split(" ");  
              // gallery.shortUserName = wordArray[0][0] + wordArray[wordArray.length -1][0];     
              gallery.shortUserName = gallery.userFirstName[0] + gallery.userLastName[0];     
            }
            if (gallery.updatedDate != null) {
              gallery.postTimeFromNow = moment(gallery.updatedDate).fromNow();
            }
            else {
              gallery.postTimeFromNow = moment(gallery.createdDate).fromNow();
            }

            if(gallery.commentcount >= 1 ){
              gallery.commentList.map(comment => {
                if(comment?.commentUserProfileImg != null){
                  // let wordArray: Array<string> = comment.commentUserName.split(" ");  
                  // comment.shortUserName = wordArray[0][0] + wordArray[wordArray.length -1][0];     
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
            return gallery;
          })
        }

        if(this.galleryDetail != null && this.allGallery != null){
          debugger;
          let galleryindex = this.allGallery.findIndex(gallery => gallery.id == this.galleryDetail.id);
          if(galleryindex != -1)
            this.galleryDetail.commentList = this.allGallery[galleryindex].commentList; 
        }
      }
      else {
        Swal.fire('Oops...', resp.error, 'error');
      }
    })

  }

  GetAllUserPostByUserId() {
    debugger;
    this.spinner.show();
    this.buzzWallLoader = true;
    this.userPostService.GetAllUserPostByUserId(this.visitUserId).subscribe(resp => {
      this.spinner.hide();
      this.buzzWallLoader =  false;
      if (resp.status == Status.Success) {
        this.allPost = resp.data;
        if (this.allPost != undefined && this.allPost.length != 0) {
          this.allPost.map(post => {

            if(post?.profileImg != null){
              console.log("post", post);
              console.log("post.userFirstName[0] + post.userLastName[0]", post.userFirstName[0] + post.userLastName[0]);
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


  GetLoggedInUserFriendPost() {
    debugger;
    this.spinner.show();
    this.buzzWallLoader = true;
    this.userPostService.GetLoggedInUserFriendPost(this.visitUserId).subscribe(resp => {
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

  GetLoggedInUserPost() {
    debugger;
    this.spinner.show();
    this.myPostLoader = true;
    this.userPostService.GetLoggedInUserPost(this.visitUserId).subscribe(resp => {
      this.spinner.hide();
       this.myPostLoader = false;
      if (resp.status == Status.Success) {
        this.LoggedInUserPosts = resp.data;
        if (this.LoggedInUserPosts != undefined && this.LoggedInUserPosts.length != 0) {
          this.LoggedInUserPosts.map(post => {

            if(post?.profileImg != null){
              // let wordArray: Array<string> = post.userName.split(" ");  
              // post.shortUserName = wordArray[0][0] + wordArray[wordArray.length -1][0];
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
                  // let wordArray: Array<string> = comment.commentUserName.split(" ");  
                  // comment.shortUserName = wordArray[0][0] + wordArray[wordArray.length -1][0];     
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

  TabClicked(tabValue) {
    debugger;
    if (tabValue == 'gallery') {
      this.GetAllUserGalleryByUserId();
    }
    else if (tabValue == 'profile') {
      this.GetAllUserPostByUserId();
    }
    else if (tabValue == 'userPost') {
      this.GetLoggedInUserPost();
    }
    else if (tabValue == 'blogs') {
      this.userPostBlog();
      // this.GetAllCategory();
    }
    else if (tabValue == 'Scrap_books') {
      // this.GetAllCategory();
    }
    else if (tabValue == 'network') {
      this.userFriendList();
    }
    else if (tabValue == 'user_friends') {
      this.userFriendList();
    }
  }

  

  changeVideo(file){
    debugger;
    // let oldVideoName: string = this.videoNameInGallery;
    let files = file;
    if(files.size <= 10485760 && files.type == "video/mp4"){
      console.log(`video size is : ${files.size/1048576}MB`)
      const  formdata = new FormData();
      formdata.append("fileInfo", files);
      this.spinner.show();
      this.userGalleryService.videoUploadInUserGallery(formdata).subscribe(resp=>{
        this.spinner.hide();
        if(resp.status == Status.Success){

          this.videoUrlInGallery.push(this.apiendpoint+"Uploads/UserGallery/Video/"+resp.data); 
          this.videoNameInGallery.push(resp.data); 
          // this.videoNameInGallery = resp.data;
          // if(oldVideoName != ""){
          //   this.deleteVideoInGallery(oldVideoName)
          // }
        }

      })
    }
    else{
      // this.interviewForm.get('video').setValue(null);
    files.size > 10485760 &&  Swal.fire('Upload Failed',"Video Size Exceed To 10MB",'warning');
    files.type != "video/mp4" &&  Swal.fire('Upload Failed',"Only MP4 video And Image is supported",'warning');
    }
    
  }

  
  // deleteVideoInGallery(oldVideoName:string){
  //   debugger;
  //   this.userGalleryService.deleteVideoInUserGallery(oldVideoName).subscribe(resp=>{
  //     if(resp.status == Status.Success){
  //        console.log("Gallery Video Delete Successfully ");
  //     }
  //   })  
  // }

  openGalleryDialog(gallery) {
    debugger;
    this.galleryDetail = gallery;
  }


  uploadPhotosCloseDialog() {
    this.editGalleryAction = false;
  }

  // openAddPostDialog(userPost?) {
  //   debugger;
  //   let dialogObj: any = {
  //     userId: this.userLoggedinInfo.id,
  //     userPostData: userPost
  //   }

  //   const dialogRef = this.dialog.open(AddPostDialogComponent,
  //     {
  //       hasBackdrop: false,
  //       data: dialogObj,
  //       panelClass: 'my-centered-dialog',
  //       width: '550px',
  //     });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Add Post Dialog Closed result: ${result}`);
  //     if (result != undefined && result == "addUpdateUserPost") {
  //       this.GetAllUserPostByUserId();
  //     }
  //   });

  // }



  UserReactionOnPost(post, reaction_id?, postType?:string) {
    debugger
    let ReactionStatus = !post.reactionStatus;

    

    
    if(postType == 'LoggedInUserPosts'){
      let index: number =  this.LoggedInUserPosts.findIndex(item => item.id == post.id);
      if(index != -1){
        this.LoggedInUserPosts[index].reactionStatus = ReactionStatus;
  
        ReactionStatus == false ?  this.LoggedInUserPosts[index].likecount = this.LoggedInUserPosts[index].likecount -1 :  this.LoggedInUserPosts[index].likecount = this.LoggedInUserPosts[index].likecount +1;
      }
    }
    else{
      let index: number =  this.allPost.findIndex(item => item.id == post.id);
      if(index != -1){
        this.allPost[index].reactionStatus = ReactionStatus;
  
        ReactionStatus == false ?  this.allPost[index].likecount = this.allPost[index].likecount -1 :  this.allPost[index].likecount = this.allPost[index].likecount +1;
      }
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

          if(postType == 'LoggedInUserPosts'){
            this.GetLoggedInUserPost();
          }
          else{
            this.GetAllUserPostByUserId();
          }
          console.log('Your Post Comment  has been saved.')
        }
        else {
          Swal.fire('Oops...', resp.message, 'error');
        }
      })
    }
    
  }

  initialLoadCommentOnPost(post){
    this.initLoadCommentInPost = post.id;
  }
  initialLoadCommentOnGallery(gallery){
    this.initLoadCommentInGallery = gallery.id;
  }

  UserReactionOnGallery(gallery, reaction_id?) {
    debugger
    let ReactionStatus = !gallery.reactionStatus;

    let index: number =  this.allGallery.findIndex(item => item.id == gallery.id);
    if(index != -1){
      this.allGallery[index].reactionStatus = ReactionStatus;

      ReactionStatus == false ?  this.allGallery[index].likecount = this.allGallery[index].likecount -1 :  this.allGallery[index].likecount = this.allGallery[index].likecount +1;
    }   
    let obj:any = {
      galleryId: gallery.id,
      UserId: this.userLoggedinInfo.id,
      ReactionStatus: ReactionStatus,

    }
    if(ReactionStatus == true){
      obj.ReactionId=  reaction_id;
    }
    
    this.userGalleryService.userReactOnGallery(obj).subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success) {
        console.log('Your Gallery Reaction  has been saved.')
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }


  userCommentOnGallery(gallery, comment) {
    debugger;

    if(comment.value != "" ){
      let obj:any = {
        galleryId: gallery.id,
        UserId: this.userLoggedinInfo.id,
        Comment: comment.value
      }

      this.galleryCommentForm.get('comment').setValue('');
      this.userGalleryService.userCommentOnGallery(obj).subscribe(resp => {
        comment.value == "";
        this.spinner.hide();
        if (resp.status == Status.Success) {

          // this.galleryDetail = this  
          this.GetAllUserGalleryByUserId();
          console.log('Your Gallery Comment  has been saved.')
        }
        else {
          Swal.fire('Oops...', resp.message, 'error');
        }
      })
    }
    
  }

  reactOnPostComment(comment, reaction_id,postType?:string){
    debugger;
    let ReactionStatus = !comment.userCommentReactionStatus;

    if(postType == 'LoggedInUserPosts'){
      let postIndex: number =  this.LoggedInUserPosts.findIndex(item => item.id == comment.postId);
      if(postIndex != -1){
        let commentIndex: number =  this.LoggedInUserPosts[postIndex].commentList.findIndex(item => item.id == comment.id);
        if(commentIndex != -1){
          this.LoggedInUserPosts[postIndex].commentList[commentIndex].userCommentReactionStatus = ReactionStatus;
          let currentReactionCount:number =  this.LoggedInUserPosts[postIndex].commentList[commentIndex].reactionCount;
          ReactionStatus == false ?  --currentReactionCount :  ++currentReactionCount;
          this.LoggedInUserPosts[postIndex].commentList[commentIndex].reactionCount =  currentReactionCount;
        }
      }   
    }
    else{
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
    }

   
    let obj:any = {
      postId: comment.postId,
      commentId: comment.id,
      UserId: this.userLoggedinInfo.id,
      ReactionStatus: ReactionStatus,
      reactionId : reaction_id

    }
      // obj.reactionId=  reaction_id;
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


  reactOnGalleryComment(comment, reaction_id){
    debugger;
    let ReactionStatus = !comment.userCommentReactionStatus;

    let galleryIndex: number =  this.allGallery.findIndex(item => item.id == comment.galleryId);
    if(galleryIndex != -1){
      let commentIndex: number =  this.allGallery[galleryIndex].commentList.findIndex(item => item.id == comment.id);
      if(commentIndex != -1){
        this.allGallery[galleryIndex].commentList[commentIndex].userCommentReactionStatus = ReactionStatus;
        let currentReactionCount:number =  this.allGallery[galleryIndex].commentList[commentIndex].reactionCount;
        ReactionStatus == false ?  --currentReactionCount :  ++currentReactionCount;
        this.allGallery[galleryIndex].commentList[commentIndex].reactionCount =  currentReactionCount;
      }
    }   
    let obj:any = {
      galleryId: comment.galleryId,
      commentId: comment.id,
      UserId: this.userLoggedinInfo.id,
      ReactionStatus: ReactionStatus,
      reactionId : reaction_id

    }
      // obj.reactionId=  reaction_id;
    this.userGalleryService.reactOnGalleryComment(obj).subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success) {
        console.log('Your Gallery Comment Reaction  has been saved.')
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })


  }

  // preview(file) {

  //   debugger;
  //   if(this.edit_blog == true){
  //     this.editfileUploaded = true;
  //  }

  //   let blogFile = file.files[0] 
  //   var mimeType = blogFile.type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }
 
  //   var reader = new FileReader();      
  //   reader.readAsDataURL(blogFile); 
  //   reader.onload = (_event) => { 
  //     this.previewUrl = reader.result; 
  //   }

  //   this.blogFile = blogFile;  
  //   this.BlogFileUploaded = true;
  // }

  // submitBlogData(){
  //   debugger;
  //   this.submitBlogForm = false;
  //   if(this.blogForm.valid && this.blogForm.get('category').value != "0"){
  //     this.spinner.show();
  //       let formData = new FormData();
  //       this.edit_blog == true ? formData.append('Id', this.blogId) : formData.append('Id', '0'); 
  //       if( (this.edit_blog == false) || (this.edit_blog == true && this.editfileUploaded == true)){
  //         formData.append('FeaturedImage', this.blogFile);
  //       }
  //       else{
  //         formData.append('FeaturedImage', null);
  //       }
  //       formData.append('userId', this.blogForm.get('userId').value);
  //       formData.append('Title', this.blogForm.get('title').value);
  //       formData.append('Category', this.blogForm.get('category').value);
  //       formData.append('Description', this.blogForm.get('description').value);
  //       formData.append('ShortDescription', this.blogForm.get('shortDescription').value);
  //       formData.append('Status', this.blogForm.get('status').value);
  //       formData.append('ApprovalStatus', this.blogForm.get('approvalStatus').value);
  
  //       this.blogService.AddUpdateBlog(formData).subscribe(resp=>{
       
  //         if(resp.status == Status.Success){
  //           Swal.fire(
  //             'Saved!',
  //             'Your Blog has been Saved. Now Waiting For Admin Approval',
  //             'success'
  //           )

  //             this.pageNo = 0;   
  //             this.blogList = [];        
  //             this.userPostBlog();           
  //           this.blogId = '0';
  //           this.editfileUploaded = false;
  //           this.BlogFileUploaded = false;
  //           this.edit_blog = false;
  //           this.previewUrl = null;
  //           this.blogFile = undefined;
  //           this.blogForm.reset();
  //           this.resetBlogForm();
  //         }
  //         else{
  //           this.spinner.hide();
  //           Swal.fire('Oops...' ,"Something went Wrong",'warning');
  //         }  
  //       })    
  //   }
  //   else{
  //     this.submitBlogForm = true;
  //   }

  // }

  // resetBlogForm(){  
  //   this.blogForm.setValue({
  //     userId: this.userLoggedinInfo.id,
  //     title: '',
  //     category: '0',
  //     description: '',
  //     featuredImage: '',
  //     shortDescription: '',
  //     approvalStatus: false,
  //     status: false
  //   })
  // }

  // shortDescriptionCharacterCount(event): boolean{
  //   if(this.blogForm.get('shortDescription').value.length >=200  && event.keyCode != 8 ){
  //     let shortDescription:string = this.blogForm.get('shortDescription').value;
  //     this.blogForm.get('shortDescription').setValue(shortDescription.substring(0,200));
  //     this.characterCount =  this.blogForm.get('shortDescription').value.length;
  //     return false;
  //   }
  //   this.characterCount =  this.blogForm.get('shortDescription').value.length;
  //   return true;
  // }

  // GetAllCategory(){
  //   debugger;
  //   this.categoryService.GetAllBlogCategory().subscribe(resp=>{
  //     if(resp.status == Status.Success){
  //       debugger;
  //         this.categories = resp.data;
  //     } 
  //     else{
  //       Swal.fire('Oops...', resp.message, 'error');
  //     }
  //     this.spinner.hide();
  //   })    
  // }

  userPostBlog(){
    debugger;

    this.infiniteLoader = false;
    let obj = {
      UserId: this.visitUserId,
      PageNo: this.pageNo
    }

    this.blogLoader = true;

    this.blogService.userPostBlog(obj).subscribe(resp => {
      debugger;
      this.blogLoader = false;
      this.spinner.hide();
      if (resp.status == Status.Success) {
         this.blogList = [...this.blogList, ...resp.data.blogList];  
         if(resp.data.totalPage >= (this.pageNo+2)){
           this.infiniteLoader = true;
         }
         else{
          this.infiniteLoader = false;
         } 
         ++this.pageNo;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }

  
  // editBlog(blog){
  //   debugger;

  //   this.blogForm.get('userId').setValue(blog.userId);
  //   this.blogForm.get('title').setValue(blog.title);
  //   this.blogForm.get('category').setValue(blog.category);
  //   this.blogForm.get('description').setValue(blog.description);
  //   this.blogForm.get('status').setValue(blog.status);
  //   this.blogForm.get('approvalStatus').setValue(blog.approvalStatus);
  //   this.blogForm.get('shortDescription').setValue(blog.shortDescription);
   
  //   this.blogId = ''+blog.id; 
  //   this.previewUrl =  this.apiendpoint+'Uploads/Blog/image/'+blog.featuredImage;

  //   this.edit_blog = true;
  // }



  UserReactionOnBlog(blog, reaction_id?) {

    debugger
    let ReactionStatus = !blog.reactionStatus;

      let index: number =  this.blogList.findIndex(item => item.id == blog.id);
      if(index != -1){
        this.blogList[index].reactionStatus = ReactionStatus;
  
        ReactionStatus == false ?  this.blogList[index].likecount = this.blogList[index].likecount -1 :  this.blogList[index].likecount = this.blogList[index].likecount +1;
      }
    

    let obj:any = {
      blogId: blog.id,
      UserId: this.userLoggedinInfo.id,
      ReactionStatus: ReactionStatus,
      ReactionId:  reaction_id
    }
    
    this.blogService.userReactOnBlog(obj).subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success) {
        console.log('Your Blog Reaction  has been saved.')
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }


  // GetAllUserPersonalInfo(){

  //   debugger
  //   this.userPersonalInfoService.GetAllUserPersonalInfo().subscribe(resp => {
  //     this.spinner.hide();
  //     if (resp.status == Status.Success) {
  //       this.userList =  resp.data;
  //       if(this.userList !=  undefined && this.userList.length !=0 ){
  //         this.userList =   this.userList.map(user =>{
  //           user.sendRequest = false; 
  //           return user;
  //         })
  //       }
  //     }
  //     else {
  //       Swal.fire('Oops...', resp.message, 'error');
  //     }
  //   })
  // }

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
        this.userList.splice(userIndex, 1);

        console.log(resp.message);
        Swal.fire('Request!', resp.message,'success'); 

      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }




  userFriendList(){

    debugger;
    this.friendListLoader =  true;
    this.userNetworkService.userFriendList(this.visitUserId).subscribe(resp => {
      this.friendListLoader =  false;
      if (resp.status == Status.Success) {
        this.userFriends =  resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }


  cancelSendFriendRequest(requestFriendId){

    debugger;
    let obj ={
      UserId: this.userLoggedinInfo.id,
      SendRequestFriendId: requestFriendId,
    }  

    this.userNetworkService.cancelSendFriendRequest(obj).subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success) {
        let requestIndex = this.pendingRequestList.findIndex(request => request.requestFriendId == requestFriendId);
        if(requestIndex != -1){
          this.pendingRequestList.splice(requestIndex, 1);
        }
        Swal.fire('Cancel Request!', resp.message,'success'); 
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }


  
  ngOnDestroy() {
    // if(this.videoNameInGallery != "" && this.editGalleryAction == false){
    //   this.deleteVideoInGallery(this.videoNameInGallery);
    // }
    this.increamentInVisitCount()

  }

  increamentInVisitCount(){

    this.userPersonalInfoService.increamentInVisitCount(this.visitUserId).subscribe(resp => {
      if (resp.status == Status.Success) {
        console.log("something went wrong in user prodile visit increment");
      }
      else {
        console.log("something went wrong in user prodile visit increment");
      }
    })
  }


  // removeUploadImageFromGallery(uploadFileUrl){
  //   debugger;
  //   let ImageIndex = this.uploadFileUrls.findIndex( item => item ==uploadFileUrl );

  //   if(ImageIndex != -1){
  //     this.uploadFileUrls.splice(ImageIndex,1);
  //     this.galleryfiles.splice(ImageIndex,1);
  //   }
  // }


  // openShareModal(sharedata){
  //   debugger;
    // const dialogRef = this.dialog.open(ShareSocialMediaComponent,
    //   {
    //     hasBackdrop: false,
    //     data: sharedata,
    //     panelClass: 'my-centered-dialog',
    //     width: '550px',
    //   });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Share Social Media Dialog result: ${result}`);
    // });
  // }
  

}

