import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { TopDestinationService } from 'src/app/providers/TopDestination/top-destination.service';
import Swal from 'sweetalert2';
import { OfferAdsService } from 'src/app/providers/OfferAdsService/offer-ads.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-top-destination-detail',
  templateUrl: './top-destination-detail.component.html',
  styleUrls: ['./top-destination-detail.component.css']
})
export class TopDestinationDetailComponent implements OnInit {

  topDestinationId: number;
  topDestinationDetail: any;
  topDestinationImgSrcPath: string;
  offerAdsList: Array<any> = [];
  offerAdsImgSrcPath: string = '';


  constructor(
    private shareService: ShareService,
    private topDestinationService: TopDestinationService,
    private activatedRoute: ActivatedRoute,
    private offerAdsService: OfferAdsService,
    private spinner: NgxSpinnerService,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.topDestinationImgSrcPath = environment.apiendpoint + 'Uploads/Home/TopDestination/image/';
    this.offerAdsImgSrcPath = environment.apiendpoint + 'Uploads/OfferAds/image/';
    this.activatedRoute.params.subscribe(param => {
      debugger;
      this.topDestinationId = param.topDestinationId;
      this.topDestinationService.GetTopDestinationDetailByTopDestinationId(this.topDestinationId).subscribe(resp => {
        if (resp.status == Status.Success) {
          this.topDestinationDetail = resp.data;
        }
      })
    })

  }

  ngOnInit(): void {
    this.GetAllOfferAdsByPageId(3007);
  }

  GetAllOfferAdsByPageId(pageId) {
    debugger;
    this.spinner.show();
    this.offerAdsService.GetAllOfferAdsByPageId(pageId).subscribe(resp => {
      if (resp.status == Status.Success) {
        this.offerAdsList = resp.data;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })
  }

}
