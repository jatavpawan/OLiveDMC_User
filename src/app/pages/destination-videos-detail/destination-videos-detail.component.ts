import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { DestinationVideosService } from 'src/app/providers/DestinationVideos/destination-videos.service';
import Swal from 'sweetalert2';
import { OfferAdsService } from 'src/app/providers/OfferAdsService/offer-ads.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-destination-videos-detail',
  templateUrl: './destination-videos-detail.component.html',
  styleUrls: ['./destination-videos-detail.component.css']
})
export class DestinationVideosDetailComponent implements OnInit {

  destinationVideosId: number;
  destinationVideosDetail: any;
  destinationVideosImgSrcPath: string;
  offerAdsList: Array<any> = [];
  offerAdsImgSrcPath: string = '';

  constructor(
    private shareService: ShareService,
    private destinationVideosService: DestinationVideosService,
    private activatedRoute: ActivatedRoute,
    private offerAdsService: OfferAdsService,
    private spinner: NgxSpinnerService,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.destinationVideosImgSrcPath = environment.apiendpoint + 'Uploads/Home/DestinationVideos/image/';
    this.offerAdsImgSrcPath = environment.apiendpoint + 'Uploads/OfferAds/image/';

    this.activatedRoute.params.subscribe(param => {
      debugger;
      this.destinationVideosId = param.destinationVideosId;
      this.destinationVideosService.GetDestinationVideosDetailByDestinationVideosId(this.destinationVideosId).subscribe(resp => {
        if (resp.status == Status.Success) {
          this.destinationVideosDetail = resp.data;
        }
      })
    })

  }

  ngOnInit(): void {
    this.GetAllOfferAdsByPageId(3012);

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
