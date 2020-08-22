import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { EventService } from 'src/app/providers/EventService/event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  eventId:number;
  eventDetail:any;
  eventImgSrcPath: string;
  eventVideoSrcPath: string;
  constructor(
    private shareService: ShareService,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.eventImgSrcPath =  environment.apiendpoint + 'Uploads/Event/image/';
    this.eventVideoSrcPath =  environment.apiendpoint + 'Uploads/Event/Video/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.eventId = param.eventId;
       this.eventService.GetEventDetailByEventId(this.eventId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.eventDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
  }


}
