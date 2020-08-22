import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { TrendingNewsService } from 'src/app/providers/TrendingNews/trending-news.service';

@Component({
  selector: 'app-trending-news-detail',
  templateUrl: './trending-news-detail.component.html',
  styleUrls: ['./trending-news-detail.component.css']
})
export class TrendingNewsDetailComponent implements OnInit {

  trendingNewsId:number;
  trendingNewsDetail:any;
  trendingNewsImgSrcPath: string;
  constructor(
    private shareService: ShareService,
    private trendingNewsService: TrendingNewsService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.trendingNewsImgSrcPath =  environment.apiendpoint + 'Uploads/Home/TrendingNews/image/';

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
  }


}



