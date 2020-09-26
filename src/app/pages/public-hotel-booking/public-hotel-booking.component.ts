import { Component, OnInit } from "@angular/core";
import { ShareService } from "src/app/providers/sharedService/share.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
import { Status } from "src/app/model/ResponseModel";
import { BannerService } from "src/app/providers/BannerService/banner.service";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from "rxjs/operators";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { BookingService } from "src/app/providers/BookingService/booking.service";
import * as moment from "moment";

@Component({
  selector: "app-public-hotel-booking",
  templateUrl: "./public-hotel-booking.component.html",
  styleUrls: ["./public-hotel-booking.component.css"],
})
export class PublicHotelBookingComponent implements OnInit {
  bannerImgsrcpath: string = "";
  bannerDetail: any;
  apiendpoint: string = environment.apiendpoint;
  formpopup: boolean = false;

  minCheckinDate: Date;
  maxCheckinDate: Date;
  minCheckoutDate: Date;
  maxCheckoutDate: Date;

  hotelForm: FormGroup;
  submitHotelForm: boolean = false;
  nationalities: Observable<any[]>;
  destinations: Observable<any[]>;
  extraRoom: number = 0;
  mixValue: string = "";

  constructor(
    private shareService: ShareService,
    private spinner: NgxSpinnerService,
    private bannerService: BannerService,
    private bookingService: BookingService,
    private formBuilder: FormBuilder
  ) {
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let currentDate = new Date().getDate();


    this.minCheckinDate = new Date();
    this.maxCheckinDate = new Date(currentYear + 1, currentMonth, currentDate);
    this.minCheckoutDate = new Date();
    this.maxCheckoutDate = new Date(currentYear + 1, currentMonth, currentDate);

    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.bannerImgsrcpath = this.apiendpoint + "Uploads/Banner/image/";

    this.hotelForm = this.formBuilder.group({
      nationality: ["", Validators.required],
      destination: ["", Validators.required],
      checkin: ["", Validators.required],
      checkout: ["", Validators.required],
      roomMemberInfo: ["Room 1: 1 Adt ,0 Chd"],
      // adults: ["1"],
      // childs: ["0"],
      room1_adults: ["1"],
      room1_childs: ["0"],
      room1_child1_age: ["1"],
      room1_child2_age: ["1"],
      room2_adults: ["1"],
      room2_childs: ["0"],
      room2_child1_age: ["1"],
      room2_child2_age: ["1"],
      room3_adults: ["1"],
      room3_childs: ["0"],
      room3_child1_age: ["1"],
      room3_child2_age: ["1"],
      room4_adults: ["1"],
      room4_childs: ["0"],
      room4_child1_age: ["1"],
      room4_child2_age: ["1"],
    });

    // window.opener("https://www.youtube.com/", "_blank");
    // window.open("https://www.youtube.com/", "_blank");
    // window.location.href = 'https://www.youtube.com/';
  }

  ngOnInit(): void {
    this.nationalities = this.hotelForm.get("nationality").valueChanges.pipe(
      startWith(""),
      debounceTime(400),
      // distinctUntilChanged(),
      switchMap((val) => {
        if (val.length >= 1 && val.length <= 12) {
          return this.GetHotelCountryDetails(val || "");
        } else {
          return [];
        }
      })
    );

    this.destinations = this.hotelForm.get("destination").valueChanges.pipe(
      startWith(""),
      debounceTime(400),
      // distinctUntilChanged(),
      switchMap((val) => {
        if (val.length >= 1 && val.length <= 12) {
          return this.GetHotelCityDetails(val || "");
        } else {
          return [];
        }
      })
    );

    this.getBannerDetail(2003);
  }

  GetHotelCountryDetails(val: string): Observable<any[]> {
    // its working
    // call the service which makes the http-request
    return this.bookingService
      .GetHotelCountryDetails({ prefixText: val, count: 20 })
      .pipe(
        map((response) => {
          return response["d"];
        })
      );
  }

  GetHotelCityDetails(val: string): Observable<any[]> {
    // its working
    // call the service which makes the http-request
    return this.bookingService
      .GetHotelCityDetails({ prefixText: val, count: 20 })
      .pipe(
        map((response) => {
          return response["d"];
        })
      );
  }

  getBannerDetail(pageId) {
    debugger;
    this.bannerService.GetBannerDetailByPageId(pageId).subscribe((resp) => {
      if (resp.status == Status.Success) {
        this.bannerDetail = resp.data;
      } else {
        Swal.fire("Oops...", resp.message, "error");
      }
      this.spinner.hide();
    });
  }

