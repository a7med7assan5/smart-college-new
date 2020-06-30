import { Component, OnInit } from '@angular/core';
import { User, Role, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import * as $ from 'jquery';
import * as dt from 'node_modules/datatables.net';
@Component({
  selector: 'app-grades',
  templateUrl: 'grades.page.html',
  styleUrls: ['grades.page.scss']
})
export class gradesPage implements OnInit {
  currentUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  GradeTypeGrade: any;
  studentgrades: any;
  gradetype: any;
  arrofdata: Array<any> = [];
  x: any;
  mydata: any;
  courseTotalGrades: any;
  usertotalgrades: any;
  selectedLanguage: string;
  public columns: any;
  public rows: any;
  sub: any;
  courseCode: string;
  semester_time: string;
  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private translateConfigService: TranslateConfigService,
    private http: HttpClient, public navCtrl: NavController

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.currentUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue; this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.columns = [
      { name: '_id' },
      { name: 'name' },
      { name: '{{grades.type}}({{grades.grade}})' },
      { name: 'Total({{courseTotalGrades.totalGrades}})' }
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




  ngOnInit(): void {
    $(document).ready(function () {
      dt.$('#table_id').DataTable();
    });
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.teacherservices.totalCourseSemesterGrades(this.courseCode, this.semester_time).subscribe(res => {
        this.courseTotalGrades = res
      }, err => {
        this.courseTotalGrades = err
      });

      this.teacherservices.semesterStudentTotalGrades(this.currentUser._id, this.courseCode, this.semester_time).subscribe(res => {
        this.usertotalgrades = res
      }, err => {
        this.usertotalgrades = err
      });

      this.teacherservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.GradeTypeGrade = res.findsemesterdata.semesters[0].grades;
        for (let i = 0; i < this.GradeTypeGrade.length; i++) {
          this.teacherservices.getMyCourseSemesterGrades(this.currentUser._id, this.courseCode, this.semester_time, this.GradeTypeGrade[i].type).subscribe(res => {
            this.studentgrades = res;
            if (this.studentgrades) {
              this.arrofdata.push(this.studentgrades);
            }
          }, err => {
            this.studentgrades = err;
          });

        }


      }, err => {
        this.GradeTypeGrade = err;
      }
      );


    });


  }

}