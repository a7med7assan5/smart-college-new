import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Semester, Role } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.page.html',
  styleUrls: ['user-profile.page.scss']
})
export class userProfilePage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  userdata: any;
  usercredithours: any;
  nohours: any;
  sub: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService
  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
  }
  get isStudent() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.adminservices.getUserprofiledata(this._id).subscribe(res => {
        this.userdata = res;
      }, err => {
        this.userdata = err
      }
      );
    });

    return this.userdata && this.userdata.role === Role.Student;
  }
  get isTeacher() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.adminservices.getUserprofiledata(this._id).subscribe(res => {
        this.userdata = res;
      }, err => {
        this.userdata = err
      }
      );
    });
    return this.userdata && this.userdata.role === Role.Teacher;
  }
  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.adminservices.getUserprofiledata(this._id).subscribe(res => {
        this.userdata = res;
      }, err => {
        this.userdata = err
      }
      );
      this.adminservices.calculatMyCreditHours(this._id).subscribe(res => {

        if (res == 0) {
          this.nohours = 'No Finished Hours Yet'
        }
        else {
          this.usercredithours = res;
        }
      }, err => {
        this.usercredithours = err
      }
      );
    });


  }
  // closClickedUser() {
  //   this.userserviceService.closeClickedUser();
  // }
  // openClickedUser(id) {
  //   this.userserviceService.getClickedUser(id).pipe(first()).subscribe(res => {
  //   }, err => {
  //     console.log('Fail to get Course');
  //   }
  //   );
  // }
}
