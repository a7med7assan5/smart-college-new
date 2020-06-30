import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Semester, Role } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';

import * as $ from 'jquery';
import * as dt from 'node_modules/datatables.net';
@Component({
  selector: 'app-course-info',
  templateUrl: 'course-info.page.html',
  styleUrls: ['course-info.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class courseInfoPage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  courseCode: any;
  coursedata: any;
  numberofusers: any;
  semester_time: string;
  coursesemesterdata: any;
  coursaSemesterGrades: any;
  selectedLanguage: string;
  public columns: any;
  public rows: any;
  currentUser: User;
  checkcoursesemesterstatus: any;
  checkSemesterStatus: any;
  hidebutton: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private authenticationService: AuthService,
    private translateConfigService: TranslateConfigService,
    private http: HttpClient, public navCtrl: NavController
  ) {
    this.currentUser = this.authenticationService.currentUserValue;

    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.columns = [
      { name: 'type' },
      { name: 'grade' }
    ];
  }
  sub: any;

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }
  get isStudent() {
    return this.currentUser && this.currentUser.role === Role.Student;
  }
  get isTeacher() {
    return this.currentUser && this.currentUser.role === Role.Teacher;
  }
  get isTeacherOrAdmin() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Admin);
  }
  get isTeacherOrStudent() {
    return this.currentUser && (this.currentUser.role === Role.Teacher || this.currentUser.role === Role.Student);
  }
  // get courseOpen() {
  //   this.sub = this._Activatedroute.paramMap.subscribe(params => {
  //     this.courseCode = params.get('courseCode');
  //     this.semester_time = params.get('semester_time');
  //     this.adminservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
  //       this.checkcoursesemesterstatus = res.findsemesterdata.semesters[0];
  //     }, err => {
  //       this.checkcoursesemesterstatus = err;
  //     });
  //   });
  //   return this.checkcoursesemesterstatus.semester_status === "open";
  // }
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

      this.adminservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.coursesemesterdata = res.findsemesterdata.semesters[0];
        this.rows = res.findsemesterdata.semesters[0].grades;
        this.checkSemesterStatus = this.coursesemesterdata.semester_status
        if (this.checkSemesterStatus == "finished") {
          this.hidebutton = false;
        }
        else if (this.checkSemesterStatus == "open") {
          this.hidebutton = true;

        }
      }, err => {
        this.rows = err;
      });
      this.adminservices.getCourseData(this.courseCode).subscribe(res => {
        this.coursedata = res.course;
        // this.rows = res.course;
      }, err => {
        this.coursedata = err;
      }
      );
    });
  }

}
