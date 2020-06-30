import { Component, OnInit } from '@angular/core';
import { User, Role, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';

@Component({
  selector: 'app-add-lecture',
  templateUrl: 'add-lecture.page.html',
  styleUrls: ['add-lecture.page.scss']
})
export class addLecturePage implements OnInit {
  currentCourseSemester: Semester;
  currentUser: User;
  currentCourse: Course;
  _id: string;
  coursesdata: any;

  lectureNumber: string;
  lectureLocation: string;
  beaconId: string;
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

    private alertservice: AlertService,
    private formBuilder: FormBuilder,
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
  AddLeacture(lectureNumber: HTMLInputElement, lectureLocation: HTMLInputElement, beaconId: HTMLInputElement) {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.lectureNumber = lectureNumber.value, this.lectureLocation = lectureLocation.value, this.beaconId = beaconId.value;
      this.teacherservices.addCourseSemesterLecture(this.courseCode, this.semester_time, this.lectureNumber, this.lectureLocation, this.beaconId).subscribe(res => {
        this.teacherservices.addCourseSemesterAttendance(this.courseCode, this.semester_time, this.lectureNumber, this.beaconId).subscribe(res => {
          this.alertservice.showAlert("&#xE876;", "success", res.msg);
          lectureNumber.value = "";
          lectureLocation.value = "";
          beaconId.value = "";
        }, err => {
          this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
        })

      }, err => {
        this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
      });
    });

  }

  navigateTo() {
    this.router.navigate(['/courses']);
  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  ngOnInit(): void {
    this.validations_form = this.formBuilder.group({
      lectureNumber: new FormControl('', Validators.compose([
        Validators.max(12),
        Validators.min(1),
        Validators.required,
      ])),
      location: new FormControl('', Validators.required),
      beaconid: new FormControl('', Validators.required),
    });

  }

  validation_messages = {
    'lectureNumber': [
      { type: 'min', message: 'Lecture Number must be at least 1.' },
      { type: 'max', message: 'Lecture Number cannot be more than 12.' },
      { type: 'required', message: 'Lecture Number is required.' },
    ],
    'location': [
      { type: 'required', message: 'Location is required.' }
    ],
    'beaconid': [
      { type: 'required', message: 'Beacon ID is required.' }
    ]

  };


}