import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Status } from 'src/app/model/ResponseModel';
import { environment } from 'src/environments/environment';
import { OfferAdsService } from 'src/app/providers/OfferAdsService/offer-ads.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blogId:number;
  blogDetail:any;
  blogImgSrcPath: string;
  offerAdsList: Array<any> = [];
  constructor(
    private shareService: ShareService,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private offerAdsService: OfferAdsService,
    private spinner: NgxSpinnerService,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.blogImgSrcPath =  environment.apiendpoint + 'Uploads/Blog/image/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.blogId = param.blogId;
       this.blogService.GetBlogDetailByBlogId(this.blogId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.blogDetail =  resp.data;
           }
       })
    })
    this.GetAllOfferAdsByPageId(3002);


  }

  ngOnInit(): void {
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
