import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { InterviewInWhatsnewService } from 'src/app/providers/InterviewInWhatsNew/interview-in-whatsnew.service';

@Component({
  selector: 'app-interview-in-whats-new-detail',
  templateUrl: './interview-in-whats-new-detail.component.html',
  styleUrls: ['./interview-in-whats-new-detail.component.css']
})
export class InterviewInWhatsNewDetailComponent implements OnInit {

  interviewId:number;
  interviewDetail:any;
  interviewImgSrcPath: string;
  constructor(
    private shareService: ShareService,
    private interviewInWhatsnewService: InterviewInWhatsnewService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.interviewImgSrcPath =  environment.apiendpoint + 'Uploads/InterviewsInWhatsNew/image/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.interviewId = param.interviewId;
       this.interviewInWhatsnewService.GetInterviewsInWhatsNewDetailByInterviewsId(this.interviewId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.interviewDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
  }


}
