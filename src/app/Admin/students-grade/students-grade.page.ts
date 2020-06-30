
import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Semester, Role } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import * as $ from 'jquery';
import * as dt from 'node_modules/datatables.net';
@Component({
  selector: 'app-students-grade',
  templateUrl: 'students-grade.page.html',
  styleUrls: ['students-grade.page.scss']
})
export class studentsGradePage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  courseStudentsGrades: any;
  GradeTypeGrade: any;
  gradetype: any;
  courseGradeData: any;
  courseGrades: any;
  x: any;
  things: any[][];
  coursedata: any;
  useragrade: any;
  courseusers: any;
  userdata: any;
  usertotalgrades: any;
  arrayofusersdata: Array<object> = [];
  usertotalgradestotal: Array<object> = [];
  fakedata: any;
  courseTotalGrades: any;
  courseDataCode: any;
  semester_time: string;
  courseSemesterDataCode: any;
  selectedLanguage: string;
  courseCode: string;
  currentUser: User;
  checkSemesterStatus: any;
  hidebutton: boolean;

  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private authenticationService: AuthService,
    private translateConfigService: TranslateConfigService,
    private http: HttpClient, public navCtrl: NavController
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.things = [];
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
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
  getcoursedata(x, y) {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.adminservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.coursedata = res.findsemesterdata.semesters[0].grades;

        this.courseDataCode = res.findsemesterdata;
        this.courseSemesterDataCode = res.findsemesterdata.semesters[0];
        this.checkSemesterStatus = this.courseSemesterDataCode.semester_status;
        if (this.checkSemesterStatus == "finished") {
          this.hidebutton = false;
        }
        else if (this.checkSemesterStatus == "open") {
          this.hidebutton = true;
        }
        // this.courseTotalGrades = this.coursedata.length;
        for (let i = 0; i < this.coursedata.length; i++) {
          this.adminservices.semesterStudentsGradesheet(x, this.courseCode, this.semester_time, this.coursedata[i].type).subscribe(res => {
            // this.fakedata = { "_id": "5eba5bb7900576e5c44f34b2", "studentId": x, "courseId": this.currentCourse.courseCode, "gradeType": this.coursedata[i].type, "score": 100, "__v": 0 }
            this.useragrade = res.score;
            this.things[y][i] = this.useragrade;
          }, err => {
            this.useragrade = err
          });

        }
      }, err => {
        this.coursedata = err
      });
    });

  }

  ngOnInit(): void {
    $(document).ready(function () {
      dt.$('#table_id').DataTable();
    });
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.adminservices.totalCourseSemesterGrades(this.courseCode, this.semester_time).subscribe(res => {
        this.courseTotalGrades = res
      }, err => {
        this.courseTotalGrades = err
      });
      this.adminservices.getCourseSemesterStudentsSheet(this.courseCode, this.semester_time).subscribe(res => {
        this.courseusers = res;
        for (let y = 0; y < this.courseusers.length; y++) {
          this.adminservices.profile(this.courseusers[y]._id).subscribe(res => {
            this.userdata = res

            this.adminservices.semesterStudentTotalGrades(this.courseusers[y]._id, this.courseCode, this.semester_time).subscribe(res => {
              this.usertotalgrades = res
              this.usertotalgradestotal[y] = this.usertotalgrades;
            }, err => {
              this.usertotalgrades = err
            });

            this.arrayofusersdata[y] = this.userdata;
            this.things[y] = [];
            this.getcoursedata(this.userdata._id, y);
          }, err => {
            this.userdata = err
          });

        }
      }, err => {
        this.courseusers = err;
      });
    });


  }

  addStudentGrade() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this._router.navigate(['/course/semester/add-student-grade/' + this.courseCode, this.semester_time])
    });
  }
  updateStudentGrade() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this._router.navigate(['/course/semester/update-student-grade/' + this.courseCode, this.semester_time])
    });

  }
  gradesReport() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this._router.navigate(['/course/semester/students-grades-report/' + this.courseCode, this.semester_time])
    });

  }
}
