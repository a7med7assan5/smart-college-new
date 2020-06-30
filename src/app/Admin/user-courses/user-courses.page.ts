import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { first } from 'rxjs/operators';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import * as $ from 'jquery';
import * as dt from 'node_modules/datatables.net';

@Component({
  selector: 'app-user-courses',
  templateUrl: 'user-courses.page.html',
  styleUrls: ['user-courses.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class userCoursesPage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  userdata: any;
  usercoursesdata: any;
  usercoursesdata2: any;
  data: any[];
  coursedata: Array<any> = [];
  coursedataarr: Array<any> = [];
  x: any;


  arr: Array<object> = [];
  coursesdata: any;
  semesterdata: any;
  status: any;
  selectedLanguage: string;
  public columns: any;
  public rows: any[];
  objectC: any;
  courseCode: any;
  semester_time: any;
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
      { name: 'Id' },
      { name: 'courseName' },
      { name: 'semester_time' },
      { name: 'status' }
    ];
  }
  sub: any;
  onSelectChange(event: any) {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      //update the ui
      this.status = event.target.value;
      this.adminservices.myCoursesByStatus(this._id, this.status).subscribe(res => {
        this.usercoursesdata = res;
        if (res) {
          this.rows = res;
        }

      }, err => {
        this.usercoursesdata = err;
        this.rows = err;
      }
      );
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
      this._id = params.get('id');
      this.adminservices.myCourses(this._id).subscribe(res => {
        this.usercoursesdata = res;
        if (res) {
          this.rows = res;
        }

      }, err => {
        this.usercoursesdata = err;
        this.rows = err;
      });
    });

  }

  // closCourse() {
  //   this.courseService.closeCourse();
  // }
  openCourse(courseCode, semester_time) {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this._router.navigate(['/user/course/info/' + this._id, courseCode, semester_time])
    });
  }

  // closSemester() {
  //   this.semesterserviceService.closeSemester();
  // }
  openClickedUser() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this._id = params.get('id');
      this._router.navigate(['/user/add-delete-course/' + this._id])
    });
  }
}
