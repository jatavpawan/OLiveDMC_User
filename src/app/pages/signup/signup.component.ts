import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';
import { Status } from 'src/app/model/ResponseModel';
import { Router } from '@angular/router';
import 'jquery';
import Swal from 'sweetalert2'
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { MatDialog } from '@angular/material/dialog';
import { VerifyEmailOtpComponent } from '../verify-email-otp/verify-email-otp.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  passwordMatchError: boolean = false;
  checkPasswordMatch: boolean = false;
  submitSignupForm: boolean = false;
  emailOtpVerified: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private shareService: ShareService,
    private router: Router,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,

  ) {
    this.shareService.hideHeaderFooterAction(true);

    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      // emailId: ['', [Validators.required,Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      category: ['', Validators.required],
      travelEnthuiast: [false],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    })
  }

  ngOnInit(): void {
  }

  signUp() {
    debugger;
    console.log("signUp Form");
    if (this.signupForm.valid) {
      // if(this.emailOtpVerified == true){
        this.spinner.show();
        this.authService.registerUser(this.signupForm.value).subscribe(resp => {
          this.spinner.hide();
          if (resp.status == Status.Success) {
            // Swal.fire('Registered!', resp.message, 'success');
            Swal.fire('Partial Registered!', "For Complete Registration Verify Email By OTP", 'success');
            console.log(resp.data);
            
            this.UserEmailOTPVerificationBySendMail(resp.data);
       


            // this.openVerifyEmailOtpDialog(this.signupForm.get('emailId').value);
            // this.router.navigate(['otp-verification']);
            // this.router.navigateByUrl('otp-verification/' + this.signupForm.get('mobileNo').value)
  
          }
          else if (resp.status == Status.Warning) {
            Swal.fire('Not Registered!', resp.message, 'warning');
          }
          else {
            Swal.fire('Oops...', resp.message, 'error');
            // Swal.fire('Oops...', "Something Went Wrong", 'error');
          }
  
  
        })
      // }
      // else{
      //    this.openVerifyEmailOtpDialog(this.signupForm.get('emailId').value);
      // }
    }
    else {
      this.submitSignupForm = true;
    }
  }

  passwordMatch() {

    let password = this.signupForm.get('password').value;
    let confirmPassword = this.signupForm.get('confirmPassword').value;
    this.passwordMatchError = password == confirmPassword ? true : false;
    this.checkPasswordMatch = true;
  }

  validateNumbers(key) {

    // var keycode = (key.which) ? key.which : key.keyCode;

    // if (keycode > 31 && (keycode < 48 || keycode > 57)) {
    //     alert(" You can enter only characters 0 to 9 ");
    //     return false;
    // }
    // else return true;
    return true;
  }

  verifyEmailByOtp() {
    if (this.signupForm.get('emailId').valid) {

      Swal.fire({
        title: 'Verify Email!',
        text: "OTP has been Send In Your Email Please Verify Email",
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.value) {
          this.openVerifyEmailOtpDialog(this.signupForm.get('emailId').value);
        }
      })
    }
  }


  openVerifyEmailOtpDialog(email) {
    // let string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    // let OTP = ''; 
    // let len = string.length; 
    // for (let i = 0; i < 6; i++ ) { 
    //     OTP += string[Math.floor(Math.random() * len)]; 
    // } 
    // console.log('OTP', OTP)

    // let dataObj =  {
    //   email: email,
    //   otp:  OTP  
    // }

    debugger;
    const dialogRef = this.dialog.open(VerifyEmailOtpComponent,
      {
        hasBackdrop: false,
        data: email,
        panelClass: 'my-centered-dialog',
        width: '550px',
      });

    dialogRef.afterClosed().subscribe(result => {
      debugger;
      if (result != undefined && result == "verified") {
           this.router.navigate(['login']);
      }
      this.router.navigate(['login']);

      console.log(` VerifyEmailOtpComponent Dialog result: ${result}`);
    });

  }

  UserEmailOTPVerificationBySendMail(userdata){
    debugger;
    this.spinner.show();
    this.authService.UserEmailOTPVerificationBySendMail(userdata.id).subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success) {
        Swal.fire('OTP Send', "Otp Send to Your registered email Please Verify Your Otp ", 'success');
        console.log(resp.data);
        
        this.openVerifyEmailOtpDialog(userdata.emailId);
        // this.router.navigate(['otp-verification']);
        // this.router.navigateByUrl('otp-verification/' + this.signupForm.get('mobileNo').value)

      }
      else if (resp.status == Status.Warning) {
        Swal.fire('Not Registered!', resp.message, 'warning');
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
        // Swal.fire('Oops...', "Something Went Wrong", 'error');
      }


    })
  }


}


