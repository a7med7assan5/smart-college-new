import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { first } from 'rxjs/operators';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import * as $ from 'jquery';
import * as dt from 'node_modules/datatables.net';

// declare var $: any;
@Component({
  selector: 'app-courses',
  templateUrl: 'courses.page.html',
  styleUrls: ['courses.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class adminCoursesPage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;
  coursedata: any[];
  department: any;
  selectedLanguage: string;
  public columns: any;
  public rows: any;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private translateConfigService: TranslateConfigService,
    private http: HttpClient, public navCtrl: NavController
  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
    this.columns = [
      { name: 'courseCode' },
      { name: 'courseName' },
      { name: 'creaditHours' },
      { name: 'status' }
    ];
  }
  onSelectChange(event: any) {
    //update the ui
    this.department = event.target.value;
    if (this.department == '') {
      this.adminservices.getCourses().subscribe(res => {
        this.coursedata = res;
        this.rows = res;
      }, err => {
        this.coursedata = err;
        this.rows = err;
      });
    }
    else {
      this.adminservices.getDepartmentCourses(this.department).subscribe(res => {
        this.coursedata = res;
        this.rows = res;
      }, err => {
        this.coursedata = err;
        this.rows = err;
      });
    }

  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  getCourses() {
    this.adminservices.getCourses().subscribe(res => {
      this.coursedata = res;
      this.rows = res;
    }, err => {
      this.coursedata = err;
      this.rows = err;
    });
  }
  ngOnInit(): void {
    $(document).ready(function () {
      dt.$('#table_id').DataTable();
    });

    this.getCourses();

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

  // closCourse() {
  //   this.courseService.closeCourse();
  //   console.log('ok');
  // }
  openCourse(courseCode) {
    // this.courseService.getCourse(courseCode).pipe(first()).subscribe(res => {
    //   if (res) {
    this._router.navigate(['/course/semesters/' + courseCode])
    // }

    // }, err => {
    //   console.log('Fail to get Course');
    // }
    // );

  }


  // closSemester() {
  //   this.semesterserviceService.closeSemester();
  // }
  // openSemester(courseCode, semester_time) {
  //   this.semesterserviceService.getCourseSemesterData(courseCode, semester_time).pipe(first()).subscribe(res => {
  //   }, err => {
  //     console.log('Fail to get Course Semester');
  //   }
  //   );
  // }
}
