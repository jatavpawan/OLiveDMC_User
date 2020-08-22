import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { ThemeService } from 'src/app/providers/theme.service';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.css']
})
export class ThemeDetailComponent implements OnInit {

  themeId:number;
  themeDetail:any;
  themeImgSrcPath: string;
  constructor(
    private shareService: ShareService,
    private themeService: ThemeService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);
    
    this.themeImgSrcPath =  environment.apiendpoint + 'Uploads/TourTheme/image/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.themeId = param.themeId;
       this.themeService.GetThemeDetailByThemeId(this.themeId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.themeDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
  }


}
