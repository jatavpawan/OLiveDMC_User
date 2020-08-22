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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private travelUtilityService: TravelUtilityService,
    public dialogRef: MatDialogRef<TravelUtilityFormComponent>

  ) {
    this.utilityForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      message: ['', Validators.required],
      travelUtilityType: [''],
    })

    this.utilityForm.get('travelUtilityType').setValue(data);
  }

  ngOnInit(): void {
  }


  submitUtilityData() {
    debugger;
    this.submitUtilityForm = false;

    if (this.utilityForm.valid) {
      console.log("this.utilityForm.value", this.utilityForm.value);

      this.closeDialog();
      this.spinner.show();
      this.travelUtilityService.AddUpdateTravelUtilityQuery(this.utilityForm.value).subscribe(resp => {
        this.spinner.hide();
        if (resp.status == Status.Success) {
          Swal.fire('', resp.message,'success');
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
