import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { TrendingNewsService } from 'src/app/providers/TrendingNews/trending-news.service';
import Swal from 'sweetalert2';
import { OfferAdsService } from 'src/app/providers/OfferAdsService/offer-ads.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-trending-news-detail',
  templateUrl: './trending-news-detail.component.html',
  styleUrls: ['./trending-news-detail.component.css']
})
export class TrendingNewsDetailComponent implements OnInit {

  trendingNewsId:number;
  trendingNewsDetail:any;
  trendingNewsImgSrcPath: string;

offerAdsList: Array<any> = [];
 offerAdsImgSrcPath: string = '';



  constructor(
    private shareService: ShareService,
    private trendingNewsService: TrendingNewsService,
    private activatedRoute: ActivatedRoute,
    private offerAdsService: OfferAdsService,
    private spinner: NgxSpinnerService,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.trendingNewsImgSrcPath =  environment.apiendpoint + 'Uploads/Home/TrendingNews/image/';
    this.offerAdsImgSrcPath =  environment.apiendpoint + 'Uploads/OfferAds/image/';
    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.trendingNewsId = param.trendingNewsId;
       this.trendingNewsService.GetTrendingNewsDetailByTrendingNewsId(this.trendingNewsId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.trendingNewsDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
    this.GetAllOfferAdsByPageId(3005);
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



