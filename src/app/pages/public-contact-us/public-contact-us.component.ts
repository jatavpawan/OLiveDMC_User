import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Status } from 'src/app/model/ResponseModel';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactUsService } from 'src/app/providers/ContactUsService/contact-us.service';
import { BannerService } from 'src/app/providers/BannerService/banner.service';
import { environment } from 'src/environments/environment';
import { ShareService } from 'src/app/providers/sharedService/share.service';

@Component({
  selector: 'app-public-contact-us',
  templateUrl: './public-contact-us.component.html',
  styleUrls: ['./public-contact-us.component.css']
})
export class PublicContactUsComponent implements OnInit {

  contactUsForm: FormGroup;
  submitContactUsForm: boolean = false;
  bannerImgsrcpath: string = "";
  bannerDetail: any;
  apiendpoint: string = environment.apiendpoint;
  cities2 = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    // {id: 3, name: 'Pavilnys', disabled: true},
    {id: 3, name: 'Pavilnys'},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
  ];
  selectedCityIds: string[];
  

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private contactUsService: ContactUsService,
    private  bannerService: BannerService,
    private  shareService: ShareService,


  ) {
    this.contactUsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    })

    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';

  }

  ngOnInit(): void {
    this.getBannerDetail(2012);
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


  submitContactUsData() {
    debugger;
    this.submitContactUsForm = false;

    if (this.contactUsForm.valid) {
      console.log("this.contactUsForm.value", this.contactUsForm.value);

      this.spinner.show();
      this.contactUsService.AddUpdateContactUs(this.contactUsForm.value).subscribe(resp => {
        this.spinner.hide();
        if (resp.status == Status.Success) {
          Swal.fire('', resp.message,'success');
          this.resetContactUsForm();
        }
        else {
          Swal.fire('Oops...', resp.message, 'warning');
          this.resetContactUsForm();
        }
      })
    }
    else {
      this.submitContactUsForm = true;
    }
  }

  resetContactUsForm(){
    this.contactUsForm.setValue({
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      message: '',
    })
  }

}
