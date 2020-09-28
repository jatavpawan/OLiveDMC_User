import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { Status } from "src/app/model/ResponseModel";
import { AreaofexpertiseService } from "src/app/providers/AreaOfExpertiseService/areaofexpertise.service";
import { FresherCareerService } from "src/app/providers/FresherCareerService/fresher-career.service";
import { ProfessionalCareerService } from "src/app/providers/ProfessionalCareerService/professional-career.service";
import { ShareService } from "src/app/providers/sharedService/share.service";
import { SkillService } from "src/app/providers/SkillService/skill.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-public-career",
  templateUrl: "./public-career.component.html",
  styleUrls: ["./public-career.component.css"],
})
export class PublicCareerComponent implements OnInit {
  careerPerson = "student";
  skills: Array<any> = [];
  fresherForm: FormGroup;
  professionalForm: FormGroup;
  // studentForm: FormGroup;
  professionalResumeFileName: any = "";
  professionalProjectFileName: any = "";
  professionalResumeFile: any;
  professionalProjectFile: any;
  professionalResumeUploaded: boolean = false;
  professionalProjectUploaded: boolean = false;
  fresherResumeFile: any;
  fresherProjectFile: any;
  fresherResumeFileName: any = "";
  fresherProjectFileName: any = "";
  fresherResumeUploaded: boolean = false;
  fresherProjectUploaded: boolean = false;
  submitFresherForm: boolean;
  submitProfessionalForm: boolean = false;
  areaExperties: any;

  constructor(
    private shareService: ShareService,
    // private  spinner: NgxSpinner,
    private skillService: SkillService,
    private fresherService: FresherCareerService,
    private professionalService: ProfessionalCareerService,
    private areaExpertiseService: AreaofexpertiseService,
    private formBuilder: FormBuilder
  ) {
    this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    this.fresherForm = this.formBuilder.group({
      location: ["", Validators.required],
      skillId: ["", Validators.required],
      socialMediaProfile: ["", Validators.required],
      aboutMe: ["", Validators.required],
      uploadResume: ["", Validators.required],
      uploadProject: ["", Validators.required],
    });

    this.professionalForm = this.formBuilder.group({
      totalExperience: ["", Validators.required],
      highestQualification: ["", Validators.required],
      currentCompany: ["", Validators.required],
      currentLocation: ["", Validators.required],
      currentCtc: ["", Validators.required],
      expectedCtc: ["", Validators.required],
      skillId: ["", Validators.required],
      areaOfExpertise: ["", Validators.required],
      aboutMe: ["", Validators.required],
      uploadResume: ["", Validators.required],
      uploadProject: ["", Validators.required],
    });

    // this.studentForm = this.formBuilder.group({
    //    location : ['', Validators.required],
    //    skillId : ['', Validators.required],
    //    socialMediaProfile : ['', Validators.required],
    //    aboutMe : ['', Validators.required],
    //    uploadResume : ['', Validators.required],
    //    uploadProject : ['', Validators.required],
    // })
  }

  ngOnInit(): void {
    this.GetAllSkill();
    this.GetAllAreaExpertise();
  }

  changePersonIdentity(person) {
    debugger;
    this.careerPerson = person.value;
  }

  GetAllSkill() {
    this.skillService.GetAllSkills().subscribe((resp) => {
      if (resp.status == Status.Success) {
        this.skills = resp.data;
      } else {
        Swal.fire("Oops...", resp.message, "error");
      }
      // this.spinner.hide();
    });
  }

  GetAllAreaExpertise() {
    this.areaExpertiseService.GetAllAreaofexpertise().subscribe((resp) => {
      if (resp.status == Status.Success) {
        this.areaExperties = resp.data;
      } else {
        Swal.fire("Oops...", resp.message, "error");
      }
      // this.spinner.hide();
    });
  }

  FresherUploadResumeFile(uploadresume) {
    debugger;
    let files = uploadresume.files[0];
    var mimeType = files.type;
    this.fresherResumeFileName = files.name;

    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    this.fresherResumeFile = files;
    this.fresherResumeUploaded = true;
  }

  FresherUploadProjectFile(uploadproject) {
    debugger;
    let files = uploadproject.files[0];
    var mimeType = files.type;
    this.fresherProjectFileName = files.name;

    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    this.fresherProjectFile = files;
    this.fresherProjectUploaded = true;
  }

  ProfessionalUploadResumeFile(uploadresume) {
    debugger;
    let files = uploadresume.files[0];
    var mimeType = files.type;
    this.professionalResumeFileName = files.name;

    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    this.professionalResumeFile = files;
    this.professionalResumeUploaded = true;
  }

  ProfessionalUploadProjectFile(uploadproject) {
    debugger;
    let files = uploadproject.files[0];
    var mimeType = files.type;
    this.professionalProjectFileName = files.name;

    // if (mimeType.match(/image\/*/) == null) {
    //   return;
    // }

    this.professionalProjectFile = files;
    this.professionalProjectUploaded = true;
  }

