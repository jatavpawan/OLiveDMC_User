import { Injectable } from '@angular/core';
import { DataService } from '../dataservice/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/model/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  constructor(private dataService: DataService, private router: Router) { }

  AddUpdateTeamMember(data){
    return <Observable<ResponseModel>> this.dataService.postFormData('TeamMemberInAboutUs/AddUpdateTeamMemberInAboutUs', data);
  }


  GetAllTeamMember()
  {
    return <Observable<ResponseModel>> this.dataService.getData('TeamMemberInAboutUs/GetAllTeamMemberInAboutUs');
  }
  
  GetTeamMemberDetailByTeamMemberId(TeamMemberId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('TeamMemberInAboutUs/GetTeamMemberInAboutUsDetailByTeamMemberInAboutUsId?id='+TeamMemberId);
  }
 
  deleteTeamMember(TeamMemberId)
  {
    return <Observable<ResponseModel>> this.dataService.getData('TeamMemberInAboutUs/deleteTeamMemberInAboutUs?Id='+TeamMemberId);
  }
 
  GetAllTeamMemberinFrontEnd()
  {
    return <Observable<ResponseModel>> this.dataService.getData('TeamMemberInAboutUs/GetAllTeamMemberinFrontEnd');
  }
}
