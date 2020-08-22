import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';

@Component({
  selector: 'app-public-event-details',
  templateUrl: './public-event-details.component.html',
  styleUrls: ['./public-event-details.component.css']
})
export class PublicEventDetailsComponent implements OnInit {

  blogId:number;
  blogDetail:any;
  blogImgSrcPath: string;
  constructor(
    private shareService: ShareService,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,

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

  }

  ngOnInit(): void {
  }


}
