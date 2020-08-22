import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { FaqService } from 'src/app/providers/FAQ/faq.service';
// import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Status } from 'src/app/model/ResponseModel';
import Swal from 'sweetalert2'
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { BannerService } from 'src/app/providers/BannerService/banner.service';

declare var $: any;

@Component({
  selector: 'app-public-faq',
  templateUrl: './public-faq.component.html',
  styleUrls: ['./public-faq.component.css']
})
export class PublicFaqComponent implements OnInit {

  faqs:Array<any> =[];
  leftFaqs:Array<any> =[];
  rightFaqs:Array<any> =[];
  bannerImgsrcpath: string = "";
   bannerDetail: any;
   apiendpoint: string = environment.apiendpoint;

  constructor(
    private  faqService: FaqService, 
    private  router: Router, 
    private  shareService: ShareService,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
  ) {

      this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

      this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';
   }

  ngOnInit(): void {
     //ACCORDION WITH TOGGLE ICONS//
     this.getBannerDetail(2014);

     function toggleIcon(e) {
      $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('fa fa-plus fa fa-minus');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);
    this.GetAllFaq();
  }

  GetAllFaq(){
    debugger;
    this.faqService.GetAllFaq().subscribe(resp=>{
      if(resp.status == Status.Success){
        debugger;
          this.faqs = resp.data;
          if(this.faqs != undefined && this.faqs.length != 0 ){
            this.faqs.forEach( (faq, i) => {
                if( i<= 4 ){
                   this.leftFaqs = [...this.leftFaqs , faq]; 
                }
                else if( i>= 5 && i<= 9 ){
                  this.rightFaqs = [...this.rightFaqs , faq] 
                }
            });
          }  
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      // this.spinner.hide();
    })    
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
