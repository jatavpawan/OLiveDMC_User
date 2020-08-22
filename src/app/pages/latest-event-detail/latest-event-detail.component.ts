import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { LatestEventService } from 'src/app/providers/LatestEventService/latest-event.service';

@Component({
  selector: 'app-latest-event-detail',
  templateUrl: './latest-event-detail.component.html',
  styleUrls: ['./latest-event-detail.component.css']
})
export class LatestEventDetailComponent implements OnInit {

  latestEventId:number;
  latestEventDetail:any;
  latestEventImgSrcPath: string;
  constructor(
    private shareService: ShareService,
    private latestEventService: LatestEventService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.latestEventImgSrcPath =  environment.apiendpoint + 'Uploads/LatestEvent/image/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.latestEventId = param.latestEventId;
       this.latestEventService.GetLatestEventDetailByEventId(this.latestEventId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.latestEventDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
  }


}
