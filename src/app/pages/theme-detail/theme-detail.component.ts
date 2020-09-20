import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { ThemeService } from 'src/app/providers/theme.service';
import Swal from 'sweetalert2';
import { OfferAdsService } from 'src/app/providers/OfferAdsService/offer-ads.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.css']
})
export class ThemeDetailComponent implements OnInit {

  themeId:number;
  themeDetail:any;
  themeImgSrcPath: string = '';

offerAdsList: Array<any> = [];
 offerAdsImgSrcPath: string = '';


  constructor(
    private shareService: ShareService,
    private themeService: ThemeService,
    private activatedRoute: ActivatedRoute,
    private offerAdsService: OfferAdsService,
    private spinner: NgxSpinnerService,
  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);
    
    this.themeImgSrcPath =  environment.apiendpoint + 'Uploads/TourTheme/image/';
    this.offerAdsImgSrcPath =  environment.apiendpoint + 'Uploads/OfferAds/image/';

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
    this.GetAllOfferAdsByPageId(3003);

  }

  

GetAllOfferAdsByPageId(pageId){
  debugger;
  this.spinner.show();
  this.offerAdsService.GetAllOfferAdsByPageId(pageId).subscribe(resp=>{
    if(resp.status == Status.Success){
      this.offerAdsList = resp.data;
    } 
    else{
      Swal.fire('Oops...', resp.message, 'error');
    }
    this.spinner.hide();
  })    
}


}
