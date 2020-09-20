import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/model/ResponseModel';
import * as $ from 'jquery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';
import { UserGalleryService } from 'src/app/providers/UserGalleryService/user-gallery.service';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  apiendpoint: string = environment.apiendpoint;
  userId: number = 0;
  userPersonalInfo: any;
  allGallery: Array<any> = [];
  galleryImgsrcpath: string = '';
  galleryDetail: any;
  editGalleryAction: boolean = false;
  editGalleryImg: string = '';
  photoGalleryForm: FormGroup;
  fileUploaded: boolean = false;
  // galleryfiles: Array<any> = [];
  galleryfiles: File[] = [];
  imageFiles: any;
  uploadFileUrls: Array<any> = [];
  file: any;
  previewUrl:any = null;
  infiniteLoader: boolean =  true;
  pageNo: number =  0;
  editfileUploaded: boolean = false;
  galleryLoader: boolean = false;
  galleryCommentForm: FormGroup;
  userLoggedinInfo: any;
  initLoadCommentInGallery: number;
  profileImgsrcpath: string = '';


  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private userGalleryService: UserGalleryService,
    private dialog: MatDialog,
  ) {


    this.photoGalleryForm = this.formBuilder.group({
      userId: [0],
      title: [''],
      gallery: [''],
    })
    this.galleryCommentForm = this.formBuilder.group({
      comment: ['', Validators.required],
    })

    if (this.authService.isLoggedIn()) {
      debugger;
      this.userLoggedinInfo = JSON.parse(this.authService.getUserdata());

    }
    this.galleryImgsrcpath = this.apiendpoint + 'Uploads/UserGallery/image/';
    this.profileImgsrcpath = this.apiendpoint + 'Uploads/SocialMedia/UserProfilePic/image/';



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
    this.GetAllUserGalleryByUserId();

  }

  uploadPhotos(file) {

    debugger;

    // let imageArray:any = file.files;

    // for (let index = 0; index < imageArray.length; index++) {
    //   const element = imageArray[index];
    //   console.log("element", element);

    //   let files =  element;

    //   var mimeType = files.type;
    //   if (mimeType.match(/image\/*/) == null) {
    //     // return;
    //     Swal.fire('Oops...', ' Only Image File Supported .'+files.type+'file '+files.name+ 'Is Not Supported', 'error');
    //   }
    //   else{
    //     var reader = new FileReader();      
    //     reader.readAsDataURL(files); 
    //     reader.onload = (_event) => { 
    //       this.uploadFileUrls.push(reader.result); 
    //     }

    //     this.files.push(files);  

    //   }

    // }

    let files = file.files[0]
    var mimeType = files.type;
    if (mimeType.match(/image\/*/) == null) {
      // return;
      Swal.fire('Oops...', ' Only Image File Supported .' + files.type + 'file ' + files.name + 'Is Not Supported', 'error');
    }
    else {
      var reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = (_event) => {
        this.uploadFileUrls.push(reader.result);
      }
      this.galleryfiles.push(files);
      // this.imageFiles = files;
    }

    this.fileUploaded = true;
  }

  addUpdateGallery() {
    debugger;
    let formData = new FormData();
    formData.append('UserId', this.userLoggedinInfo.id);
    formData.append('Title', "Adventure trip");
    // if ((this.editGalleryAction == false) || (this.editGalleryAction == true && this.imageFiles != undefined)) {
    if ((this.editGalleryAction == false) || (this.editGalleryAction == true && (this.galleryfiles == undefined && this.galleryfiles.length !=0) )) {
      // let galleryfile:any  = this.galleryfiles;

      this.galleryfiles.forEach(file => {
        formData.append('Gallery', file);
      });
    }
    else {
      formData.append('Gallery', null);
    }


      // if (this.galleryfiles != null) {
      //   if (this.galleryfiles.length > 0) {
      //     for (var i = 0; i < this.galleryfiles.length; i++) {
      //       formData.append("Gallery", this.galleryfiles[i], this.galleryfiles[i].name);
      //     }
      //   }
      // }


    this.userGalleryService.AddUpdateUserGallery(formData).subscribe(resp => {
      this.uploadFileUrls = [];
      // this.imageFiles = undefined;
      this.galleryfiles = [];
      this.photoGalleryForm.get('gallery').setValue('');
      if (resp.status == Status.Success) {
        Swal.fire('', resp.message, 'success');
        this.GetAllUserGalleryByUserId();

      }
      else {
        Swal.fire('Oops...', resp.error, 'error');
      }
      this.spinner.hide();
    })
  }


  GetAllUserGalleryByUserId() {
    debugger;
    // this.spinner.show();
      this.galleryLoader =  true;
    
    this.userGalleryService.GetAllUserGalleryByUserId(this.userLoggedinInfo.id).subscribe(resp => {
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
      }
      else {
        Swal.fire('Oops...', resp.error, 'error');
      }
    })

  }

  openGalleryDialog(gallery) {
    debugger;
    this.galleryDetail = gallery;
  }

  openDeleteGalleryConfirmDialog(galleryId) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to delete this Blog!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.deleteGallery(galleryId);
      }

    })
  }

  deleteGallery(id) {
    debugger;
    this.spinner.show()
    this.userGalleryService.deleteUserGallery(id).subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success) {
        this.GetAllUserGalleryByUserId();
        Swal.fire(
          'Deleted!',
          'Your Gallery has been deleted.',
          'success'
        )
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }

  editGallery(gallery) {
    debugger;
    this.editGalleryImg = gallery.gallery;
    this.editGalleryAction = true;
  }

  uploadPhotosCloseDialog() {
    this.editGalleryAction = false;
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
    debugger

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
          this.GetAllUserGalleryByUserId();
          console.log('Your Gallery Comment  has been saved.')
        }
        else {
          Swal.fire('Oops...', resp.message, 'error');
        }
      })
    }
    
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

}

