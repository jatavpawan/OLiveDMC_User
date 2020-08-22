import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './providers/authentication/authentication.service';
import * as $ from 'jquery';
import { ShareService } from './providers/sharedService/share.service';

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

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private shareService: ShareService,

  ) {
    this.shareService.hideHeaderFooter.subscribe((res: any) => {
      this.hideHeaderFooterTag = res;
    });
    this.userLogin = this.authService.isLoggedIn();
    
    this.shareService.userLOggedIn.subscribe((res: any) => {
      this.userLogin = res;
    });
    
    this.shareService.hideSocialMediaBtn.subscribe((res: any) => {
      this.hideSocialBtn = res;
    });

    
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
    this.userLogin = false;
    this.authService.logout();
  }
}
