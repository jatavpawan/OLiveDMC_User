import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { DestinationVideosService } from 'src/app/providers/DestinationVideos/destination-videos.service';

@Component({
  selector: 'app-destination-videos-detail',
  templateUrl: './destination-videos-detail.component.html',
  styleUrls: ['./destination-videos-detail.component.css']
})
export class DestinationVideosDetailComponent implements OnInit {

  destinationVideosId:number;
  destinationVideosDetail:any;
  destinationVideosImgSrcPath: string;
  constructor(
    private shareService: ShareService,
    private destinationVideosService: DestinationVideosService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.destinationVideosImgSrcPath =  environment.apiendpoint + 'Uploads/Home/DestinationVideos/image/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.destinationVideosId = param.destinationVideosId;
       this.destinationVideosService.GetDestinationVideosDetailByDestinationVideosId(this.destinationVideosId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.destinationVideosDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
  }


}
