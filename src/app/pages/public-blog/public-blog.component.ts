import { Component, OnInit } from '@angular/core';
import { ProfileCategoryService } from 'src/app/providers/ProfileCategoryService/profile-category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2'
import { Status } from 'src/app/model/ResponseModel';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { environment } from 'src/environments/environment';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { BannerService } from 'src/app/providers/BannerService/banner.service';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-public-blog',
  templateUrl: './public-blog.component.html',
  styleUrls: ['./public-blog.component.css']
})
export class PublicBlogComponent implements OnInit {

  categories:Array<any> = [];
  // blogPriorityList:Array<any> = [];
  apiendpoint: string = environment.apiendpoint;
  blogimgsrcpath: string = "";
  bannerImgsrcpath: string = "";
  blogCurrentPageNo:number = 1
  totalBlogPage: number =  1;
  bannerDetail: any;
  showBlogPriorityList: Array<any> = [];
  AllblogPriorityList: Array<any> = [];
  userLoggedIn:boolean =  false;
  blogForm: FormGroup;
  fileUploaded:boolean = false;
  file: any;
  previewUrl:any = null;
  loggedInUserData: any;
  submitBlogForm: boolean =  false;

  constructor(
    private  categoryService: ProfileCategoryService, 
    private spinner: NgxSpinnerService,
    private blogService: BlogService,
    private  shareService: ShareService,
    private  bannerService: BannerService,
    private  authService: AuthenticationService,
    private formBuilder : FormBuilder,

  ) {
    
    this.blogForm = this.formBuilder.group({
      userId: [0],
      userName: [''],
      email: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      featuredImage: ['', Validators.required],
      shortDescription: [''],
      approvalStatus: [false],
      status: [false],
    })
    
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);


    this.blogimgsrcpath = this.apiendpoint + 'Uploads/Blog/image/';
    this.bannerImgsrcpath = this.apiendpoint + 'Uploads/Banner/image/';
    
    this.userLoggedIn = this.authService.isLoggedIn();
    if(this.authService.isLoggedIn()){
      debugger;
      this.loggedInUserData = JSON.parse(this.authService.getUserdata());
      this.blogForm.get('userName').setValue(this.loggedInUserData.firstName+' '+this.loggedInUserData.lastName);
      this.blogForm.get('userId').setValue(this.loggedInUserData.id);
      this.blogForm.get('email').setValue(this.loggedInUserData.emailId);
    }

    this.shareService.userLOggedIn.subscribe((res: any) => {
      debugger;
      this.userLoggedIn = res;
    });
    
  }

  preview(file) {
    // if(this.edit_blog == true){
    //    this.editfileUploaded = true;
    // }

    let files = file.files[0] 
    var mimeType = files.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(files); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }

    this.file = files;  
    this.fileUploaded = true;
  }

  ngOnInit(): void {
    this.GetAllCategory();
    this.getBlogPriorityList();
    this.getBannerDetail(1002);
    // this.getAllBlog();
  }

  getBannerDetail(pageId){
    debugger;
    this.bannerService.GetBannerDetailByPageId(pageId).subscribe(resp=>{
      if(resp.status == Status.Success){
        this.bannerDetail = resp.data;
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }

  GetAllCategory(){
    debugger;
    this.categoryService.GetAllProfileCategory().subscribe(resp=>{
      if(resp.status == Status.Success){
        debugger;
          this.categories = resp.data;
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })    
  }

  getBlogPriorityList() {
    this.blogService.getAllBlogPriorityListInUserPanel().subscribe(resp => {
      if (resp.status == Status.Success) {
        
        this.AllblogPriorityList = resp.data;

        if (resp.data != undefined && resp.data.length > 6) {
          resp.data.length = 6
          this.showBlogPriorityList = resp.data;
        }
        else{
          this.showBlogPriorityList = resp.data;
        }
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
      this.spinner.hide();
    })

  }
  // getAllBlog() {
  //   this.blogService.AllBlogInUserPanel(1).subscribe(resp => {
  //     if (resp.status == Status.Success) {
  //       if (resp.data != undefined && resp.data.length > 4) {
  //         resp.data.length = 4
  //       }
  //       this.blogPriorityList = resp.data;
  //     }
  //     else {
  //       Swal.fire('Oops...', resp.message, 'error');
  //     }
  //     this.spinner.hide();
  //   })

  // }

  submitBlogData(){
    debugger;
    this.submitBlogForm = false;
    if(this.blogForm.valid){
      this.spinner.show();
      this.blogForm.get('shortDescription').setValue(this.blogForm.get('description').value);
      let formData = new FormData();
      formData.append('FeaturedImage', this.file);
      formData.append('userId', this.blogForm.get('userId').value);
      formData.append('Title', this.blogForm.get('title').value);
      formData.append('Description', this.blogForm.get('description').value);
      formData.append('ShortDescription', this.blogForm.get('shortDescription').value);
      formData.append('Status', this.blogForm.get('status').value);
      formData.append('ApprovalStatus', this.blogForm.get('approvalStatus').value);

      this.blogService.AddUpdateBlog(formData).subscribe(resp=>{
     
        if(resp.status == Status.Success){
          Swal.fire(
            'Saved!',
            'Your Blog has been Saved. Now Waiting For Admin Approval',
            'success'
          )
          
          this.fileUploaded = false;
          this.file = undefined;
          this.resetBlogForm();
        }
        else{
          this.spinner.hide();
          Swal.fire('Oops...' ,resp.message,'warning');
        }  
      })    
    }
    else{
      this.submitBlogForm = true;
    }

  }

  resetBlogForm(){  
    this.blogForm.setValue({
      userId: 0,
      userName: '',
      email: '',
      title: '',
      description: '',
      featuredImage: '',
      shortDescription: '',
      approvalStatus: false,
      status: false
    })

  }


  loadMoreBlogs(){

  }

}
