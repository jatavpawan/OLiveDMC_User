import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';

declare var $: any;

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent implements OnInit {

  showheader: boolean = true;
  href: string;
  showfooter: boolean = true;
  userLogin: boolean =  false;
 

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    
    ) {

    this.href = this.router.url;
    if (
      this.href == "/login"
      || this.href == "/signUp"
      || this.href == "/sendmail-forgotpassword"
    ){
       this.showheader = false;
       this.showfooter = false;
    }
    else{
       this.showheader =  true;
       this.showfooter =  true;
    }
      console.log("header url", this.router.url);
      debugger;

      // this.authService.isLoggedIn() == true ? this.userLogin =  true : this.userLogin =  false;  
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

  
  hideHeader(){
     this.showheader =  false;
      
      $(".footer-bg").css("display", "none");
  }

  
  goSocial(){
    let userdata = this.authService.getUserdata();
    if(userdata != null && userdata != undefined){
      this.router.navigate(['/social-media']);
    }
    else{
      // localStorage.setItem("previousAccessUrl", "/social-media"); 
      this.router.navigate(['/login']);
    }
  }

  logout(){
    this.authService.logout();
  }
}
