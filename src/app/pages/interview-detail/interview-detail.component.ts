import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { InterviewService } from 'src/app/providers/Interview/interview.service';

@Component({
  selector: 'app-interview-detail',
  templateUrl: './interview-detail.component.html',
  styleUrls: ['./interview-detail.component.css']
})
export class InterviewDetailComponent implements OnInit {

  interviewId:number;
  interviewDetail:any;
  interviewImgSrcPath: string;
  constructor(
    private shareService: ShareService,
    private interviewService: InterviewService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.interviewImgSrcPath =  environment.apiendpoint + 'Uploads/Home/Interview/image/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.interviewId = param.interviewId;
       this.interviewService.GetInterviewDetailByInterviewId(this.interviewId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.interviewDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
  }


}
