import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';
import { Status } from 'src/app/model/ResponseModel';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import { VerifyEmailOtpComponent } from '../verify-email-otp/verify-email-otp.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
 

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitLoginForm: boolean = false;
  blogData: any;
  redirectFromBlog: boolean =  false;
  socialUser: any;
  socialLoggedIn: boolean =  false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private shareService: ShareService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private socialLoginService: AuthService,


  ) {
    debugger;
    this.activatedRoute.queryParams.subscribe(res =>{
      debugger;
        
        if(res.page == "blog" ){
          this.redirectFromBlog =  true;
        }
        else{
          this.redirectFromBlog =  false;
        }
        
    })
    this.shareService.hideHeaderFooterAction(true);
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', Validators.required],
      keepLoggedIn: [false],
    })

    // this.forgotPassword();
  }

  ngOnInit(): void {

    this.socialLoginService.authState.subscribe((user) => {
      debugger;
      this.socialUser = user;
      this.socialLoggedIn = (user != null);

      if(this.socialLoggedIn == true){
        console.log("fb", user)
         this.userSocialLogin(user);
      }
    });

    if (JSON.parse(localStorage.getItem("keepMeLoggedIn"))) {
      let keepMeLoggedInObj = JSON.parse(localStorage.getItem("keepMeLoggedIn"));
      this.loginForm.get('email').setValue(keepMeLoggedInObj.email);
      this.loginForm.get('password').setValue(keepMeLoggedInObj.password);
      localStorage.removeItem('keepMeLoggedIn');
    }
  }


  login() {
    debugger;

    console.log("Login Form");
    if (this.loginForm.valid) {

      this.spinner.show();
      this.authService.loginUser(this.loginForm.value).subscribe(resp => {
        this.spinner.hide();
        debugger;
        if (resp.status == Status.Success) {
          debugger;
        
          localStorage.setItem("id_token", resp.message);
          this.authService.setUserdata(resp.data);
          // if(resp.data.roleId == 1){
          //   this.router.navigate(['private/dashboard']);
          // }
          // else if (resp.data.roleId == 2){
          if (resp.data.roleId == 2) {
            this.shareService.userLOggedInAction(true);
            this.redirectFromBlog ==  true ? this.router.navigate(['/blog']) : this.router.navigate(['/social-media']);
          }
        }

        else if(resp.status == Status.Warning && resp.message == "please verify your email by Otp"){
          Swal.fire('Email Verification Remaining', "Please Verify Your Registered Email By OTP ", 'warning');
          this.UserEmailOTPVerificationBySendMail(resp.data);
        }
        else {
          // alert(resp.message);
          Swal.fire('Oops...', resp.message, 'warning');
        }
      })
    }
    else {
      this.submitLoginForm = true;
    }
  }

  forgotPassword() {
    this.authService.forgotpassword().subscribe(resp => {
      if (resp.status == Status.Success) {
        debugger;
      }
      else {
        Swal.fire('Oops...', resp.message, 'warning');
      }
    })
  }


  keepLoggedIn(value) {
    console.log('checkbox value', value.target.checked);
    let checkValue: Boolean = value.target.checked;

    if (checkValue == true) {
      localStorage.setItem("keepMeLoggedIn", JSON.stringify(this.loginForm.value));
    }
    else {
      if (JSON.parse(localStorage.getItem("keepMeLoggedIn"))) {
        localStorage.removeItem("keepMeLoggedIn");
      }
    }
  }

  openVerifyEmailOtpDialog(email) {

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
      // if (result != undefined && result == "verified") {
      //      this.router.navigate(['login']);
      // }
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


  signInWithGoogle(): void {
    debugger;
    this.socialLoginService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(x => console.log("google",x));;
  }
 
  signInWithFB(): void {
    debugger;
    this.socialLoginService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(x => console.log("fb",x));;
  } 
 
  signOut(): void {
    this.socialUser =  undefined;
    this.socialLoggedIn =  false;
    this.socialLoginService.signOut();
  }

  userSocialLogin(userdata){

  debugger;
   let userInfo = {
    firstName: userdata.firstName,
    lastName: userdata.lastName,
    emailId: userdata.email,
    category: 1,
    travelEnthuiast: false,
    profilePic: userdata.facebook.picture.data.url,
   }

     this.authService.userSocialLogin(userInfo).subscribe(resp => {
      if (resp.status == Status.Success) {
        this.signOut();
        Swal.fire('Login Successfully', "You Are Successfully Logged In ", 'success');
        debugger;
        localStorage.setItem("id_token", resp.message);
        this.authService.setUserdata(resp.data);
        if (resp.data.roleId == 2) {
          this.shareService.userLOggedInAction(true);
          this.redirectFromBlog ==  true ? this.router.navigate(['/blog']) : this.router.navigate(['/social-media']);
        }
      }

    })
  }

}




                      
