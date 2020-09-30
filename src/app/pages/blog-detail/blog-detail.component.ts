import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Status } from 'src/app/model/ResponseModel';
import { environment } from 'src/environments/environment';
import { OfferAdsService } from 'src/app/providers/OfferAdsService/offer-ads.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogCommentService } from 'src/app/providers/BlogCommentService/blog-comment.service';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blogId:number;
  blogDetail:any;
  blogImgSrcPath: string;
  offerAdsList: Array<any> = [];
  offerAdsImgSrcPath: string = '';
  commentForm: FormGroup;
  submitCommentForm: boolean;
  userLoggedinInfo: any;
  blogCommentList: Array<any> = [];
  blogCommentUserInfo: any;
  randomBlogs: Array<any> = [];



  constructor(
    private shareService: ShareService,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private offerAdsService: OfferAdsService,
    private spinner: NgxSpinnerService,
    private blogCommentService: BlogCommentService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,

  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.blogImgSrcPath =  environment.apiendpoint + 'Uploads/Blog/image/';
    this.offerAdsImgSrcPath =  environment.apiendpoint + 'Uploads/OfferAds/image/';

    this.activatedRoute.params.subscribe(param =>{
      debugger;
       this.blogId = param.blogId;
       this.getAllBlogComment(this.blogId);
       this.blogService.GetBlogDetailByBlogId(this.blogId).subscribe(resp => {
           if(resp.status == Status.Success){
            this.blogDetail =  resp.data;
           }
       })
    })
    this.GetAllOfferAdsByPageId(3002);
    this.randomBlogList();



    this.commentForm =  this.formBuilder.group({
      comment: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      blogId: ['0', Validators.required],
      userId: ['0', Validators.required],
      isSaveUserInfo: [false],
    })

    if (this.authService.isLoggedIn()) {
      debugger;
      this.userLoggedinInfo = JSON.parse(this.authService.getUserdata());
      this.commentForm.get('name').setValue(this.userLoggedinInfo.firstName + ' '+ this.userLoggedinInfo.lastName);
      this.commentForm.get('email').setValue(this.userLoggedinInfo.emailId);
      this.commentForm.get('userId').setValue(this.userLoggedinInfo.id);
    
    }
    else{
      debugger;
      this.blogCommentUserInfo = localStorage.getItem("blogCommentUserInfo");

       if(this.blogCommentUserInfo !=  null){
        this.blogCommentUserInfo =  JSON.parse(this.blogCommentUserInfo);
        this.commentForm.get('name').setValue(this.blogCommentUserInfo.name);
        this.commentForm.get('email').setValue(this.blogCommentUserInfo.email);
        this.commentForm.get('isSaveUserInfo').setValue(this.blogCommentUserInfo.isSaveUserInfo);
       }
      
    }

  }


  ngOnInit(): void {
  }


GetAllOfferAdsByPageId(pageId){
  debugger;
  this.spinner.show();
  this.offerAdsService.GetAllOfferAdsByPageId(pageId).subscribe(resp=>{
    if(resp.status == Status.Success){
      this.offerAdsList = resp.data;
    } 
    else{
      Swal.fire('Oops...', resp.message, 'error');
    }
    this.spinner.hide();
  })    
}


getAllBlogComment(blogId){
  debugger;
  this.spinner.show();
  this.blogCommentService.GetAllBlogCommentByBlogId(blogId).subscribe(resp=>{
    if(resp.status == Status.Success){
      this.blogCommentList = resp.data;
    } 
    else{
      Swal.fire('Oops...', resp.message, 'error');
    }
    this.spinner.hide();
  })    
}

saveComment(){
  debugger;

    this.submitCommentForm =  false;
    this.commentForm.get('blogId').setValue(this.blogId);
    if(this.commentForm.get('isSaveUserInfo').value == true ){
      let obj =  {
        name: this.commentForm.get('name').value,
        email: this.commentForm.get('email').value,
        isSaveUserInfo: this.commentForm.get('isSaveUserInfo').value,

      } 
      localStorage.setItem("blogCommentUserInfo", JSON.stringify(obj) );
    } 
    else{
      localStorage.removeItem("blogCommentUserInfo");

    }

    
    if (this.commentForm.valid) {

      // this.spinner.show();
      this.blogCommentService.AddUpdateBlogComment(this.commentForm.value).subscribe(resp => {
        // this.spinner.hide();
        if (resp.status == Status.Success) {
          this.getAllBlogComment(this.blogId);
          Swal.fire(
            "Saved!",
            "Your Comment Saved Successfully",
            "success"
          );
    
            this.resetCommentForm()
        }

      })
    }
    else {
      this.submitCommentForm = true;
    }
}


resetCommentForm(){

  debugger;

  this.commentForm.reset();
  this.commentForm.get('comment').setValue('');
  this.commentForm.get('isSaveUserInfo').setValue(false);
  if (this.authService.isLoggedIn()) {
    debugger;
    this.userLoggedinInfo = JSON.parse(this.authService.getUserdata());
    this.commentForm.get('name').setValue(this.userLoggedinInfo.firstName + ' '+ this.userLoggedinInfo.lastName);
    this.commentForm.get('email').setValue(this.userLoggedinInfo.emailId);
    this.commentForm.get('userId').setValue(this.userLoggedinInfo.id);
  
  }
  else{
    this.blogCommentUserInfo = localStorage.getItem("blogCommentUserInfo");

    if(this.blogCommentUserInfo !=  null){
     this.blogCommentUserInfo =  JSON.parse(this.blogCommentUserInfo);
     this.commentForm.get('name').setValue(this.blogCommentUserInfo.name);
     this.commentForm.get('email').setValue(this.blogCommentUserInfo.email);
     this.commentForm.get('isSaveUserInfo').setValue(this.blogCommentUserInfo.isSaveUserInfo);
    }
  }
}


randomBlogList(){
  debugger;
    // this.spinner.show();
    this.blogService.RandomBlogListInDetail().subscribe(resp => {
      debugger;
      // this.spinner.hide();
      if (resp.status == Status.Success) {
         this.randomBlogs =  resp.data
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
 
}



}
