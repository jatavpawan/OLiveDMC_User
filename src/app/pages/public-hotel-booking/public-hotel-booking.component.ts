import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { BannerService } from 'src/app/providers/BannerService/banner.service';
import Swal from 'sweetalert2';
import { Status } from 'src/app/model/ResponseModel';

@Component({
  selector: 'app-public-hotel-booking',
  templateUrl: './public-hotel-booking.component.html',
  styleUrls: ['./public-hotel-booking.component.css']
})
export class PublicHotelBookingComponent implements OnInit {

  bannerImgsrcpath: string = "";
  bannerDetail: any;
  apiendpoint: string = environment.apiendpoint;
 
  constructor( 
    private  shareService: ShareService,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
    
  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

  this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';

  }

  ngOnInit(): void {
    this.getBannerDetail(2003);
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

}
