import { Component, OnInit } from '@angular/core';
import { User, Role, Semester } from 'src/app/_models';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-assignments',
  templateUrl: 'assignments.page.html',
  styleUrls: ['assignments.page.scss']
})
export class assignmentsPage implements OnInit {
  currentUser: User;

  _id: string;
  coursesdata: any;
  currentCourse: any;
  currentCourseSemester: Semester;
  coursesemesterdata: any;
  noTasks: string;
  selectedLanguage: string;
  sub: any;
  courseCode: string;
  semester_time: string;
  coursesemesterdata1: any;
  checkSemesterStatus: any;
  hidebutton: boolean;
  constructor(
    private _router: Router,
    private authenticationService: AuthService,
    private teacherservices: TeacherServiceService,
    private _Activatedroute: ActivatedRoute,
    private translateConfigService: TranslateConfigService,

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.currentUserValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
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

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.teacherservices.getCourseData(this.courseCode).subscribe(res => {
        this.coursesdata = res.course;
      }, err => {
        this.coursesdata = err
      }
      );
      this.teacherservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.coursesemesterdata1 = res.findsemesterdata.semesters[0];
        this.checkSemesterStatus = this.coursesemesterdata1.semester_status
        if (this.checkSemesterStatus == "finished") {
          this.hidebutton = false;
        }
        else if (this.checkSemesterStatus == "open") {
          this.hidebutton = true;
        }
        this.coursesemesterdata = res.findsemesterdata.semesters[0].tasks;
        if (this.coursesemesterdata.length == 0) {
          this.noTasks = "No Tasks Yet!"
        }
      }, err => {
        this.coursesemesterdata = err
      }
      );
    });

  }
  addTask() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this._router.navigate(['/course/semester/add-task/' + this.courseCode, this.semester_time])
    });
  }
  deleteTask() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this._router.navigate(['/course/semester/delete-task/' + this.courseCode, this.semester_time])
    });
  }
} 