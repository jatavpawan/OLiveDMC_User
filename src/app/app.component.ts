import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './providers/authentication/authentication.service';
import * as $ from 'jquery';
import { ShareService } from './providers/sharedService/share.service';
import { UserPersonalInfoService } from './providers/UserPersonalInfoService/user-personal-info.service';
import { environment } from 'src/environments/environment';
import { Status } from './model/ResponseModel';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent implements OnInit{
export class AppComponent implements OnInit {
  userLogin: boolean = false;
  hideHeaderFooterTag: boolean = false;
  hideSocialBtn: boolean = true;
  userLoggedinInfo: any;
  profileImgsrcpath: string = "";
  apiendpoint: string = environment.apiendpoint;
  userPersonalInfo: any;
  profileImageUrl: string;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private shareService: ShareService,
    private userPersonalInfoService: UserPersonalInfoService,
    private spinner: NgxSpinnerService,
  ) {

    this.profileImgsrcpath = this.apiendpoint + 'Uploads/SocialMedia/UserProfilePic/image/';

    this.shareService.hideHeaderFooter.subscribe((res: any) => {
      this.hideHeaderFooterTag = res;
    });
    this.userLogin = this.authService.isLoggedIn();
    
    this.shareService.userLOggedIn.subscribe((res: any) => {
      this.userLogin = res;
      if(this.userLogin == true){
        this.userLoggedinInfo = JSON.parse(this.authService.getUserdata());
        this.GetUserPersonalInfoByUserId(this.userLoggedinInfo.id);
      }
    });
    
    this.shareService.hideSocialMediaBtn.subscribe((res: any) => {
      this.hideSocialBtn = res;
    });

    if (this.authService.isLoggedIn()) {
      debugger;
      this.userLoggedinInfo = JSON.parse(this.authService.getUserdata());
      this.GetUserPersonalInfoByUserId(this.userLoggedinInfo.id);
    }


    
  }



  ngOnInit(): void {
    $('.closeIcn > span, .overlay ').click(function () {
      $('body').removeClass('open-menu');
    });


    $('.mobile-nav ').click(function () {
      $('body').toggleClass('open-menu');
    });


    //for dropdown in service start
    $(".dropdown-link").click(function () {
      $("body").toggleClass("main");
    });
    //for dropdown in service end

    //Responsive menu slide

    $(document).ready(function () {
      $('.parent span').click(function () {
        $(this).parent('.parent').siblings().removeClass('active');
        $(this).parent('.parent').toggleClass('active');
        $(this).parent('.parent').siblings().children('ul').slideUp();
        $(this).parent('.parent').children('ul').slideToggle();
      });
    });

  }

  goSocial() {
    let userdata = this.authService.getUserdata();
    if (userdata != null && userdata != undefined) {
      this.router.navigate(['/social-media']);
    }
    else {
      // localStorage.setItem("previousAccessUrl", "/social-media"); 
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.profileImageUrl = undefined;
    this.userLogin = false;
    this.authService.logout();
  }

  GetUserPersonalInfoByUserId(userId) {
    debugger;
    this.userPersonalInfoService.GetUserPersonalInfoByUserId(userId).subscribe(resp => {
      if (resp.status == Status.Success) {
        this.userPersonalInfo = resp.data;

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

  menuClick(){
    $('.closeIcn > span, .overlay ').click(function () {
      $('body').removeClass('open-menu');
    });


    $('.mobile-nav ').click(function () {
      $('body').toggleClass('open-menu');
    });
  }

}