  formPopupValueChange() {
    let adults = this.hotelForm.get("room1_adults").value;
    let childs = this.hotelForm.get("room1_childs").value;

    this.mixValue = `Room 1:${adults} Adt ,${childs} Chd`;

    this.hotelForm.get("roomMemberInfo").setValue(this.mixValue);
  }

  hotelInfoSubmit() {
    debugger;

    if (this.hotelForm.valid) {
      let nationality = this.hotelForm.get("nationality").value;
      let destination = this.hotelForm.get("destination").value;
      let checkin = this.hotelForm.get("checkin").value;
      let checkout = this.hotelForm.get("checkout").value;
      
      let room1_adults = this.hotelForm.get("room1_adults").value;
      let room1_childs = this.hotelForm.get("room1_childs").value;
      let room1_child1_age = this.hotelForm.get("room1_child1_age").value;
      let room1_child2_age = this.hotelForm.get("room1_child2_age").value;
      let room2_adults = this.hotelForm.get("room2_adults").value;
      let room2_childs = this.hotelForm.get("room2_childs").value;
      let room2_child1_age = this.hotelForm.get("room2_child1_age").value;
      let room2_child2_age = this.hotelForm.get("room2_child2_age").value;
      let room3_adults = this.hotelForm.get("room3_adults").value;
      let room3_childs = this.hotelForm.get("room3_childs").value;
      let room3_child1_age = this.hotelForm.get("room3_child1_age").value;
      let room3_child2_age = this.hotelForm.get("room3_child2_age").value;
      let room4_adults = this.hotelForm.get("room4_adults").value;
      let room4_childs = this.hotelForm.get("room4_childs").value;
      let room4_child1_age = this.hotelForm.get("room4_child1_age").value;
      let room4_child2_age = this.hotelForm.get("room4_child2_age").value;


       if(room1_childs == 0){
        room1_child1_age = 0;
        room1_child2_age = 0;
       }  
       if(room2_childs == 0){
        room2_child1_age = 0;
        room2_child2_age = 0;
       }
       if(room3_childs == 0){
        room3_child1_age = 0;
        room3_child2_age = 0;
       }
       if(room4_childs == 0){
        room4_child1_age = 0;
        room4_child2_age = 0;
       }

       if(room1_childs == 1){
        room1_child2_age = 0;
       }  
       if(room2_childs == 1){
        room2_child2_age = 0;
       }
       if(room3_childs == 1){
        room3_child2_age = 0;
       }
       if(room4_childs == 1){
        room4_child2_age = 0;
       }

      let CountryName = nationality.split("-")[0];
      let CountryCode = nationality.split("-")[1];
      let tempCityId = destination.split("-")[1];
      let CityId = tempCityId.substring(0, tempCityId.lastIndexOf(","));
      let CityCode = destination.substring(0, 3);
      let CityShortName = destination.substring(0, destination.indexOf(","));
      let tempCityFullName = destination.split("-")[0];
      let CityFullName = tempCityFullName.split(', ').join(',');

      let TotalNoRoom= 1+this.extraRoom;
      
      var a = moment(checkin);
      var b = moment(checkout);
      let Nights = b.diff(a, 'days') // 1;
      
      checkin = moment(checkin).format("DD/MM/YYYY");
      checkout = moment(checkout).format("DD/MM/YYYY");

      let url="";
      if(this.extraRoom == 0){
        url = `https://www.packngoholidays.com/HotelListing.aspx?CountryName=${CountryName}&CountryCode=${CountryCode}&CityId=${CityId}&CityCode=${CityCode}&CityShortName=${CityShortName}&CityFullName=${CityFullName}&CheckInDate=${checkin}&CheckOutDate=${checkout}&TotalNoRoom=${TotalNoRoom}&Adult=${room1_adults}&Child=${room1_childs}&ChildAge=${room1_child1_age}-${room1_child2_age}-0&Nights=${Nights}&Nationality=${CountryCode}`;
      }
      else if(this.extraRoom == 1){
        url =`https://www.packngoholidays.com/HotelListing.aspx?CountryName=${CountryName}&CountryCode=${CountryCode}&CityId=${CityId}&CityCode=${CityCode}&CityShortName=${CityShortName}&CityFullName=${CityFullName}&CheckInDate=${checkin}&CheckOutDate=${checkout}&TotalNoRoom=${TotalNoRoom}&Adult=${room1_adults}-${room2_adults}&Child=${room1_childs}-${room2_childs}&ChildAge=${room1_child1_age}-${room1_child2_age}-0~${room2_child1_age}-${room2_child2_age}-0&Nights=${Nights}&Nationality=${CountryCode}`
      }
      else if(this.extraRoom == 2){
        url = `https://www.packngoholidays.com/HotelListing.aspx?CountryName=${CountryName}&CountryCode=${CountryCode}&CityId=${CityId}&CityCode=${CityCode}&CityShortName=${CityShortName}&CityFullName=${CityFullName}&CheckInDate=${checkin}&CheckOutDate=${checkout}&TotalNoRoom=${TotalNoRoom}&Adult=${room1_adults}-${room2_adults}-${room3_adults}&Child=${room1_childs}-${room2_childs}-${room3_childs}&ChildAge=${room1_child1_age}-${room1_child2_age}-0~${room2_child1_age}-${room2_child2_age}-0~${room3_child1_age}-${room3_child2_age}-0&Nights=${Nights}&Nationality=${CountryCode}`
      }
      else{
        url = `https://www.packngoholidays.com/HotelListing.aspx?CountryName=${CountryName}&CountryCode=${CountryCode}&CityId=${CityId}&CityCode=${CityCode}&CityShortName=${CityShortName}&CityFullName=${CityFullName}&CheckInDate=${checkin}&CheckOutDate=${checkout}&TotalNoRoom=${TotalNoRoom}&Adult=${room1_adults}-${room2_adults}-${room3_adults}-${room4_adults}&Child=${room1_childs}-${room2_childs}-${room3_childs}-${room4_childs}&ChildAge=${room1_child1_age}-${room1_child2_age}-0~${room2_child1_age}-${room2_child2_age}-0~${room3_child1_age}-${room3_child2_age}-0~${room4_child1_age}-${room4_child2_age}-0&Nights=${Nights}&Nationality=${CountryCode}`
      }


      window.open(url, "_blank");
    } else {
      this.submitHotelForm = true;
    }
  }

