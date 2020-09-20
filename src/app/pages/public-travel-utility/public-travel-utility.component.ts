import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'  
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/model/ResponseModel';
import { BannerService } from 'src/app/providers/BannerService/banner.service';
import { TravelUtilityService } from 'src/app/providers/TravelUtilityService/travel-utility.service';
import { MatDialog } from '@angular/material/dialog';
import { TravelUtilityFormComponent } from '../travel-utility-form/travel-utility-form.component';

@Component({
  selector: 'app-public-travel-utility',
  templateUrl: './public-travel-utility.component.html',
  styleUrls: ['./public-travel-utility.component.css']
})
export class PublicTravelUtilityComponent implements OnInit {

  utilities: Array<any> = [];
  bannerImgsrcpath: string = "";
  utilityImgsrcPath: string = "";
  bannerDetail: any;
  apiendpoint: string = environment.apiendpoint;

 
  constructor( 
    private  shareService: ShareService,
    private  travelUtilityService: TravelUtilityService,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
    private dialog: MatDialog
  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

  this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';
  this.utilityImgsrcPath = this.apiendpoint + 'Uploads/Utility/image/';

  }

  ngOnInit(): void {
    this.getBannerDetail(2006);
    this.GetAllUtility();
  }

  
  openDialog(utility) {
    debugger;
    const dialogRef = this.dialog.open(TravelUtilityFormComponent,
      {
        // panelClass: 'video-dialog-container',
        hasBackdrop: false,
        data: utility,
        panelClass: 'my-centered-dialog',
        width: '550px',
        // maxWidth: 80vw;
        // maxWidth: '800px',
        // maxHeight: '95vh',
        // minWidth: '798px',
        // minHeight: '75vh',
        // max-width: 800px;
        // width: 100%;

      });

      // this.dialog.open(MyComponent, {
      //   panelClass: 'my-centered-dialog',
      //   width: '512px'
      // });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    
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
  GetAllUtility(){
    debugger;
    this.travelUtilityService.GetAllUtility().subscribe(resp=>{
      if(resp.status == Status.Success){
        this.utilities = resp.data;
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }

}
