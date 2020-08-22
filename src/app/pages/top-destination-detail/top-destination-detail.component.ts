import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { TopDestinationService } from 'src/app/providers/TopDestination/top-destination.service';

@Component({
  selector: 'app-top-destination-detail',
  templateUrl: './top-destination-detail.component.html',
  styleUrls: ['./top-destination-detail.component.css']
})
export class TopDestinationDetailComponent implements OnInit {

  topDestinationId:number;
  topDestinationDetail:any;
  topDestinationImgSrcPath: string;
  constructor(
    private shareService: ShareService,
    private topDestinationService: TopDestinationService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.topDestinationImgSrcPath =  environment.apiendpoint + 'Uploads/Home/TopDestination/image/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.topDestinationId = param.topDestinationId;
       this.topDestinationService.GetTopDestinationDetailByTopDestinationId(this.topDestinationId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.topDestinationDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
  }


}
