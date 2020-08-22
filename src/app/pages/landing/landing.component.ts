import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';
import { Status } from 'src/app/model/ResponseModel';
import { Router } from '@angular/router';
import  'jquery';
import Swal from 'sweetalert2'
import { ShareService } from 'src/app/providers/sharedService/share.service';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],

})
export class LandingComponent implements OnInit {

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
     // private spinner: NgxSpinnerService,

  ) {
    this.shareService.hideHeaderFooterAction(true);

      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        keepLoggedIn: [false],
      })

      this.signupForm = this.formBuilder.group({
        firstName: ['',Validators.required],
        lastName: ['', Validators.required],
        emailId: ['', Validators.required],
        mobileNo: ['', Validators.required],
        category: ['', Validators.required],
        travelEnthuiast: [false],
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
      })

      this.otpForm = this.formBuilder.group({
        mobileNo: ['', Validators.required],
        otp: ['', Validators.required]
      })

      this.forgotPasswordForm = this.formBuilder.group({
        email: ['', Validators.required],
      })

      this.changePasswordForm = this.formBuilder.group({
        email: [''],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      })



  }

  ngOnInit(): void {

    
    if (JSON.parse (localStorage.getItem("keepMeLoggedIn"))){
      let keepMeLoggedInObj =JSON.parse (localStorage.getItem("keepMeLoggedIn"));
      this.loginForm.get('email').setValue(keepMeLoggedInObj.email);
      this.loginForm.get('password').setValue(keepMeLoggedInObj.password);
      localStorage.removeItem('keepMeLoggedIn');
    }
  }


  login(){
    
    console.log("Login Form");
    if(this.loginForm.valid){
      // this.spinner.show();
        this.authService.loginUser(this.loginForm.value).subscribe(resp=>{
          // this.spinner.hide();
          if(resp.status == Status.Success){
            localStorage.setItem("id_token", resp.message);
            this.authService.setUserdata(resp.data);
            this.router.navigate(['private/dashboard']);
          }
          else{
            // alert(resp.message);
            Swal.fire('Oops...', resp.message, 'warning');
          }
      })    
    }
    else{
      this.submitLoginForm = true; 
    }
  }
  
  signUp(){
    
    console.log("signUp Form");
    if(this.signupForm.valid){
      // this.spinner.show();
      this.authService.registerUser(this.signupForm.value).subscribe(resp=>{
        
        console.log(resp);
        // this.spinner.hide();
  
        if(resp.status ==  Status.Success){
          Swal.fire('Registered!',resp.message,'success');
          this.otpForm.get('mobileNo').setValue(this.signupForm.get('mobileNo').value)
          this.navigation = 'OTP';
        }
        else if(resp.status == Status.Warning) {
            Swal.fire('Not Registered!',resp.message,'warning');
        }
        else{
          Swal.fire('Oops...', resp.message, 'error');
        }
        
  
      })
    }
    else{
      this.submitSignupForm = true; 
    }
  }
  
  otpSubmit(){
    
    console.log("otpSubmit Form");
    if(this.otpForm.valid){
      // this.spinner.show();
      this.authService.userOtpVerify(this.otpForm.value).subscribe(resp=>{
        
        // this.spinner.hide();
        if(resp.status ==  Status.Success){
          Swal.fire('Matched!',resp.message,'success');
          this.navigation = 'login';
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
  
  forgotPasswordSubmit(){
    
    console.log("forgotPasswordSubmit Form");
    if(this.forgotPasswordForm.valid){
      // this.spinner.show();

      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(resp=>{
        
        // this.spinner.hide();

        if(resp.status ==  Status.Success){
          Swal.fire('',resp.message,'success');
          this.navigation = 'changePassword';
        }
        else if(resp.status == Status.Warning) {
            Swal.fire('', resp.message,'warning');
        }
        else{
          Swal.fire('Oops...', resp.message, 'error');
        }
      
      })
    }
    else{
      this.submitForgotPasswordForm = true; 
    }
  }
  
  changePasswordSubmit(){
    
    console.log("changePasswordSubmit Form");
    this.changePasswordForm.get('email').setValue(this.forgotPasswordForm.get('email').value)
    if(this.changePasswordForm.valid){
      // this.spinner.show();
      this.authService.changePassword(this.changePasswordForm.value).subscribe(resp=>{
        
        // this.spinner.hide();
        if(resp.status ==  Status.Success){
          Swal.fire('', resp.message,'success');
          this.navigation = 'login';
        }
        else if(resp.status == Status.Warning) {
            Swal.fire('' ,resp.message,'warning');
        }
        else{
          Swal.fire('Oops...', resp.message, 'error');
        }
      
      })
    }
    else{
      this.submitChangePasswordForm = true; 
    }
  }
  

  keepLoggedIn(value){
    console.log('checkbox value',value.target.checked);
    let checkValue: Boolean = value.target.checked;
    
    if(checkValue == true){
       localStorage.setItem("keepMeLoggedIn", JSON.stringify(this.loginForm.value));
    }
    else{
       if (JSON.parse (localStorage.getItem("keepMeLoggedIn"))) {
        localStorage.removeItem("keepMeLoggedIn");
       } 
    }
  }
  passwordMatch(){
    
    let password =  this.signupForm.get('password').value;
    let confirmPassword = this.signupForm.get('confirmPassword').value;
    this.passwordMatchError =  password ==confirmPassword  ?  true : false;
    this.checkPasswordMatch = true;
  }
  
  passwordMatchInChangePassword(){
    
    let password =  this.changePasswordForm.get('password').value;
    let confirmPassword = this.changePasswordForm.get('confirmPassword').value;
    this.changePasswordMatchError =  password ==confirmPassword  ?  true : false;
    this.checkPasswordMatchInChangePassword = true;
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
