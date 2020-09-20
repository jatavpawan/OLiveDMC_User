import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/model/ResponseModel';
import { BannerService } from 'src/app/providers/BannerService/banner.service';
import { UserPersonalInfoService } from 'src/app/providers/UserPersonalInfoService/user-personal-info.service';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';


@Component({
  selector: 'app-go-social',
  templateUrl: './go-social.component.html',
  styleUrls: ['./go-social.component.css']
})
export class GoSocialComponent implements OnInit {

  bannerImgsrcpath: string = "";
  bannerDetail: any;
  apiendpoint: string = environment.apiendpoint;
  userId: number = 0;
  userPersonalInfo: any;
  profileImageUrl: any = null;
  coverImgsrcpath: string;
  profileImgsrcpath: string;
  profileImagefile: any;
  profileImageUploaded: boolean = false;
  coverImageUrl: any = null;
  coverImagefile: any;
  coverImageUploaded: boolean = false;
  userLoggedinInfo: any;
  fileUploaded: boolean = false;
  imageFiles: any;
  uploadFileUrls: Array<any> = [];
  file: any;
  previewUrl:any = null;
  editfileUploaded: boolean = false;
  userPostCount:number = 0;
  userFriendCount:number = 0;

  constructor(
    private shareService: ShareService,
    private authService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
    private userPersonalInfoService: UserPersonalInfoService,

  ) {

    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(false);
    this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';
    this.coverImgsrcpath = this.apiendpoint + 'Uploads/SocialMedia/UserCoverImage/image/';
    this.profileImgsrcpath = this.apiendpoint + 'Uploads/SocialMedia/UserProfilePic/image/';

    if (this.authService.isLoggedIn()) {
      debugger;
      this.userLoggedinInfo = JSON.parse(this.authService.getUserdata());

      this.GetUserPersonalInfoByUserId(this.userLoggedinInfo.id);
    }


  }

  ngOnInit(): void {
    this.getBannerDetail(2007);
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

  
  GetUserPersonalInfoByUserId(userId) {
    debugger;
    this.userPersonalInfoService.GetUserPersonalInfoByUserId(userId).subscribe(resp => {
      if (resp.status == Status.Success) {
        this.userPersonalInfo = resp.data;

        this.userPersonalInfo != undefined ? this.userPostCount = this.userPersonalInfo.postCount : this.userPostCount = 0;
        this.userPersonalInfo != undefined ? this.userFriendCount = this.userPersonalInfo.friendCount : this.userFriendCount = 0;

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


  AddUpdateUserCoverImage() {
    debugger;

    let formData = new FormData();
    formData.append('UserId', this.userLoggedinInfo.id);
    formData.append('CoverImage', this.coverImagefile);

    this.userPersonalInfoService.AddUpdateUserCoverImage(formData).subscribe(resp => {
      if (resp.status == Status.Success) {
        // this.bannerDetail = resp.data;
      }
      else {
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

  
  AddUpdateUserProfileImage() {
    debugger;
    let formData = new FormData();
    formData.append('UserId', this.userLoggedinInfo.id);
    formData.append('ProfileImg', this.profileImagefile);

    this.userPersonalInfoService.AddUpdateUserProfileImage(formData).subscribe(resp => {
      if (resp.status == Status.Success) {
        this.shareService.userLOggedInAction(true);
      }
      else {
        Swal.fire('Oops...', resp.error, 'error');
      }
      this.spinner.hide();
    })
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


}



 