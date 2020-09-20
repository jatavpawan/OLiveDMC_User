import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { FestivalService } from 'src/app/providers/FestivalService/festival.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { TravelUtilityService } from 'src/app/providers/TravelUtilityService/travel-utility.service';
import Swal from 'sweetalert2';
import { OfferAdsService } from 'src/app/providers/OfferAdsService/offer-ads.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-travel-utility-detail',
  templateUrl: './travel-utility-detail.component.html',
  styleUrls: ['./travel-utility-detail.component.css']
})
export class TravelUtilityDetailComponent implements OnInit {

 
  utilityType:number;
  utilityDetail:any;
  utilityImgSrcPath: string;
  offerAdsList: Array<any> = [];
  offerAdsImgSrcPath: string = '';
 
  constructor(
    private shareService: ShareService,
    private travelUtilityService: TravelUtilityService,
    private activatedRoute: ActivatedRoute,
    private offerAdsService: OfferAdsService,
    private spinner: NgxSpinnerService,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.utilityImgSrcPath =  environment.apiendpoint + 'Uploads/Utility/image/';
    this.offerAdsImgSrcPath =  environment.apiendpoint + 'Uploads/OfferAds/image/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.utilityType = param.utilityType;
       this.travelUtilityService.getUtilityDetailByUtilityType(this.utilityType).subscribe(resp => {
           if(resp.status == Status.Success){
            this.utilityDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
    this.GetAllOfferAdsByPageId(3014);
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
