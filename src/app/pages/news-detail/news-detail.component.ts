import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { NewsService } from 'src/app/providers/NewsService/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {

  newsId:number;
  newsDetail:any;
  newsImgSrcPath: string;
  newsVideoSrcPath: string;
  constructor(
    private shareService: ShareService,
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.newsImgSrcPath =  environment.apiendpoint + 'Uploads/News/image/';
    this.newsVideoSrcPath =  environment.apiendpoint + 'Uploads/News/Video/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.newsId = param.newsId;
       this.newsService.GetNewsDetailByNewsId(this.newsId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.newsDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
  }


}
