import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { LatestEventService } from 'src/app/providers/LatestEventService/latest-event.service';
import Swal from 'sweetalert2';
import { OfferAdsService } from 'src/app/providers/OfferAdsService/offer-ads.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-latest-event-detail',
  templateUrl: './latest-event-detail.component.html',
  styleUrls: ['./latest-event-detail.component.css']
})
export class LatestEventDetailComponent implements OnInit {

  latestEventId:number;
  latestEventDetail:any;
  latestEventImgSrcPath: string;
  

  
  offerAdsList: Array<any> = [];
   offerAdsImgSrcPath: string = '';


  constructor(
    private shareService: ShareService,
    private latestEventService: LatestEventService,
    private activatedRoute: ActivatedRoute,
    private offerAdsService: OfferAdsService,
    private spinner: NgxSpinnerService,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.latestEventImgSrcPath =  environment.apiendpoint + 'Uploads/LatestEvent/image/';
    this.offerAdsImgSrcPath =  environment.apiendpoint + 'Uploads/OfferAds/image/';
    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.latestEventId = param.latestEventId;
       this.latestEventService.GetLatestEventDetailByEventId(this.latestEventId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.latestEventDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
  this.GetAllOfferAdsByPageId(3006);
  }


GetAllOfferAdsByPageId(pageId){
  debugger;
  this.spinner.show();
  this.offerAdsService.GetAllOfferAdsByPageId(pageId).subscribe(resp=>{
    if(resp.status == Status.Success){
      this.offerAdsList = resp.data;
    } 
    else{
      Swal.fire('Oops...', resp.message, 'error');
    }
    this.spinner.hide();
  })    
}

}
