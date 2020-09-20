import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Status } from 'src/app/model/ResponseModel';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { TravelUtilityService } from 'src/app/providers/TravelUtilityService/travel-utility.service';

@Component({
  selector: 'app-travel-utility-form',
  templateUrl: './travel-utility-form.component.html',
  styleUrls: ['./travel-utility-form.component.css']
})
export class TravelUtilityFormComponent implements OnInit {

  utilityForm: FormGroup;
  submitUtilityForm: boolean = false;
  travelDateRequiredError: boolean = false;
  utilityType: string = '';
  utilityId: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private travelUtilityService: TravelUtilityService,
    public dialogRef: MatDialogRef<TravelUtilityFormComponent>

  ) {
    debugger;
    this.utilityForm = this.formBuilder.group({
      travelUtilityTypeId: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      startCountry: ['', Validators.required],
      destinationCountry: ['', Validators.required],
      dateOfTravel: [''],
    })

    if(this.data != undefined ){
      this.utilityForm.get('travelUtilityTypeId').setValue(this.data.id);
      this.utilityType = this.data.utilityType; 
      this.utilityId = this.data.id; 
    }

  }

  ngOnInit(): void {
  }


  submitUtilityData() {
    debugger;
    this.submitUtilityForm = false;

    
    if(this.data != undefined && (this.data.id == 8 || this.data.id == 1) && this.utilityForm.get('dateOfTravel').value == ''  ){
      this.travelDateRequiredError = true;
    }
    else{
      this.travelDateRequiredError = false;
    }

    if (this.utilityForm.valid && this.travelDateRequiredError == false) {
      console.log("this.utilityForm.value", this.utilityForm.value);

      this.spinner.show();
      this.travelUtilityService.AddUpdateTravelUtilityQuery(this.utilityForm.value).subscribe(resp => {
        this.spinner.hide();
        if (resp.status == Status.Success) {
          Swal.fire('Submit', "Our Representative Will Contact You Soon",'success');
        }
        else {
          Swal.fire('Oops...', resp.message, 'warning');
        }
          this.closeDialog();
      })
    }
    else {
      this.submitUtilityForm = true;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
