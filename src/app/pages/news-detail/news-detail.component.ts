import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { NewsService } from 'src/app/providers/NewsService/news.service';
import Swal from 'sweetalert2';
import { OfferAdsService } from 'src/app/providers/OfferAdsService/offer-ads.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  newsId: number;
  newsDetail: any;
  newsImgSrcPath: string;
  newsVideoSrcPath: string;
  offerAdsList: Array<any> = [];
  offerAdsImgSrcPath: string = '';

  constructor(
    private shareService: ShareService,
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private offerAdsService: OfferAdsService,
    private spinner: NgxSpinnerService,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.newsImgSrcPath = environment.apiendpoint + 'Uploads/News/image/';
    this.newsVideoSrcPath = environment.apiendpoint + 'Uploads/News/Video/';
    this.offerAdsImgSrcPath = environment.apiendpoint + 'Uploads/OfferAds/image/';


    this.activatedRoute.params.subscribe(param => {
      debugger;
      this.newsId = param.newsId;
      this.newsService.GetNewsDetailByNewsId(this.newsId).subscribe(resp => {
        if (resp.status == Status.Success) {
          this.newsDetail = resp.data;
        }
      })
    })

  }

  ngOnInit(): void {
    this.GetAllOfferAdsByPageId(3008);
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
