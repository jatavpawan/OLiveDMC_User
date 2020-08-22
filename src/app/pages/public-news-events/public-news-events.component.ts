import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/model/ResponseModel';
import { environment } from 'src/environments/environment';
// import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2'
import { EventService } from 'src/app/providers/EventService/event.service';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/providers/NewsService/news.service';
import { MatDialog } from '@angular/material/dialog';
import { OpenVideoComponent } from '../../shared/open-video/open-video.component';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { FestivalService } from 'src/app/providers/FestivalService/festival.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BannerService } from 'src/app/providers/BannerService/banner.service';

@Component({
  selector: 'app-public-news-events',
  templateUrl: './public-news-events.component.html',
  styleUrls: ['./public-news-events.component.css']
})
export class PublicNewsEventsComponent implements OnInit {
  events: Array<any> = [];
  newses: Array<any> = [];
  festivals: Array<any> = [];
  apiendpoint: string = environment.apiendpoint;
  eventImgsrcpath: string = "";
  newsImgsrcPath: string = "";
  eventVideosrcpath: string = "";
  newsVideosrcPath: string = "";
  festivalImgsrcPath: string = "";
  festivalVideosrcPath: string = "";
  bannerImgsrcpath: string = "";
  bannerDetail: any;

  constructor(
    private eventService: EventService,
    private newsService: NewsService,
    private festivalService: FestivalService,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
    private router: Router,
    private  shareService: ShareService,
    private dialog: MatDialog

  ) {

      this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

      this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';
    this.eventImgsrcpath = this.apiendpoint + 'Uploads/Event/image/';
    this.eventVideosrcpath = this.apiendpoint + 'Uploads/Event/Video/';
    this.newsImgsrcPath = this.apiendpoint + 'Uploads/News/image/';
    this.newsVideosrcPath = this.apiendpoint + 'Uploads/News/Video/';
    this.festivalImgsrcPath = this.apiendpoint + 'Uploads/Festival/image/';
    this.festivalVideosrcPath = this.apiendpoint + 'Uploads/Festival/Video/';
  }

  ngOnInit(): void {
    this.GetAllEventInFrontEnd();
    this.GetAllNewsinFrontEnd();
    this.GetAllFestivainFrontEnd();
    this.getBannerDetail(1003);
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


  openDialog(videosrc) {
    debugger;
    const dialogRef = this.dialog.open(OpenVideoComponent,
      {
        maxWidth: '95vw',
        maxHeight: '95vh',
        minWidth: '798px',
        panelClass: 'video-dialog-container',
        hasBackdrop: false,
        minHeight: '75vh',
        data: videosrc
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  GetAllEventInFrontEnd() {
    this.eventService.GetAllEventInFrontEnd().subscribe(resp => {
      if (resp.status == Status.Success) {
        debugger;
        if (resp.data != undefined && resp.data.length > 10) {
          resp.data.length = 10
        }
        this.events = resp.data;
        if(this.events != undefined && this.events.length != 0 ){
          this.events = this.events.map( (event , i) =>{
             if( i == 0 || i == 3 || i == 5 || i == 7 ){
              event.dataWowDelay = "0ms";  
             }
             else if( i == 1 || i == 4 || i == 6 || i == 8 ){
              event.dataWowDelay = "300ms";  
             }
             else if( i == 2 || i == 9 ){
              event.dataWowDelay = "600ms";  
             }
             i <= 6 ?  event.class = "events-video-"+(i+1) : event.class = "events-video-"+(i-6);
             return event;
          }) 
        }
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      // this.spinner.hide();
    })
  }

  GetAllNewsinFrontEnd() {

    this.newsService.GetAllNewsinFrontEnd().subscribe(resp => {
      if (resp.status == Status.Success) {
        debugger;
        if (resp.data != undefined && resp.data.length > 8) {
          resp.data.length = 8
        }
        this.newses = resp.data;
        if(this.newses != undefined && this.newses.length != 0 ){
          this.newses = this.newses.map( (news , i) =>{
             if( i <2 ){
              news.dataWowDelay = 300*(i)+"ms";  
             }
             else if(i>= 2 && i<=4 ){
              news.dataWowDelay = 300*(i-2)+"ms";  
             }
             else if(i>= 5 && i<=7 ){
              news.dataWowDelay = 300*(i-5)+"ms";;  
             }
             return news;
          }) 
        }
        
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      // this.spinner.hide();
    })
  }

  GetAllFestivainFrontEnd() {

    debugger;
    this.festivalService.GetAllFestivainFrontEnd().subscribe(resp => {
      if (resp.status == Status.Success) {
        debugger;
        if (resp.data != undefined && resp.data.length > 6) {
          resp.data.length = 6
        }
        this.festivals = resp.data;
        if(this.festivals != undefined && this.festivals.length != 0 ){
          this.festivals = this.festivals.map( (festival , i) =>{
             if( i == 0 ){
              festival.class = "festival-img";  
             }
             else if(i>0 ){
              festival.class = "festival-img-"+(i+1);  
             }
             return festival;
          }) 

          console.log("this.festivals", this.festivals);
        }
        
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      // this.spinner.hide();
    })
  }



}
