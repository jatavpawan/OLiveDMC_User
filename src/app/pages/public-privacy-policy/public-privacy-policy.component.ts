import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'  
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/model/ResponseModel';
import { BannerService } from 'src/app/providers/BannerService/banner.service';
import { PrivacyPolicyService } from 'src/app/providers/PrivacyPolicyService/privacy-policy.service';

@Component({
  selector: 'app-public-privacy-policy',
  templateUrl: './public-privacy-policy.component.html',
  styleUrls: ['./public-privacy-policy.component.css']
})
export class PublicPrivacyPolicyComponent implements OnInit {

  bannerImgsrcpath: string = "";
  bannerDetail: any;
  apiendpoint: string = environment.apiendpoint;
  privacyPolicyDescription: string = '';
  privacyPolicyData: any;


 
  constructor( 
    private  shareService: ShareService,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
    private privacyPolicyService: PrivacyPolicyService,
    
  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

  this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';

  }

  ngOnInit(): void {
    this.getBannerDetail(2013);
    this.loadPrivacyPolicy();
  }

  
 getBannerDetail(pageId){
    debugger;
    this.bannerService.GetBannerDetailByPageId(pageId).subscribe(resp=>{
      if(resp.status == Status.Success){
        this.bannerDetail = resp.data;
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }

  loadPrivacyPolicy(){
    debugger;
      this.spinner.show();
      this.privacyPolicyService.GetPrivacyPolicyDetail().subscribe(resp =>{
        this.spinner.hide();
          if(resp.status == Status.Success && resp.data != null && resp.data.length != 0  ){
             this.privacyPolicyDescription = resp.data[0].description;
             this.privacyPolicyData = resp.data[0];
          }
     })
  }

}
