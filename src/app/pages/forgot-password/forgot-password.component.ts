import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';
import { Status } from 'src/app/model/ResponseModel';
import { Router, ActivatedRoute } from '@angular/router';
import  'jquery';
import Swal from 'sweetalert2'
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  
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

  // Images = ['../assets/images/Carousel1.jpeg', '../assets/images/Carousel2.jpeg', '../assets/images/Carousel3.jpeg'];  
  Images = ["../../../assets/img/sidebar-1.jpg","../../../assets/img/sidebar-2.jpg","../../../assets/img/sidebar-3.jpg","../../../assets/img/sidebar-4.jpg"];  
  
  SlideOptions = { items: 1, dots: true, nav: true };  
  CarouselOptions = { items: 3, dots: true, nav: true }; 

  constructor( private formBuilder : FormBuilder,
     private  authService: AuthenticationService,
     private router: Router,
     private activatedRoute: ActivatedRoute,
     // private spinner: NgxSpinnerService,

  ) {
      

      this.changePasswordForm = this.formBuilder.group({
        encrypPath: [''],
        NewPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      })


      this.activatedRoute.queryParams.subscribe(params =>{
        debugger;
        this.changePasswordForm.get('encrypPath').setValue(params.reset);
      })


  }

  ngOnInit(): void {
  }

  
  changePasswordSubmit(){
    debugger;
    
    console.log("changePasswordSubmit Form");
    // this.changePasswordForm.get('email').setValue(this.forgotPasswordForm.get('email').value)
    if(this.changePasswordForm.valid){
      // this.spinner.show();
      this.authService.ResetPassword(this.changePasswordForm.value).subscribe(resp=>{
        
        // this.spinner.hide();
        if(resp.status ==  Status.Success){
          Swal.fire('', resp.message,'success');
          this.router.navigateByUrl('/login');
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
  

  passwordMatchInChangePassword(){
    
    let password =  this.changePasswordForm.get('password').value;
    let confirmPassword = this.changePasswordForm.get('confirmPassword').value;
    this.changePasswordMatchError =  password ==confirmPassword  ?  true : false;
    this.checkPasswordMatchInChangePassword = true;
  }

}