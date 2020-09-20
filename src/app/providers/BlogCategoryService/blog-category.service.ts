import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BlogCategoryService {

  constructor(private dataService: DataService) { }

  AddUpdateBlogCategory(data){
    return <Observable<ResponseModel>> this.dataService.postData('BlogCategory/AddUpdateBlogCategory', data);
  }


  GetAllBlogCategory()
  {
    return <Observable<ResponseModel>> this.dataService.getData('BlogCategory/GetAllBlogCategory');
  }
  
  GetBlogCategoryById(BlogCategoryId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('BlogCategory/GetBlogCategoryDetailByBlogCategoryId?id='+BlogCategoryId);
  }
  
  deleteBlogCategory(BlogCategoryId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('BlogCategory/deleteBlogCategory?Id='+BlogCategoryId);
  }
 
}
