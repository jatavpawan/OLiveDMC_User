import { Component, OnInit } from '@angular/core';
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

declare var $: any;

@Component({
  selector: 'app-public-social-media',
  templateUrl: './public-social-media.component.html',
  styleUrls: ['./public-social-media.component.css']
})
export class PublicSocialMediaComponent implements OnInit {

  bannerImgsrcpath: string = "";
  bannerDetail: any;
  apiendpoint: string = environment.apiendpoint;
  userId: number = 0;
  userPersonalInfo: any;
  profileImageUrl:any = null;;
  profileImagefile: any;
  profileImageUploaded: boolean = false;
  coverImageUrl:any = null;;
  coverImagefile: any;
  coverImageUploaded: boolean = false;
  userPersonalInfoForm: FormGroup;
  userLoggedinInfo: any;

 
  constructor( 
    private  shareService: ShareService,
    private  authService: AuthenticationService,
    private formBuilder : FormBuilder,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
    private userPersonalInfoService: UserPersonalInfoService,
    
  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(false);
  this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';
  
  

  this.userPersonalInfoForm = this.formBuilder.group({
    userId: [0],
    name: ['', Validators.required],
    email: ['', Validators.required],
    mobile: ['', Validators.required],
    Birthday: ['', Validators.required],
    Occupation: ['', Validators.required],
    Country: ['', Validators.required],
    State: ['', Validators.required],
    City: ['', Validators.required],
  })

  if(this.authService.isLoggedIn()){
    debugger;
    this.userLoggedinInfo =  JSON.parse(this.authService.getUserdata());
    this.userPersonalInfoForm.get('userId').setValue(this.userLoggedinInfo.id);
     this.userPersonalInfoForm.get('name').setValue(this.userLoggedinInfo.firstName+' '+this.userLoggedinInfo.lastName);
     this.userPersonalInfoForm.get('email').setValue(this.userLoggedinInfo.emailId);
     this.userPersonalInfoForm.get('mobile').setValue(this.userLoggedinInfo.mobileNo);
  }
  

  }

  ngOnInit(): void {
    $(document).ready(function(){
      $(".delete-video, .delete-photos").click(function() {
        $(".events-main, .evnts-video-main").fadeOut( "slow");
      });
      
      $(".add-blogs-hide").click(function(){
          $(".blogs-tab-main").fadeOut();
        });
      
      $(".remove-image").click(function(){
          $(".user-img-list").fadeOut();
        });
      
      });


    this.getBannerDetail(2007);
  }

  
 getBannerDetail(pageId){
    debugger;
    this.bannerService.GetBannerDetailByPageId(pageId).subscribe(resp=>{
      if(resp.status == Status.Success){
        this.bannerDetail = resp.data;
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }

  GetUserPersonalInfoByUserId(pageId){
    debugger;
    this.userPersonalInfoService.GetUserPersonalInfoByUserId(pageId).subscribe(resp=>{
      if(resp.status == Status.Success){
        this.userPersonalInfo = resp.data;
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }

  AddUpdateUserProfileImage(){
    debugger;
    let formData = new FormData();
    formData.append('UserId',  this.userPersonalInfoForm.get('userId').value);
    formData.append('ProfileImg', this.profileImagefile);

    this.userPersonalInfoService.AddUpdateUserProfileImage(formData).subscribe(resp=>{
      if(resp.status == Status.Success){
        // this.bannerDetail = resp.data;
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }

  AddUpdateUserAboutDescription(){
    debugger;
    let obj = {
      UserId: this.userPersonalInfoForm.get('userId').value,
      AboutDescription:  ''
    }
    this.userPersonalInfoService.AddUpdateUserAboutDescription(obj).subscribe(resp=>{
      if(resp.status == Status.Success){
        // this.bannerDetail = resp.data;
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }

  AddUpdateUserCoverImage(){
    debugger;

    let formData = new FormData();
    formData.append('UserId',  this.userPersonalInfoForm.get('userId').value);
    formData.append('CoverImage', this.coverImagefile);

    this.userPersonalInfoService.AddUpdateUserCoverImage(formData).subscribe(resp=>{
      if(resp.status == Status.Success){
        // this.bannerDetail = resp.data;
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }

  uploadProfileImage(file) {
    debugger;
    let files = file.files[0] 
    var mimeType = files.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(files); 
    reader.onload = (_event) => { 
      this.profileImageUrl = reader.result; 
    }

    this.profileImagefile = files;  
    this.profileImageUploaded = true;
    this.AddUpdateUserProfileImage();

  }

  uploadCoverImage(file) {
    debugger;
    let files = file.files[0] 
    var mimeType = files.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(files); 
    reader.onload = (_event) => { 
      this.coverImageUrl = reader.result; 
    }

    this.coverImagefile = files;  
    this.coverImageUploaded = true;
    this.AddUpdateUserCoverImage();

  }

  resetUserPersonalInfoForm(){  
    this.userPersonalInfoForm.setValue({
      userId: 0,
      name: '',
      email: '',
      mobile: '',
      Birthday: '',
      Occupation: '',
      Country: '',
      State: '',
      City: '',
    })

  }



}
