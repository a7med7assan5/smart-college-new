import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User, Role, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import * as $ from 'jquery';
import * as dt from 'node_modules/datatables.net';
@Component({
  selector: 'app-attendance-sheet-student',
  templateUrl: 'attendance-sheet-student.page.html',
  styleUrls: ['attendance-sheet-student.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class teacherAttendanceSheetStudentPage implements OnInit {
  currentUser: User;

  coursedata: any;
  courseusers: any;


  arrayofuserdata: Array<any> = [];
  arrayofstudentattendance: Array<any> = [];
  arrayofstudentattendance2: Array<object> = [];
  lecturesnumber: any;
  data: any;
  lectureattendance: any;

  arrayofusersdata: Array<any> = [];
  attendata: any;
  userdata: any;

  arrofdata: any;
  userattendance: any;


  things: any[][];
  usertotalattendance: any;
  usertotalattendancetotal: Array<object> = [];
  coursesdata: any;
  selectedLanguage: string;
  public columns: any;
  public rows: any;
  sub: any;
  courseCode: string;
  semester_time: string;
  courseCode1: any;


  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,

    private translateConfigService: TranslateConfigService,
    private http: HttpClient, public navCtrl: NavController

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.currentUserValue;

    this.things = [];
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.columns = [
      { name: '_id' },
      { name: 'name' },
      { name: 'Week {{lectures.lectureNumber}}' },
      { name: 'Total ({{lecturesnumber}})' }
    ];
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

  getcoursedata(x, y) {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.teacherservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.coursedata = res.findsemesterdata.semesters[0].lectures;
        this.courseCode1 = res.findsemesterdata;

        this.lecturesnumber = this.coursedata.length;
        for (let i = 0; i < this.coursedata.length; i++) {
          this.teacherservices.studentsSemesterAttendancesheet(x, this.courseCode, this.semester_time, this.coursedata[i].lectureNumber).subscribe(res => {
            this.userattendance = res;
            this.things[y][i] = this.userattendance;
          }, err => {
            this.userattendance = err
          });

        }
      }, err => {
        this.coursedata = err
      });
    });

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
      this.teacherservices.getCourseData(this.courseCode).subscribe(res => {
        this.coursesdata = res.course;
      }, err => {
        this.coursesdata = err
      }
      );

      this.teacherservices.getCourseSemesterStudentsSheet(this.courseCode, this.semester_time).subscribe(res => {
        this.courseusers = res;
        for (let y = 0; y < this.courseusers.length; y++) {
          this.teacherservices.profile(this.courseusers[y]._id).subscribe(res => {
            this.userdata = res

            this.teacherservices.semesterStudentTotalAttendance(this.courseusers[y]._id, this.courseCode, this.semester_time).subscribe(res => {
              this.usertotalattendance = res
              this.usertotalattendancetotal[y] = this.usertotalattendance;
            }, err => {
              this.usertotalattendance = err
            });
            this.arrayofusersdata[y] = this.userdata;
            this.things[y] = [];
            this.getcoursedata(this.arrayofusersdata[y]._id, y);
          }, err => {
            this.userdata = err
          });

        }
      }, err => {
        this.courseusers = err;
      });

    });

  }

}