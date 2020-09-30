import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';
import { DataService } from '../dataservice/data.service';

@Injectable({
  providedIn: 'root'
})
export class BlogCommentService {

  constructor(private dataService: DataService) { }

  AddUpdateBlogComment(data){
    return <Observable<ResponseModel>> this.dataService.postData('BlogComment/AddUpdateBlogComment', data);
  }


  GetAllBlogComment()
  {
    return <Observable<ResponseModel>> this.dataService.getData('BlogComment/GetAllBlogComment');
  }
  
  GetBlogCommentById(BlogCommentId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('BlogComment/GetBlogCommentDetailByBlogCommentId?id='+BlogCommentId);
  }
  
  GetAllBlogCommentByBlogId(blogId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('BlogComment/GetAllBlogCommentByBlogId?blogId='+blogId);
  }
  
  deleteBlogComment(BlogCommentId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('BlogComment/deleteBlogComment?Id='+BlogCommentId);
  }
}
