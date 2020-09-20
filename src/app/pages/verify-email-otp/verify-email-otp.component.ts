import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Status } from 'src/app/model/ResponseModel';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';

@Component({
  selector: 'app-verify-email-otp',
  templateUrl: './verify-email-otp.component.html',
  styleUrls: ['./verify-email-otp.component.css']
})
export class VerifyEmailOtpComponent implements OnInit {

  otpForm: FormGroup;
  submitOtpForm: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private authService: AuthenticationService,
    public dialogRef: MatDialogRef<VerifyEmailOtpComponent>

  ) {
    this.otpForm = this.formBuilder.group({
      email: ['', Validators.required],
      otp: ['', Validators.required],
    })

    this.otpForm.get('email').setValue(this.data);

  }

  ngOnInit(): void {
  }

  

  submitOtpData() {
    debugger;
    this.submitOtpForm = false;

    if (this.otpForm.valid) {
      this.spinner.show();
      this.authService.userOtpVerify(this.otpForm.value).subscribe(resp => {
        this.spinner.hide();
        if (resp.status == Status.Success) {
          Swal.fire('Matched', "OTP Is Matched",'success');
          this.closeDialog("verified");
  
          // Swal.fire('', resp.message,'success');
        }
        else {
          // Swal.fire('Oops...', resp.message, 'warning');
          Swal.fire('Oops...', "Otp Is not matched Please Re-Enter Your OTP Or Re-Send Your OTP", 'warning');
        }
      })
      // if(this.data.otp == this.otpForm.get('otp').value)
      // {
      //   Swal.fire('Matched', "OTP Is Matched",'success');
      //   this.closeDialog("verified");
      // }
      // else{
      //   Swal.fire('Oops...', "Otp Is not matched Please Re-Enter Your OTP Or Re-Send Your OTP", 'warning');
      //   this.otpForm.get('otp').setValue('');
      // }
    }
    else {
      this.submitOtpForm = true;
    }
  }

  closeDialog(msg?) {
    msg != undefined ?  this.dialogRef.close(msg) :  this.dialogRef.close();
  }

  ResendOtp(){
    // let string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
    // let OTP = ''; 
    // let len = string.length; 
    // for (let i = 0; i < 6; i++ ) { 
    //     OTP += string[Math.floor(Math.random() * len)]; 
    // } 
    // console.log('Resend OTP', OTP)
    // this.data.otp =  OTP;

let obj  =  {
  Email : this.otpForm.get('email').value 
}

     this.spinner.show();
    this.authService.userResendOtp(obj).subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success) {
        Swal.fire('Resend', "OTP Is Resend to your registered mail ",'success');
        // this.closeDialog("verified");

        // Swal.fire('', resp.message,'success');
      }
      else {
        // Swal.fire('Oops...', resp.message, 'warning');
        Swal.fire('Oops...', "something went wrong", 'warning');
      }
    })

    
    // Swal.fire('Resend OTP!',"OTP has been Resend In Your Email",'success');
  }


}
