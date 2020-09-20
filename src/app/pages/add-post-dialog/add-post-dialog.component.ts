import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Status } from 'src/app/model/ResponseModel';
import Swal from 'sweetalert2';
import { UserPostService } from 'src/app/providers/UserPostService/user-post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {

  currentAddPostTab: string = "update-status-tab"  
  userPostForm: FormGroup;
  submitUserPost: boolean = false;
  editUserPost: boolean = false;
  uploadFileUrl: string | ArrayBuffer;
  file: any;
  fileUploaded: boolean =  false;
  postId: number = 0;
  editfileUploaded: boolean =  false;
  submituserPostForm: boolean =  false;
  userPost: any;
  userPostImgSrcPath: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private userPostService: UserPostService,
    public dialogRef: MatDialogRef<AddPostDialogComponent>

  ) {
    this.userPostForm = this.formBuilder.group({
      userId: ['', Validators.required],
      description: ['', Validators.required],
      image: [''],
      video: [''],
    })
    this.userPostImgSrcPath = environment.apiendpoint + 'Uploads/UserPost/image/';

    this.userPostForm.get('userId').setValue(data.userId);

    if(this.data.userPostData != undefined){
      debugger;
      this.userPostForm.get('description').setValue(data.userPostData.description);
      this.editUserPost =  true;
      this.userPost =  this.data.userPostData;
      this.postId =  this.data.userPostData.id;
      if(data.userPostData.image != undefined && data.userPostData.image != null )
        this.uploadFileUrl = this.userPostImgSrcPath + data.userPostData.image; 

    }

    
  }

  ngOnInit(): void {
  }


  submitPostData() {
    debugger;
    if(this.userPostForm.valid){
      this.spinner.show();

      let formData = new FormData();
      this.editUserPost == true ? formData.append('Id', ''+this.postId) : formData.append('Id', '0'); 
      this.postId = 0;
      if( (this.editUserPost == false) || (this.editUserPost == true && this.editfileUploaded == true)){
        formData.append('image', this.file);
      }
      else{
        formData.append('image', null);
      }
      formData.append('userId', this.userPostForm.get('userId').value);
      formData.append('description', this.userPostForm.get('description').value);
      formData.append('video', this.userPostForm.get('video').value);

      this.userPostService.AddUpdateUserPost(formData).subscribe(resp=>{
     
        if(resp.status == Status.Success){
         if(this.editUserPost == true){
          Swal.fire(
            'Updated!',
            'Your Post has been Updated.',
            'success'
          )
         }
         else{
          Swal.fire(
            'Added!',
            'Your Post has been Added.',
            'success'
          )
         }
          
          this.editUserPost = false;
          this.editfileUploaded = false;
          this.fileUploaded = false;
          this.file = undefined;
          this.resetUserPostForm();
          this.dialogRef.close('addUpdateUserPost')
        } 
        else{
          this.spinner.hide();
          Swal.fire('Oops...' ,resp.message,'warning');
        } 
      })    
    }
    else {
      this.submituserPostForm = true;
    }

  }

  uploadFile(file) {

    debugger;
    if(this.editUserPost == true){
       this.editfileUploaded = true;
    }

    let files = file.files[0] 
    var mimeType = files.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(files); 
    reader.onload = (_event) => { 
      this.uploadFileUrl = reader.result; 
    }

    this.file = files;  
    this.fileUploaded = true;
  }

  closeDialog() {
    this.dialogRef.close();
  }


  resetUserPostForm(){
    this.userPostForm.setValue({
      userId: 0, 
      description: '', 
      image: '', 
      video:  '',
    })
  }
}

