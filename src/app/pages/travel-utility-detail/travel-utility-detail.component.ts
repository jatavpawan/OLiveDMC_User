import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { FestivalService } from 'src/app/providers/FestivalService/festival.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Status } from 'src/app/model/ResponseModel';
import { TravelUtilityService } from 'src/app/providers/TravelUtilityService/travel-utility.service';

@Component({
  selector: 'app-travel-utility-detail',
  templateUrl: './travel-utility-detail.component.html',
  styleUrls: ['./travel-utility-detail.component.css']
})
export class TravelUtilityDetailComponent implements OnInit {

 
  utilityType:number;
  utilityDetail:any;
  utilityImgSrcPath: string;
  constructor(
    private shareService: ShareService,
    private travelUtilityService: TravelUtilityService,
    private activatedRoute: ActivatedRoute,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.utilityImgSrcPath =  environment.apiendpoint + 'Uploads/Utility/image/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.utilityType = param.utilityType;
       this.travelUtilityService.getUtilityDetailByUtilityType(this.utilityType).subscribe(resp => {
           if(resp.status == Status.Success){
            this.utilityDetail =  resp.data;
           }
       })
    })

  }

  ngOnInit(): void {
  }


}
