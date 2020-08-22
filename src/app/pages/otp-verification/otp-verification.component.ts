import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';
import { Status } from 'src/app/model/ResponseModel';
import { Router, ActivatedRoute } from '@angular/router';
import  'jquery';
import Swal from 'sweetalert2'
import { ShareService } from 'src/app/providers/sharedService/share.service';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {

  
  navigation = "login";
  loginForm: FormGroup;
  signupForm: FormGroup;
  otpForm: FormGroup;
  passwordMatchError: boolean = false;
  checkPasswordMatch: boolean = false;
  submitLoginForm: boolean = false;
  submitSignupForm: boolean = false;
  submitOtpForm: boolean = false;
  submitChangePasswordForm: boolean = false;
  submitForgotPasswordForm: boolean = false;
  forgotPasswordForm: FormGroup;
  changePasswordForm: FormGroup;
  changePasswordMatchError: boolean = false;
  checkPasswordMatchInChangePassword: boolean = false;

  constructor( private formBuilder : FormBuilder,
     private  authService: AuthenticationService,
     private  shareService: ShareService,
     private router: Router,
     private activatedRoute: ActivatedRoute,
     // private spinner: NgxSpinnerService,

  ) {
      
    this.shareService.hideHeaderFooterAction(true);
      this.otpForm = this.formBuilder.group({
        mobileNo: ['', Validators.required],
        otp: ['', Validators.required]
      })

      this.activatedRoute.params.subscribe(resp =>{
         this.otpForm.get('mobileNo').setValue(resp.mobileNo);
      })

  }

  ngOnInit(): void {
  }
  
  otpSubmit(){
    
    console.log("otpSubmit Form");
    if(this.otpForm.valid){
      // this.spinner.show();
      this.authService.userOtpVerify(this.otpForm.value).subscribe(resp=>{
        
        // this.spinner.hide();
        if(resp.status ==  Status.Success){
          Swal.fire('Matched!',resp.message,'success');
          this.router.navigateByUrl('/login');
        }
        else if(resp.status == Status.Warning) {
            Swal.fire('Not Matched!',resp.message,'warning');
        }
        else{
          Swal.fire('Oops...', resp.message, 'error');
        }
      })
    }
    else{
      this.submitOtpForm = true; 
    }
  }
  
  passwordMatch(){
    
    let password =  this.signupForm.get('password').value;
    let confirmPassword = this.signupForm.get('confirmPassword').value;
    this.passwordMatchError =  password ==confirmPassword  ?  true : false;
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


  resendOtp(){
    // if(this.otpForm.valid){
      // this.spinner.show();
      this.authService.userResendOtp(this.otpForm.value).subscribe(resp=>{
        
        // this.spinner.hide();
        if(resp.status ==  Status.Success){
          console.log(resp.data);
          Swal.fire('Send OTP!',resp.message,'success');
        }
        else if(resp.status == Status.Warning) {
            Swal.fire('Resend OTP!',resp.message,'warning');
        }
        else{
          Swal.fire('Oops...', resp.message, 'error');
        }

      })
    // }
  }

}