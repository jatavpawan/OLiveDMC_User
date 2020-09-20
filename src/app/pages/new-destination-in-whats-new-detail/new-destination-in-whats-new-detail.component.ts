import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { NewdestinationInWhatsnewService } from 'src/app/providers/NewDestinationsInWhatsNew/newdestination-in-whatsnew.service';
import Swal from 'sweetalert2';
import { OfferAdsService } from 'src/app/providers/OfferAdsService/offer-ads.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-new-destination-in-whats-new-detail',
  templateUrl: './new-destination-in-whats-new-detail.component.html',
  styleUrls: ['./new-destination-in-whats-new-detail.component.css']
})
export class NewDestinationInWhatsNewDetailComponent implements OnInit {

  newDestinationId: number;
  newDestinationDetail: any;
  newDestinationImgSrcPath: string;
  offerAdsList: Array<any> = [];
  offerAdsImgSrcPath: string = '';

  constructor(
    private shareService: ShareService,
    private newdestinationInWhatsnewService: NewdestinationInWhatsnewService,
    private activatedRoute: ActivatedRoute,
    private offerAdsService: OfferAdsService,
    private spinner: NgxSpinnerService,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.newDestinationImgSrcPath = environment.apiendpoint + 'Uploads/NewDestinationsInWhatsNew/image/';
    this.offerAdsImgSrcPath = environment.apiendpoint + 'Uploads/OfferAds/image/';

    this.activatedRoute.params.subscribe(param => {
      debugger;
      this.newDestinationId = param.newDestinationId;
      this.newdestinationInWhatsnewService.GetNewDestinationsInWhatsNewDetailByDestinationsId(this.newDestinationId).subscribe(resp => {
        if (resp.status == Status.Success) {
          this.newDestinationDetail = resp.data;
        }
      })
    })

  }

  ngOnInit(): void {
    this.GetAllOfferAdsByPageId(3011);

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
