import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateBlog(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('Blog/AddUpdateBlog', data);
  }


  GetAllBlog()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Blog/GetAllBlog');
  }
  
  GetBlogDetailByBlogId(blogId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Blog/GetBlogDetailByBlogId?id='+blogId);
  }
 
  editBlog(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('Blog/AddUpdateBlog', data);
  }
 
  deleteBlog(BlogId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Blog/deleteBlog?Id='+BlogId);
  }
 
  fileUploadInBlog(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('Blog/fileUploadInBlog', data);
  }

  saveBlogPriority(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('Blog/setBlogPriority', data);
  }
  
  getAllBlogPriorityList()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Blog/AllBlogPriorityList');
  }
  getAllBlogPriorityListInUserPanel()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Blog/AllBlogPriorityListInUserPanel');
  }

  // AllBlogInUserPanel()
  // {
  //   return <Observable<ResponseModel>> this.dataService.getData('Blog/AllBlogInUserPanel');
  // }
  
  AllBlogInUserPanel(pageNo)
  {
    return <Observable<ResponseModel>> this.dataService.getData('Blog/AllBlogInUserPanel?pageNo='+pageNo);
  }
  
  RandomBlogList()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Blog/RandomBlogList');
  }
  
  RandomBlogListInDetail()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Blog/RandomBlogListInDetail');
  }

  BlogListByCategoryId(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('Blog/BlogListByCategoryId', data);
  }

  userPostBlog(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('Blog/userPostBlog', data);
  }

  userReactOnBlog(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('Blog/userReactOnBlog', data);
  }
  
  getPopularTag()
  {
    return <Observable<ResponseModel>> this.dataService.getData('Blog/getPopularTag');
  }
  
  searchBlogByText(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('Blog/searchBlog', data);
  }

  

  
}



