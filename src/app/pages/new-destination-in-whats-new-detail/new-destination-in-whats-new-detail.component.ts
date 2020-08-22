import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { NewdestinationInWhatsnewService } from 'src/app/providers/NewDestinationsInWhatsNew/newdestination-in-whatsnew.service';

@Component({
  selector: 'app-new-destination-in-whats-new-detail',
  templateUrl: './new-destination-in-whats-new-detail.component.html',
  styleUrls: ['./new-destination-in-whats-new-detail.component.css']
})
export class NewDestinationInWhatsNewDetailComponent implements OnInit {

  newDestinationId:number;
  newDestinationDetail:any;
  newDestinationImgSrcPath: string;
  constructor(
    private shareService: ShareService,
    private newdestinationInWhatsnewService: NewdestinationInWhatsnewService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.newDestinationImgSrcPath =  environment.apiendpoint + 'Uploads/NewDestinationsInWhatsNew/image/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.newDestinationId = param.newDestinationId;
       this.newdestinationInWhatsnewService.GetNewDestinationsInWhatsNewDetailByDestinationsId(this.newDestinationId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.newDestinationDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
  }


}
