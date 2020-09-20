import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';

@Component({
  selector: 'app-public-career',
  templateUrl: './public-career.component.html',
  styleUrls: ['./public-career.component.css']
})
export class PublicCareerComponent implements OnInit {

  careerPerson =  "student"
  // selectPerson: string = "student";

  constructor( private  shareService: ShareService, ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

  }

  ngOnInit(): void {
  }

  changePersonIdentity(person){
    debugger;
    this.careerPerson = person.value;
  }

}
