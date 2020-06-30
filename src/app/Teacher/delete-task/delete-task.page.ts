import { Component, OnInit } from '@angular/core';
import { User, Role, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: 'delete-task.page.html',
  styleUrls: ['delete-task.page.scss']
})
export class deleteTaskPage implements OnInit {


  currentUser: User;
  currentCourseSemester: Semester;
  _id: string;
  coursedata: any;
  currentCourse: Course;
  taskType: string;
  coursesemesterdata: any;
  selectedLanguage: string;
  validations_form: FormGroup;
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
    private alertservice: AlertService,
    private formBuilder: FormBuilder,
    private translateConfigService: TranslateConfigService,

  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.currentUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
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
  onSelectChange(event: any) {
    //update the ui
    this.taskType = event.target.value;
  }
  DeleteTask() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.teacherservices.deleteCourseSemesterTask(this.courseCode, this.semester_time, this.taskType).subscribe(res => {
        this.alertservice.showAlert("&#xE876;", "success", res.msg);
        // this.navigateTo();
      }, err => {
        this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
      }
      );
    });

  }

  navigateTo() {
    this.router.navigate(['/courses']);
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.teacherservices.getCourseData(this.courseCode).subscribe(res => {
        this.coursedata = res.course;
      }, err => {
        this.coursedata = err
      }
      );
      this.teacherservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.coursesemesterdata = res.findsemesterdata.semesters[0].tasks;
      }, err => {
        this.coursesemesterdata = err
      }
      );
      this.validations_form = this.formBuilder.group({
        taskType: new FormControl('', Validators.required),
      });

    });

  }



}