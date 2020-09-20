import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2'
import { Status } from 'src/app/model/ResponseModel';
import { NewdestinationInWhatsnewService } from 'src/app/providers/NewDestinationsInWhatsNew/newdestination-in-whatsnew.service';
import { InterviewInWhatsnewService } from 'src/app/providers/InterviewInWhatsNew/interview-in-whatsnew.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { OpenVideoComponent } from 'src/app/shared/open-video/open-video.component';
import { BannerService } from 'src/app/providers/BannerService/banner.service';

@Component({
  selector: 'app-public-whats-new',
  templateUrl: './public-whats-new.component.html',
  styleUrls: ['./public-whats-new.component.css']
})
export class PublicWhatsNewComponent implements OnInit {
  destinations: Array<any> = [];
  destinations1: Array<any> = [];
  destinations2: Array<any> = [];
  interviews: Array<any> = [];
  apiendpoint: string = environment.apiendpoint;
  destinationImgsrcpath: string = "";
  interviewImgsrcPath: string = "";
  destinationVideosrcpath: string = "";
  interviewVideosrcPath: string = "";
  bannerImgsrcpath: string = "";
  bannerDetail: any;

  constructor( 
    private  shareService: ShareService, 
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
    private destinationService: NewdestinationInWhatsnewService,
    private interviewService: InterviewInWhatsnewService,
    private dialog: MatDialog
    ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.destinationImgsrcpath = this.apiendpoint + 'Uploads/NewDestinationsInWhatsNew/image/';
    this.destinationVideosrcpath = this.apiendpoint + 'Uploads/NewDestinationsInWhatsNew/Video/';
    this.interviewImgsrcPath = this.apiendpoint + 'Uploads/InterviewsInWhatsNew/image/';
    this.interviewVideosrcPath = this.apiendpoint + 'Uploads/InterviewsInWhatsNew/Video/';
  this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';

  }

  ngOnInit(): void {
    this.GetAllDestination();
    this.GetAllInterview();
    this.getBannerDetail(1002);
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

  GetAllDestination(){
    debugger;

    this.destinationService.GetAllNewDestinationsInWhatsNewFrontEnd().subscribe(resp=>{
      if(resp.status == Status.Success){
        if (resp.data != undefined && resp.data.length > 9) {
          resp.data.length = 9
        }
        this.destinations = resp.data;

        if(this.destinations != undefined && this.destinations.length != 0 ){
          this.destinations.forEach( (destination , i) =>{
             if( i <4 ){
              this.destinations1 = [...this.destinations1, destination];   
             }
             else if( i >= 4 && i < 9 ){
              this.destinations2 = [...this.destinations2, destination];
              
              if(this.destinations2 != undefined && this.destinations2.length != 0 ){
                this.destinations2 = this.destinations2.map( (destination2 , i) =>{
                   if( i == 0 || i == 2 ){
                    destination2.dataWowDelay = "0ms";  
                   }
                   else if( i == 1 || i == 3 ){
                    destination2.dataWowDelay = "300ms";  
                   }
                   else if( i == 4 ){
                    destination2.dataWowDelay = "600ms";  
                   }
                   return destination2;
                }) 
              }


             }
          }) 
        }



      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }

  GetAllInterview(){
    debugger;

    this.interviewService.GetAllInterviewsInWhatsNewFrontEnd().subscribe(resp=>{
      if(resp.status == Status.Success){
        if (resp.data != undefined && resp.data.length > 5) {
          resp.data.length = 5
        }
          this.interviews = resp.data;

          if(this.interviews != undefined && this.interviews.length != 0 ){
            this.interviews = this.interviews.map( (interview , i) =>{
               if( i == 0 || i == 2 ){
                interview.dataWowDelay = "0ms";  
               }
               else if( i == 1 || i == 3 ){
                interview.dataWowDelay = "300ms";  
               }
               else if( i == 4 ){
                interview.dataWowDelay = "600ms";  
               }
               return interview;
            }) 
          }
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }

}

