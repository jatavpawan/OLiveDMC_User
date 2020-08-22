import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { BannerService } from 'src/app/providers/BannerService/banner.service';
import { Status } from 'src/app/model/ResponseModel';
import Swal from 'sweetalert2';
import { TeamMemberService } from 'src/app/providers/TeamMemberService/team-member.service';
import { AboutUsService } from 'src/app/providers/AboutUsService/about-us.service';

declare var $: any;
@Component({
  selector: 'app-public-about',
  templateUrl: './public-about.component.html',
  styleUrls: ['./public-about.component.css']
})
export class PublicAboutComponent implements OnInit {

  teamMembersSlideOptions = {
    loop: true,
    margin: 20,
    dots: false,
    nav: true,
    autoplay: true,
    autoplaySpeed: 3000,
    navText: ['&#8592;', '&#8594;'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  }

  teamMemberData = [
    {
      name: "Julia Homless",
      designation: "CEO",
      img: "../assets/PublicAssets/images/member-1.jpg"
    },
    {
      name: "Lucas Smith",
      designation: "Marketing Manger",
      img: "../assets/PublicAssets/images/member-2.jpg"
    },
    {
      name: "Pablo Henvik",
      designation: "Customer Service",
      img: "../assets/PublicAssets/images/member-3.jpg"
    },
  ]
  bannerImgsrcpath: string = "";
  bannerDetail: any;
  apiendpoint: string = environment.apiendpoint;

  teamMembers:any =[];
  statements:any =[];
  teamMemberImgrcpath: string = "";
  statementsImgrcpath: string = "";
  aboutUsDescription: string = "";
  aboutUsData: any;
  aboutUsImgrcpath: string = "";
 
  
  
  constructor( 
    private  teamMemberService: TeamMemberService, 
    private  shareService: ShareService,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
    private aboutUsService: AboutUsService,
    
  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

  this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';
  this.teamMemberImgrcpath =  this.apiendpoint+'Uploads/TeamMemberInAboutUs/image/';
  this.statementsImgrcpath =  this.apiendpoint+'Uploads/AboutUsStatement/image/';
  this.aboutUsImgrcpath =  this.apiendpoint+'Uploads/AboutUsIntroduction/image/';

  }
  ngOnInit(): void {
    // Loader
    $(window).on('load', function () {
      $('.loader').fadeOut(1000);
    });

    this.getBannerDetail(2011);
    this.GetAllTeamMember();
    this.GetAllAboutUsStatement();
    this.GetAboutUsIntroduction();
    
   
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

  GetAllTeamMember(){

    this.teamMemberService.GetAllTeamMemberinFrontEnd().subscribe(resp=>{
      if(resp.status == Status.Success){
          this.teamMembers = resp.data;
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }

  GetAllAboutUsStatement(){

    this.aboutUsService.GetAllAboutUsStatementinFrontEnd().subscribe(resp=>{
      if(resp.status == Status.Success){
          this.statements = resp.data;
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }

  GetAboutUsIntroduction() {
    debugger;
    this.spinner.show();
    this.aboutUsService.GetAboutUsIntroductionDetail().subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success && resp.data != null && resp.data.length != 0) {
        this.aboutUsDescription = resp.data[0].description;
        this.aboutUsData = resp.data[0];
        console.log("this.aboutUsDescription", this.aboutUsDescription );
        console.log("this.aboutUsData", this.aboutUsData );
      }
      else {
        Swal.fire('', resp.message, 'warning');
      }
    })
  }

}
