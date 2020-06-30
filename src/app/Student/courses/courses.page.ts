import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { first } from 'rxjs/operators';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

declare var $: any;
@Component({
  selector: 'app-courses',
  templateUrl: 'courses.page.html',
  styleUrls: ['courses.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class studentCoursesPage implements OnInit {
  _id: any;
  userdata: any;
  usercoursesdata: any;
  currentUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  coursesdata: any;
  arr: any[];
  courseSemesterdata: any;
  semesterdata: any;
  status: any;
  selectedLanguage: string;
  public columns: any;
  public rows: any;
  constructor(private teacherservices: TeacherServiceService, private _Activatedroute: ActivatedRoute,
    private _router: Router,
    private authenticationService: AuthService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private translateConfigService: TranslateConfigService,
    private http: HttpClient, public navCtrl: NavController
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }
  onSelectChange(event: any) {
    //update the ui
    this.status = event.target.value;

    this.teacherservices.myCoursesByStatus(this.currentUser._id, this.status).subscribe(res => {
      this.usercoursesdata = res;
    }, err => {
      this.usercoursesdata = err
    }
    );
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  ngOnInit(): void {
    this.teacherservices.myCourses(this.currentUser._id).subscribe(res => {
      this.usercoursesdata = res;
    }, err => {
      this.usercoursesdata = err
    });
  }
  openSemester(courseCode, semester_time) {
    this._router.navigate(['/course/semester/info/' + courseCode, semester_time])
  }

}