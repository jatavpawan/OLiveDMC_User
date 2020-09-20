import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/providers/sharedService/share.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from 'ngx-spinner';
import { Status } from 'src/app/model/ResponseModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/providers/authentication/authentication.service';
import { BlogService } from 'src/app/providers/BlogService/blog.service';
import { BlogCategoryService } from 'src/app/providers/BlogCategoryService/blog-category.service';

@Component({
  selector: 'app-social-blogs',
  templateUrl: './social-blogs.component.html',
  styleUrls: ['./social-blogs.component.css']
})
export class SocialBlogsComponent implements OnInit {

  apiendpoint: string = environment.apiendpoint;
  userId: number = 0;
  userPersonalInfo: any;
  userLoggedinInfo: any;
  fileUploaded: boolean = false;
  imageFiles: any;
  uploadFileUrls: Array<any> = [];
  blogForm: FormGroup;
  file: any;
  previewUrl:any = null;
  submitBlogForm: boolean =  false; 
  tinymceConfig: any;
  characterCount:number = 0;
  blogFile: any;
  BlogFileUploaded: boolean =  false;
  categories: Array<any> = [];
  infiniteLoader: boolean =  true;
  pageNo: number =  0;
  blogList: Array<any> = [];
  blogimgsrcpath: string = '';
  edit_blog: boolean = false;
  blogId: string = '0';
  editfileUploaded: boolean = false;
  blogLoader: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private shareService: ShareService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private blogService: BlogService,
    private categoryService: BlogCategoryService,
  ) {

    this.blogimgsrcpath = this.apiendpoint + 'Uploads/Blog/image/';


    this.blogForm = this.formBuilder.group({
      userId: [0],
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['0', Validators.required],
      featuredImage: [''],
      shortDescription: [''],
      approvalStatus: [false],
      status: [false],
    })

    if (this.authService.isLoggedIn()) {
      debugger;
      this.userLoggedinInfo = JSON.parse(this.authService.getUserdata());
      this.blogForm.get('userId').setValue(this.userLoggedinInfo.id);
    }

  }

  ngOnInit(): void {
    this.userPostBlog();
    this.GetAllCategory();
  }


  preview(file) {

    debugger;
    if(this.edit_blog == true){
      this.editfileUploaded = true;
   }

    let blogFile = file.files[0] 
    var mimeType = blogFile.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(blogFile); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }

    this.blogFile = blogFile;  
    this.BlogFileUploaded = true;
  }

  submitBlogData(){
    debugger;
    this.submitBlogForm = false;
    if(this.blogForm.valid && this.blogForm.get('category').value != "0"){
      this.spinner.show();
        let formData = new FormData();
        this.edit_blog == true ? formData.append('Id', this.blogId) : formData.append('Id', '0'); 
        if( (this.edit_blog == false) || (this.edit_blog == true && this.editfileUploaded == true)){
          formData.append('FeaturedImage', this.blogFile);
        }
        else{
          formData.append('FeaturedImage', null);
        }
        formData.append('userId', this.blogForm.get('userId').value);
        formData.append('Title', this.blogForm.get('title').value);
        formData.append('Category', this.blogForm.get('category').value);
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
            this.pageNo = 0;   
            this.blogList = [];        
            this.userPostBlog();           

            // if(this.edit_blog ==  true){
            //   this.pageNo = 0;   
            //   this.blogList = [];        
            // }
            this.blogId = '0';
            this.editfileUploaded = false;
            this.BlogFileUploaded = false;
            this.edit_blog = false;
            this.previewUrl = null;
            this.blogFile = undefined;
            this.blogForm.reset();
            this.resetBlogForm();
          }
          else{
            this.spinner.hide();
            Swal.fire('Oops...' ,"Something went Wrong",'warning');
          }  
        })    
    }
    else{
      this.submitBlogForm = true;
    }

  }

  resetBlogForm(){  
    this.blogForm.setValue({
      userId: this.userLoggedinInfo.id,
      title: '',
      category: '0',
      description: '',
      featuredImage: '',
      shortDescription: '',
      approvalStatus: false,
      status: false
    })
  }

  shortDescriptionCharacterCount(event): boolean{
    if(this.blogForm.get('shortDescription').value.length >=200  && event.keyCode != 8 ){
      let shortDescription:string = this.blogForm.get('shortDescription').value;
      this.blogForm.get('shortDescription').setValue(shortDescription.substring(0,200));
      this.characterCount =  this.blogForm.get('shortDescription').value.length;
      return false;
    }
    this.characterCount =  this.blogForm.get('shortDescription').value.length;
    return true;
  }

  GetAllCategory(){
    debugger;
    this.categoryService.GetAllBlogCategory().subscribe(resp=>{
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

  userPostBlog(){
    debugger;

    this.infiniteLoader = false;
    let obj = {
      UserId: this.userLoggedinInfo.id,
      PageNo: this.pageNo
    }
 
    this.blogLoader =  true;
    this.blogService.userPostBlog(obj).subscribe(resp => {
      debugger;
      this.blogLoader = false;
      this.spinner.hide();
      if (resp.status == Status.Success) {
         this.blogList = [...this.blogList, ...resp.data.blogList];  
         if(resp.data.totalPage >= (this.pageNo+2)){
           this.infiniteLoader = true;
         }
         else{
          this.infiniteLoader = false;
         } 
         ++this.pageNo;
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }

  
  editBlog(blog){
    debugger;

    this.blogForm.get('userId').setValue(blog.userId);
    this.blogForm.get('title').setValue(blog.title);
    this.blogForm.get('category').setValue(blog.category);
    this.blogForm.get('description').setValue(blog.description);
    this.blogForm.get('status').setValue(blog.status);
    this.blogForm.get('approvalStatus').setValue(blog.approvalStatus);
    this.blogForm.get('shortDescription').setValue(blog.shortDescription);
   
    this.blogId = ''+blog.id; 
    this.previewUrl =  this.apiendpoint+'Uploads/Blog/image/'+blog.featuredImage;

    this.edit_blog = true;
  }

  deleteBlog(id){

    debugger;
    this.spinner.show()
    this.blogService.deleteBlog(id).subscribe(resp=>{
      if(resp.status == Status.Success){
        
        let blogIndex =  this.blogList.findIndex(blog => blog.id == id);
        this.blogList.splice(blogIndex, 1);

        Swal.fire(
          'Deleted!',
          'Your Blog has been deleted.',
          'success'
        )
      } 
      else{
        Swal.fire('Oops...', resp.message, 'error');
      }
    })    
  }

  openConfirmDialog(blogId){
    debugger;

    Swal.fire({
      title: 'Are you sure?',
      text: "You Want to delete this Blog!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.deleteBlog(blogId);
      }

    })
  }

  UserReactionOnBlog(blog, reaction_id?) {

    debugger
    let ReactionStatus = !blog.reactionStatus;

      let index: number =  this.blogList.findIndex(item => item.id == blog.id);
      if(index != -1){
        this.blogList[index].reactionStatus = ReactionStatus;
  
        ReactionStatus == false ?  this.blogList[index].likecount = this.blogList[index].likecount -1 :  this.blogList[index].likecount = this.blogList[index].likecount +1;
      }
    

    let obj:any = {
      blogId: blog.id,
      UserId: this.userLoggedinInfo.id,
      ReactionStatus: ReactionStatus,
      ReactionId:  reaction_id
    }
    
    this.blogService.userReactOnBlog(obj).subscribe(resp => {
      this.spinner.hide();
      if (resp.status == Status.Success) {
        console.log('Your Blog Reaction  has been saved.')
      }
      else {
        Swal.fire('Oops...', resp.message, 'error');
      }
    })
  }


}

