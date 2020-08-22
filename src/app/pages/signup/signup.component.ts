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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  passwordMatchError: boolean = false;
  checkPasswordMatch: boolean = false;
  submitSignupForm: boolean = false;

  constructor( private formBuilder : FormBuilder,
     private  authService: AuthenticationService,
     private  shareService: ShareService,
     private router: Router,
     // private spinner: NgxSpinnerService,

  ) {
    this.shareService.hideHeaderFooterAction(true);

      this.signupForm = this.formBuilder.group({
        firstName: ['',Validators.required],
        lastName: ['', Validators.required],
        emailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        // emailId: ['', [Validators.required,Validators.email]],
        mobileNo: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        category: ['', Validators.required],
        travelEnthuiast: [false],
        password: [null, Validators.required],
        confirmPassword: [null, Validators.required],
      })
  }

  ngOnInit(): void {
  }

  signUp(){
    debugger;
    console.log("signUp Form");
    if(this.signupForm.valid){
      // this.spinner.show();
      this.authService.registerUser(this.signupForm.value).subscribe(resp=>{
        
        console.log(resp);
        // this.spinner.hide();
  
        if(resp.status ==  Status.Success){
          Swal.fire('Registered!',resp.message,'success');
          this.router.navigate(['otp-verification']);
          this.router.navigateByUrl('otp-verification/'+this.signupForm.get('mobileNo').value)

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


  

}
