import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Status } from 'src/app/model/ResponseModel';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { TravelUtilityService } from 'src/app/providers/TravelUtilityService/travel-utility.service';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { BookingService } from 'src/app/providers/BookingService/booking.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

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
  startCountries: Observable<any[]>;
  destinationCountries: Observable<any[]>;
  minDate: Date;
  maxDate: Date;

  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates, CountryISO.UnitedKingdom,CountryISO.Canada];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private travelUtilityService: TravelUtilityService,
    private bookingService: BookingService,
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

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDate = new Date().getDate();

    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, currentMonth, currentDate);

  }

  ngOnInit(): void {
    this.startCountries = this.utilityForm.get("startCountry").valueChanges.pipe(
      startWith(""),
      debounceTime(400),
      switchMap((val) => {
        if (val.length >= 1 && val.length <= 12) {
          return this.GetHotelCountryDetails(val || "");
        } else {
          return [];
        }
      })
    );

    this.destinationCountries = this.utilityForm.get("destinationCountry").valueChanges.pipe(
      startWith(""),
      debounceTime(400),
      switchMap((val) => {
        if (val.length >= 1 && val.length <= 12) {
          return this.GetHotelCountryDetails(val || "");
        } else {
          return [];
        }
      })
    );
  }

  GetHotelCountryDetails(val: string): Observable<any[]> {
    // its working
    // call the service which makes the http-request
    return this.bookingService
      .GetLocationList({ prefixText: val, count: 20,Listfor:'CountryForHotel' })
      .pipe(
        map((response) => {
          return response.data;
        })
      );
  }

  displayNationalityProperty(value) {
    if (value) {
      return value.split("-")[0];
    }
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
      let mobileNo =  this.utilityForm.get('mobile').value.e164Number;
      let startCountry =  this.utilityForm.get('startCountry').value;
      let destinationCountry = this.utilityForm.get('destinationCountry').value;
      startCountry = startCountry.split('-')[0];
      destinationCountry = destinationCountry.split('-')[0];
      this.utilityForm.get('startCountry').setValue(startCountry);
      this.utilityForm.get('destinationCountry').setValue(destinationCountry);
      this.utilityForm.get('mobile').setValue(mobileNo);

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

  resetStartCountry() {
    this.utilityForm.get("startCountry").setValue("");
  }

  resetDestinationCountry() {
    this.utilityForm.get("destinationCountry").setValue("");
  }


}