  resetNationality() {
    this.hotelForm.get("nationality").setValue("");
  }

  resetDestination() {
    this.hotelForm.get("destination").setValue("");
  }

  displayNationalityProperty(value) {
    if (value) {
      return value.split("-")[0];
    }
  }

  displayDestinationProperty(value) {
    if (value) {
      return value.split("-")[0];
    }
  }

  AddRoomsInDiv(){
    this.extraRoom += 1;

  }

  RemoveRoomsInDiv(){
    this.extraRoom -= 1;
  }


  formPopupSubmit(){
    this.formpopup = false;
    this.mixValue = "";


    if(this.extraRoom >= 0){
      let adults1 = this.hotelForm.get("room1_adults").value;
      let childs1 = this.hotelForm.get("room1_childs").value;
  
      this.mixValue = `Room 1:${adults1} Adt ,${childs1} Chd`;
  
    }
    if(this.extraRoom >= 1){
      let adults2 = this.hotelForm.get("room2_adults").value;
      let childs2 = this.hotelForm.get("room2_childs").value;
  
      this.mixValue += `, Room 2:${adults2} Adt ,${childs2} Chd`;
  
    }
    if(this.extraRoom >= 2){
      let adults3 = this.hotelForm.get("room3_adults").value;
      let childs3 = this.hotelForm.get("room3_childs").value;
  
      this.mixValue += `, Room 3:${adults3} Adt ,${childs3} Chd`;
  
    }
    if(this.extraRoom == 3){
      let adults4 = this.hotelForm.get("room4_adults").value;
      let childs4 = this.hotelForm.get("room4_childs").value;
  
      this.mixValue += `, Room 3:${adults4} Adt ,${childs4} Chd`;

    }

    this.hotelForm.get("roomMemberInfo").setValue(this.mixValue);
  }

  changeInCheckinDate(){
    debugger;
      
      console.log(this.hotelForm.get('checkin').value)
      this.minCheckoutDate = new Date(this.hotelForm.get('checkin').value);
      let currentYear = this.minCheckoutDate.getFullYear();
      let currentMonth = this.minCheckoutDate.getMonth();
      let currentDate = this.minCheckoutDate.getDate();
      this.maxCheckoutDate = new Date(currentYear + 1, currentMonth, currentDate);
  
      var a = moment(this.hotelForm.get('checkin').value);
      var b = moment(this.hotelForm.get('checkout').value);
      let diff = b.diff(a, 'days');

     if (diff < 0){
        this.hotelForm.get('checkout').setValue(this.hotelForm.get('checkin').value);
      }

  }
}
