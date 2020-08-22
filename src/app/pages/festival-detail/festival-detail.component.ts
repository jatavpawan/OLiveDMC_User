import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { FestivalService } from 'src/app/providers/FestivalService/festival.service';

@Component({
  selector: 'app-festival-detail',
  templateUrl: './festival-detail.component.html',
  styleUrls: ['./festival-detail.component.css']
})
export class FestivalDetailComponent implements OnInit {

  festivalId:number;
  festivalDetail:any;
  festivalImgSrcPath: string;
  constructor(
    private shareService: ShareService,
    private festivalService: FestivalService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.festivalImgSrcPath =  environment.apiendpoint + 'Uploads/Festival/image/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.festivalId = param.festivalId;
       this.festivalService.GetFestivalDetailByFestivalId(this.festivalId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.festivalDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
  }


}
