import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/model/ResponseModel';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';
import { UserGalleryService } from 'src/app/providers/UserGalleryService/user-gallery.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import * as moment from 'moment';


@Component({
  selector: 'app-gallery-video-modal',
  templateUrl: './gallery-video-modal.component.html',
  styleUrls: ['./gallery-video-modal.component.css']
})
export class GalleryVideoModalComponent implements OnInit {
  galleryDetail: any;
  galleryVideosrcpath: string = '';
  apiendpoint: string = environment.apiendpoint;
  userLoggedinInfo: any;
  galleryCommentForm: FormGroup;
  profileImgsrcpath: string = '';


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<GalleryVideoModalComponent>,
    private authService: AuthenticationService,
    private userGalleryService: UserGalleryService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {

    this.galleryDetail = data;
    this.galleryVideosrcpath = this.apiendpoint + 'Uploads/UserGallery/Video/';
    this.profileImgsrcpath = this.apiendpoint + 'Uploads/SocialMedia/UserProfilePic/image/';

    this.userLoggedinInfo = JSON.parse(this.authService.getUserdata());

    this.galleryCommentForm = this.formBuilder.group({
      comment: ['', Validators.required],
    })

  }

  ngOnInit(): void {
  }


  userCommentOnGallery(gallery, comment) {
    debugger;

    if (comment.value != "") {
      let obj: any = {
        galleryId: gallery.id,
        UserId: this.userLoggedinInfo.id,
        Comment: comment.value
      }

      this.galleryCommentForm.get('comment').setValue('');
      this.userGalleryService.userCommentOnGallery(obj).subscribe(resp => {
        comment.value == "";
        // this.spinner.hide();
        if (resp.status == Status.Success) {

          this.GalleryDetailByUserId(gallery.id);
          console.log('Your Gallery Comment  has been saved.')
        }
        else {
          Swal.fire('Oops...', resp.message, 'error');
        }
      })
    }

  }

  GalleryDetailByUserId(galleryId) {
    debugger;

    this.userGalleryService.GalleryDetailByUserId(galleryId).subscribe(resp => {
      debugger;
      // this.spinner.hide();
      if (resp.status == Status.Success) {

        if (resp.data != undefined && resp.data.length != 0) {
          this.galleryDetail = resp.data[0];

          if (this.galleryDetail != undefined) {

            if (this.galleryDetail.profileImg != null) {
              this.galleryDetail.shortUserName = this.galleryDetail.userFirstName[0] + this.galleryDetail.userLastName[0];
            }
            if (this.galleryDetail.updatedDate != null) {
              this.galleryDetail.postTimeFromNow = moment(this.galleryDetail.updatedDate).fromNow();
            }
            else {
              this.galleryDetail.postTimeFromNow = moment(this.galleryDetail.createdDate).fromNow();
            }

            if (this.galleryDetail.commentcount >= 1) {
              this.galleryDetail.commentList.map(comment => {
                if (comment?.commentUserProfileImg != null) {
                  comment.shortUserName = comment.commentUserFirstName[0] + comment.commentUserLastName[0];
                }
                if (comment.updatedDate != null) {
                  comment.postTimeFromNow = moment(comment.updatedDate).fromNow();
                }
                else {
                  comment.postTimeFromNow = moment(comment.createdDate).fromNow();
                }

              })
            }
          }


        }




      }
      else {
        Swal.fire('Oops...', resp.error, 'error');
      }
    })

  }



}
