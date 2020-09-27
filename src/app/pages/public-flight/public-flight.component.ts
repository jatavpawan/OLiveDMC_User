import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'  
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/model/ResponseModel';
import { BannerService } from 'src/app/providers/BannerService/banner.service';
import { catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { BookingService } from 'src/app/providers/BookingService/booking.service';
import * as moment from 'moment';

@Component({
  selector: 'app-public-flight',
  templateUrl: './public-flight.component.html',
  styleUrls: ['./public-flight.component.css']
})
export class PublicFlightComponent implements OnInit {

  bannerImgsrcpath: string = "";
  bannerDetail: any;
  apiendpoint: string = environment.apiendpoint;
  formpopup: boolean = false;

  minDepartureDate: Date;
  maxDepartureDate: Date;
  minReturnDate: Date;
  maxReturnDate: Date;
  leavingFromAirports: Observable<any[]>;
  goingToAirports: Observable<any[]>;
  leavingFromAirports1: Observable<any[]>;
  goingToAirports1: Observable<any[]>;
  leavingFromAirports2: Observable<any[]>;
  goingToAirports2: Observable<any[]>;
  travelType:string = 'oneway';

  flightForm: FormGroup;
  multiCityFlightForm: FormGroup;
  submitFlightForm: boolean = false;

  constructor( 
    private  shareService: ShareService,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    
  ) {

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDate = new Date().getDate();


    this.minDepartureDate = new Date();
    this.maxDepartureDate = new Date(currentYear + 1, currentMonth, currentDate);
    this.minReturnDate = new Date();
    this.maxReturnDate = new Date(currentYear + 1, currentMonth, currentDate);
    
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

  this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';

   this.flightForm = this.formBuilder.group({
    leavingFrom: ['', Validators.required],
    goingTo: ['', Validators.required],
    departureDate: ['', Validators.required],
    returnDate: ['', Validators.required],
    travelInfo: ['1 Adult, Economy'],
    adults: ['1'],
    childs: ['0'],
    infants: ['0'],
    travelClass: ['Economy'],
   })

   this.multiCityFlightForm = this.formBuilder.group({
    leavingFrom1: ['', Validators.required],
    goingTo1: ['', Validators.required],
    departureDate1: ['', Validators.required],
    leavingFrom2: ['', Validators.required],
    goingTo2: ['', Validators.required],
    departureDate2: ['', Validators.required],
    travelInfo: ['1 Adult, Economy'],
    adults: ['1'],
    childs: ['0'],
    infants: ['0'],
    travelClass: ['Economy'],
    otherflights :  this.formBuilder.array([])
   })

   this.flightForm.get('returnDate').disable()

  // window.opener("https://www.youtube.com/", "_blank");
  // window.open("https://www.youtube.com/", "_blank");
  // window.location.href = 'https://www.youtube.com/';
  // https://www.packngoholidays.com/DomesticOneWayMain.aspx?
  // from=DEL&to=IDR&departure_date=26/09/2020&adults=1&childs=2&infants=1&class=Economy

/*   https://www.packngoholidays.com/DomesticReturnMain.aspx?
  from=DEL&to=IDR&departure_date=24/09/2020&return_date=25/09/2020&adults=1&childs=2&infants=1&class=Economy */
  }

  get f() { return this.multiCityFlightForm.controls; }
  get t() { return this.f.otherflights as FormArray; }

  ngOnInit(): void {

    this.leavingFromAirports = this.flightForm.get('leavingFrom').valueChanges
    .pipe(
      startWith(''),
      debounceTime(400),
      // distinctUntilChanged(),
      switchMap(val => {
        if(val.length>=1 && val.length <= 12){
          return this.filter(val || '')
        }
        else{
          return [];
        }
      })       
    );

    
    this.goingToAirports = this.flightForm.get('goingTo').valueChanges
    .pipe(
      startWith(''),
      debounceTime(400),
      // distinctUntilChanged(),
      switchMap(val => {
        if(val.length>=1 && val.length <= 12){
          return this.filter(val || '')
        }
        else{
          return [];
        }
      })       
    );

    this.leavingFromAirports1 = this.multiCityFlightForm.get('leavingFrom1').valueChanges
    .pipe(
      startWith(''),
      debounceTime(400),
      switchMap(val => {
        if(val.length>=1 && val.length <= 12){
          return this.filter(val || '')
        }
        else{
          return [];
        }
      })       
    );

    
    this.goingToAirports1 = this.multiCityFlightForm.get('goingTo1').valueChanges
    .pipe(
      startWith(''),
      debounceTime(400),
      switchMap(val => {
        if(val.length>=1 && val.length <= 12){
          return this.filter(val || '')
        }
        else{
          return [];
        }
      })       
    );

    this.leavingFromAirports2 = this.multiCityFlightForm.get('leavingFrom2').valueChanges
    .pipe(
      startWith(''),
      debounceTime(400),
      switchMap(val => {
        if(val.length>=1 && val.length <= 12){
          return this.filter(val || '')
        }
        else{
          return [];
        }
      })       
    );

    
    this.goingToAirports2 = this.multiCityFlightForm.get('goingTo2').valueChanges
    .pipe(
      startWith(''),
      debounceTime(400),
      switchMap(val => {
        if(val.length>=1 && val.length <= 12){
          return this.filter(val || '')
        }
        else{
          return [];
        }
      })       
    );

    
    this.getBannerDetail(2002);
  }

  filter(val: string): Observable<any[]> { // its working 
    // call the service which makes the http-request
    return this.bookingService.GetCityandAirportDetails({'prefixText':val, 'count': 20})
     .pipe(
       map(response => response['d'])
     )
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

  formPopupValueChange(){

    let adults = this.flightForm.get('adults').value;
    let childs = this.flightForm.get('childs').value;
    let infants = this.flightForm.get('infants').value;
    let travelClass = this.flightForm.get('travelClass').value;
    
    let mixValue = adults+' Adult';
   
    if( parseInt(childs) >=1 ){
      mixValue += ', '+childs+' Child';
    }
    if(parseInt(infants) >=1){
      mixValue += ', '+infants+' Infant';
    }
      
    mixValue += ', '+travelClass;

    this.flightForm.get('travelInfo').setValue(mixValue);
  }

  
  flightInfoSubmit() {
    debugger;


     // https://www.packngoholidays.com/DomesticOneWayMain.aspx?
  // from=DEL&to=IDR&departure_date=26/09/2020&adults=1&childs=2&infants=1&class=Economy

  /*   https://www.packngoholidays.com/DomesticReturnMain.aspx?
  from=DEL&to=IDR&departure_date=24/09/2020&return_date=25/09/2020&adults=1&childs=2&infants=1&class=Economy */
    
   

    if (this.flightForm.valid) {
      let travelType = this.travelType;
      let leavingFrom = this.flightForm.get('leavingFrom').value;
      let goingTo = this.flightForm.get('goingTo').value;
      let departureDate = this.flightForm.get('departureDate').value;
      let returnDate = this.flightForm.get('returnDate').value;   
      let adults = this.flightForm.get('adults').value;
      let childs = this.flightForm.get('childs').value;
      let infants = this.flightForm.get('infants').value;
      let travelClass = this.flightForm.get('travelClass').value;   
     

      // post.postTimeFromNow = moment(post.updatedDate).fromNow();

   leavingFrom = leavingFrom.substring(
    leavingFrom.lastIndexOf("(") + 1, 
    leavingFrom.lastIndexOf(")")
    ).toUpperCase();

  goingTo = goingTo.substring(
    goingTo.lastIndexOf("(") + 1, 
    goingTo.lastIndexOf(")")
  ).toUpperCase();

  departureDate = moment(departureDate).format('DD/MM/YYYY');
  returnDate = moment(returnDate).format('DD/MM/YYYY');
  let url;
  if(travelType == "oneway"){
    url = `https://www.packngoholidays.com/DomesticOneWayMain.aspx?from=${leavingFrom}&to=${goingTo}&departure_date=${departureDate}&adults=${adults}&childs=${childs}&infants=${infants}&class=${travelClass}`
  }
  else if(travelType == "roundtrip"){
    url = `https://www.packngoholidays.com/DomesticReturnMain.aspx?from=${leavingFrom}&to=${goingTo}&departure_date=${departureDate}&return_date=${returnDate}&adults=${adults}&childs=${childs}&infants=${infants}&class=${travelClass}`
  }
  else{
    url = `https://www.packngoholidays.com/DomesticOneWayMain.aspx?from=${leavingFrom}&to=${goingTo}&departure_date=${departureDate}&adults=${adults}&childs=${childs}&infants=${infants}&class=${travelClass}`
  }

  
  window.open(url, "_blank");

    }
    else {
      this.submitFlightForm = true;
    }
  }

  resetLeavingFrom(){
    this.flightForm.get('leavingFrom').setValue('');
  }

  resetGoingTo(){
    this.flightForm.get('goingTo').setValue('');
  }

  changeInTravelType(){
    debugger;
    console.log(this.travelType);
    if(this.travelType == 'roundtrip') {
      this.flightForm.get('returnDate').enable()
    }
    else{
      this.flightForm.get('returnDate').disable()
    }
  }

  changeInDepartureDate(){
    debugger;

    // if(this.travelType == 'roundtrip') {
      
      console.log(this.flightForm.get('departureDate').value)
      this.minReturnDate = new Date(this.flightForm.get('departureDate').value);
      let currentYear = this.minReturnDate.getFullYear();
      let currentMonth = this.minReturnDate.getMonth();
      let currentDate = this.minReturnDate.getDate();
      this.maxReturnDate = new Date(currentYear + 1, currentMonth, currentDate);
  
      var a = moment(this.flightForm.get('departureDate').value);
      var b = moment(this.flightForm.get('returnDate').value);
      let diff = b.diff(a, 'days');

     if (diff < 0){
        this.flightForm.get('returnDate').setValue(this.flightForm.get('departureDate').value);
      }

    // }
  }
  
  

}
