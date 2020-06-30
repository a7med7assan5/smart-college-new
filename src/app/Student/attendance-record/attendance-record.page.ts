import { Component, OnInit } from '@angular/core';
import { User, Role, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import * as $ from 'jquery';
import * as dt from 'node_modules/datatables.net';
@Component({
  selector: 'app-attendance-record',
  templateUrl: 'attendance-record.page.html',
  styleUrls: ['attendance-record.page.scss']
})
export class attendanceRecord implements OnInit {
  currentUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  mydata: any;
  myattendance: any;
  selectedLanguage: string;
  sub: any;
  courseCode: string;
  semester_time: string;
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,
    private translateConfigService: TranslateConfigService,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.currentUserValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
  get isStudent() {
    return this.currentUser && this.currentUser.role === Role.Student;
  }
  get isTeacher() {
    return this.currentUser && this.currentUser.role === Role.Teacher;
  }

  get isTeacherOrStudent() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Student);
  }


  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  ngOnInit(): void {
    $(document).ready(function () {
      dt.$('#table_id').DataTable();
    });
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.teacherservices.profile(this.currentUser._id).subscribe(res => {
        this.mydata = res
      }, err => {
        this.mydata = err;
      });
      this.teacherservices.semesterMyattendancesheet(this.currentUser._id, this.courseCode, this.semester_time).subscribe(res => {
        this.myattendance = res;
        console.log(this.myattendance)
      }, err => {
        this.myattendance = err;
      });


    });

  }


}