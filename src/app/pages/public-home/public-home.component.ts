import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/model/ResponseModel';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import Swal from 'sweetalert2';
// import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import { EventService } from 'src/app/providers/EventService/event.service';
import { TrendingNewsService } from 'src/app/providers/TrendingNews/trending-news.service';
import { TopDestinationService } from 'src/app/providers/TopDestination/top-destination.service';
import { environment } from 'src/environments/environment';
import { ThemeService } from 'src/app/providers/theme.service';
import { DestinationVideosService } from 'src/app/providers/DestinationVideos/destination-videos.service';
import { InterviewService } from 'src/app/providers/Interview/interview.service';
import { MatDialog } from '@angular/material/dialog';
import { OpenVideoComponent } from '../../shared/open-video/open-video.component';
import { LatestEventService } from 'src/app/providers/LatestEventService/latest-event.service';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BannerService } from 'src/app/providers/BannerService/banner.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.css']
})
export class PublicHomeComponent implements OnInit {
  blogPriorityList: Array<any> = [];
  events: Array<any> = [];
  trendingNewses: Array<any> = [];
  topDestinations: Array<any> = [];
  apiendpoint: string = environment.apiendpoint;
  blogimgsrcpath: string = "";
  trendingNewsImgsrcPath: string = "";
  eventImgsrcPath: string = "";
  destinationImgsrcPath: string = "";
  themeimgsrcpath: string = "";
  destinationVideoImgsrcpath: string = "";
  interviewImgsrcpath: string = "";
  themes: Array<any> = [];
  destinationVideos: Array<any> = [];
  interviews: Array<any> = [];
  destinationVideosSlideOptions = { 
    loop: true,
    responsiveClass: true,
    nav: true,
    margin: 0,
    autoplayTimeout: 3000,
    smartSpeed: 400,
    autoplay: true,
    center: true,
    navText: ['&#8592;', '&#8594;'],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3
      },
      1200: {
        items: 3
      }
    }

   };
   bannerSlideOptions = { 
    loop: true,
    margin: 20,
    dots:false,
    nav: false,
    autoplay: true,
    animateOut: 'fadeOut',
    autoplaySpeed:2000,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }

   };

   themeSlideOptions = {
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
        items: 4
      }
    }
  }

  interviewSlideOptions = {
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    autoplay: true,
    autoplaySpeed: 2000,
    navText: ['&#8592;', '&#8594;'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  }
  destinationVideosVideosrcpath: string = "";
  interviewVideosrcpath: string = "";
  latestEvents: Array<any> = [];
  latestEventImgsrcPath: string = "";
  videosrcPath: string = "";
  homeBannerList: Array<any> = [];
  bannerImgsrcpath: string = '';



  constructor(
    private blogService: BlogService,
    private eventService: EventService,
    private trendingNewsService: TrendingNewsService,
    private topDestinationService: TopDestinationService,
    private themeService: ThemeService,
    private destinationVideosService: DestinationVideosService,
    private interviewService: InterviewService,
    private latestEventService: LatestEventService,
    private  shareService: ShareService,
    private  bannerService: BannerService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog

  ) {

      this.shareService.hideHeaderFooterAction(false);
      this.shareService.hideSocialMediaBtnAction(true);

    this.blogimgsrcpath = this.apiendpoint + 'Uploads/Blog/image/';
    this.trendingNewsImgsrcPath = this.apiendpoint + 'Uploads/Home/TrendingNews/image/';
    this.latestEventImgsrcPath = this.apiendpoint + 'Uploads/LatestEvent/image/';
    this.destinationImgsrcPath = this.apiendpoint + 'Uploads/Home/TopDestination/image/';
    this.themeimgsrcpath = this.apiendpoint + 'Uploads/TourTheme/image/';
    this.destinationVideoImgsrcpath = this.apiendpoint + 'Uploads/Home/DestinationVideos/image/';
    this.destinationVideosVideosrcpath = this.apiendpoint + 'Uploads/Home/DestinationVideos/Video/';
    this.interviewImgsrcpath = this.apiendpoint + 'Uploads/Home/Interview/image/';
    this.interviewVideosrcpath = this.apiendpoint + 'Uploads/Home/Interview/Video/';
    this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';


    this.GetBannerAtHome();
  }

  GetBannerAtHome(){
    debugger;
    this.bannerService.GetBannerAtHome().subscribe(resp=>{
      if(resp.status == Status.Success){
        this.homeBannerList = resp.data;
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }


  openDialog(videosrc) {
    debugger;
    const dialogRef = this.dialog.open(OpenVideoComponent,
      {
        panelClass: 'video-dialog-container',
        hasBackdrop: false,
        data: videosrc
        // maxWidth: '800px',
        // maxHeight: '95vh',
        // minWidth: '798px',
        // minHeight: '75vh',
        // max-width: 800px;
        // width: 100%;
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
    this.videosrcPath = videosrc;  

  }

  ngOnInit(): void {
    $(window).on('load', function () {
      $('.loader').fadeOut(1000);
    });

    //for home page slider START
    $(document).ready(function () {
      for (var i = 1; i <= $('.slider__slide').length; i++) {
        $('.slider__indicators').append('<div class="slider__indicator" data-slide="' + i + '"></div>')
      }
      setTimeout(function () {
        $('.slider__wrap').addClass('slider__wrap--hacked');
      }, 1000);
    })

    function goToSlide(number) {
      $('.slider__slide').removeClass('slider__slide--active');
      $('.slider__slide[data-slide=' + number + ']').addClass('slider__slide--active');
    }

    $('.slider__next, .go-to-next').on('click', function () {
      var currentSlide = Number($('.slider__slide--active').data('slide'));
      var totalSlides = $('.slider__slide').length;
      currentSlide++
      if (currentSlide > totalSlides) {
        currentSlide = 1;
      }
      goToSlide(currentSlide);
    })


    //for home page banner slider START
// $('#banner-slider').owlCarousel({
//   loop: true,
//   margin: 20,
//   dots:false,
//   nav: false,
//   autoplay: true,
//   animateOut: 'fadeOut',
//   autoplaySpeed:2000,
//   responsive: {
//     0: {
//       items: 1
//     },
//     600: {
//       items: 1
//     },
//     1000: {
//       items: 1
//     }
//   }
// });
//for home page banner slider END

    this.getBlogPriorityList();
    this.GetAllLatestEventInFrontEnd();
    this.GetAllTrendingNews();
    this.GetAllTopDestination();
    this.GetAllTourTheme();
    this.GetAllDestinationVideo();
    this.GetAllInterview();
    // this.GetAllLatestEvent();
    

  }

  // GetAllLatestEvent(){
  //   this.latestEventService.GetAllLatestEvent().subscribe(resp=>{
  //     if(resp.status == Status.Success){
  //         this.latestEvents = resp.data;
  //     } 
  //     else{
  //       Swal.fire('Oops...', resp.message, 'error');
  //     }
  //     // this.spinner.hide();
  //   })    
  // }

  getBlogPriorityList() {
    this.blogService.getAllBlogPriorityListInUserPanel().subscribe(resp => {
      if (resp.status == Status.Success) {
        if (resp.data != undefined && resp.data.length > 6) {
          resp.data.length = 6
        }
        this.blogPriorityList = resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      // this.spinner.hide();
    })

  }

  GetAllLatestEventInFrontEnd() {
    this.latestEventService.GetAllLatestEventInFrontEnd().subscribe(resp => {
      if (resp.status == Status.Success) {
        debugger;
        if(resp.data != undefined && resp.data.length >4){
          resp.data.length = 4
        }
        this.latestEvents = resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      // this.spinner.hide();
    })
  }

  GetAllTrendingNews() {

    this.trendingNewsService.GetAllTrendingNews().subscribe(resp => {
      if (resp.status == Status.Success) {
        if (resp.data != undefined && resp.data.length > 8) {
          resp.data.length = 8
        }
        this.trendingNewses = resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      // this.spinner.hide();
    })
  }

  GetAllTopDestination() {

    this.topDestinationService.GetAllTopDestination().subscribe(resp => {
      if (resp.status == Status.Success) {
        if (resp.data != undefined && resp.data.length > 8) {
          resp.data.length = 8
        }
        this.topDestinations = resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      // this.spinner.hide();
    })
  }

  GetAllTourTheme() {
    this.themeService.GetAllTourTheme().subscribe(resp => {
      if (resp.status == Status.Success) {
        debugger;
        this.themes = resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      // this.spinner.hide();
    })
  }


  GetAllDestinationVideo() {
    this.destinationVideosService.GetAllDestinationVideos().subscribe(resp => {
      if (resp.status == Status.Success) {
        debugger;
        this.destinationVideos = resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      // this.spinner.hide();
    })
  }

  GetAllInterview() {
    this.interviewService.GetAllInterview().subscribe(resp => {
      if (resp.status == Status.Success) {
        debugger;
        this.interviews = resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      // this.spinner.hide();
    })
  }

}
