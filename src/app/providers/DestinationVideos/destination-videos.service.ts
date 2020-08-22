import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DestinationVideosService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateDestinationVideos(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('DestinationVideos/AddUpdateDestinationVideos', data);
  }


  GetAllDestinationVideos()
  {
    return <Observable<ResponseModel>> this.dataService.getData('DestinationVideos/GetAllDestinationVideos');
  }
  
  GetDestinationVideosDetailByDestinationVideosId(DestinationVideosId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('DestinationVideos/GetDestinationVideosDetailByDestinationVideosId?id='+DestinationVideosId);
  }
 
  editDestinationVideos(data)
  {
    return <Observable<ResponseModel>> this.dataService.postData('DestinationVideos/AddUpdateDestinationVideos', data);
  }
 
  deleteDestinationVideos(DestinationVideosId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('DestinationVideos/deleteDestinationVideos?Id='+DestinationVideosId);
  }
 
 videoUploadInDestinationVideos(data)
  {
    return <Observable<ResponseModel>> this.dataService.postFormData('DestinationVideos/videoUploadInDestinationVideos', data);
  }

  deleteVideoInDestinationVideos(oldVideoName:string){
    return <Observable<ResponseModel>> this.dataService.getData('DestinationVideos/deleteVideoInDestinationVideos?oldVideoName='+oldVideoName);
  }
}