  submitFresherData() {
    debugger;
    this.submitFresherForm = false;
    if (this.fresherForm.valid) {
      // this.spinner.show();
      let skillIds: string =  this.fresherForm.get("skillId").value.toString();
      let formData = new FormData();
      formData.append("Location", this.fresherForm.get("location").value);
      formData.append("SkillId", skillIds);
      formData.append(
        "SocialMediaProfile",
        this.fresherForm.get("socialMediaProfile").value
      );
      formData.append("AboutMe", this.fresherForm.get("aboutMe").value);
      formData.append("UploadResume", this.fresherResumeFile);
      formData.append("UploadProject", this.fresherProjectFile);

      this.fresherService.AddUpdateFresherCareer(formData).subscribe((resp) => {
        if (resp.status == Status.Success) {
          Swal.fire(
            "Saved!",
            "Your Fresher Career Record Saved, Our Representative Contact You Soon",
            "success"
          );

          this.fresherResumeUploaded = false;
          this.fresherProjectUploaded = false;
          this.fresherResumeFile = undefined;
          this.fresherProjectFile = undefined;
          this.resetFresherForm();
        } else {
          // this.spinner.hide();
          Swal.fire("Oops...", "Something went Wrong", "warning");
        }
      });
    } else {
      this.submitFresherForm = true;
    }
  }

  submitProfessionalData() {
    debugger;
    this.submitProfessionalForm = false;
    if (this.professionalForm.valid) {

       let skillIds: string =  this.professionalForm.get("skillId").value.toString();
       let areaIds: string =  this.professionalForm.get("areaOfExpertise").value.toString();
      // this.spinner.show();
      let formData = new FormData();
      formData.append(
        "TotalExperience",
        this.professionalForm.get("totalExperience").value
      );
      formData.append(
        "HighestQualification",
        this.professionalForm.get("highestQualification").value
      );
      formData.append(
        "CurrentCompany",
        this.professionalForm.get("currentCompany").value
      );
      formData.append(
        "CurrentLocation",
        this.professionalForm.get("currentLocation").value
      );
      formData.append(
        "CurrentCtc",
        this.professionalForm.get("currentCtc").value
      );
      formData.append(
        "ExpectedCtc",
        this.professionalForm.get("expectedCtc").value
      );
      formData.append("SkillId", skillIds);
      formData.append("AreaOfExpertise",areaIds);
      formData.append("AboutMe", this.professionalForm.get("aboutMe").value);
      formData.append("UploadResume", this.professionalResumeFile);
      formData.append("UploadProject", this.professionalProjectFile);

      this.professionalService
        .AddUpdateProfessionalCareer(formData)
        .subscribe((resp) => {
          if (resp.status == Status.Success) {
            Swal.fire(
              "Saved!",
              "Your Professional Career Record Saved, Our Representative Contact You Soon",
              "success"
            );

            this.professionalResumeUploaded = false;
            this.professionalProjectUploaded = false;
            this.professionalResumeFile = undefined;
            this.professionalProjectFile = undefined;
            this.resetProfessionalForm();
          } else {
            // this.spinner.hide();
            Swal.fire("Oops...", "Something went Wrong", "warning");
          }
        });
    } else {
      this.submitProfessionalForm = true;
    }
  }

  resetFresherForm() {

    this.fresherForm.reset();
    this.fresherForm.setValue({
      location: "",
      skillId: "",
      socialMediaProfile: "",
      aboutMe: "",
      uploadResume: "",
      uploadProject: "",
    });
  }

  resetProfessionalForm() {
    this.professionalForm.reset();
    this.professionalForm.setValue({
      totalExperience: "",
      highestQualification: "",
      currentCompany: "",
      currentLocation: "",
      currentCtc: "",
      expectedCtc: "",
      skillId: "",
      areaOfExpertise: "",
      aboutMe: "",
      uploadResume: "",
      uploadProject: "",
    });
  }

  removeFresherResume() {
    this.fresherResumeFile =  undefined;
    this.fresherResumeUploaded = false;
    this.fresherForm.get('uploadResume').setValue('');
    this.fresherResumeFileName = "";
 
  }

  removeFresherProject() {
    this.fresherProjectFile =  undefined;
    this.fresherProjectUploaded = false;
    this.fresherForm.get('uploadProject').setValue('uploadResume');
    this.fresherProjectFileName = "";

  }
 
  removeProfessionalResume() {
    this.professionalResumeFile =  undefined;
    this.professionalResumeUploaded = false;
    this.professionalForm.get('uploadResume').setValue('');
    this.professionalResumeFileName = "";
 
  }

  removeProfessionalProject() {
    this.professionalProjectFile =  undefined;
    this.professionalProjectUploaded = false;
    this.professionalForm.get('uploadProject').setValue('');
    this.professionalProjectFileName = "";

  }
}
