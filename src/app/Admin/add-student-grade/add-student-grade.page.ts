import { Component, OnInit } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { AlertService } from 'src/app/services/alert.service';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student-grade',
  templateUrl: 'add-student-grade.page.html',
  styleUrls: ['add-student-grade.page.scss']
})
export class addStudentGradePage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  _id: any;
  courseStudentsGrades: any;
  coursedata: any;
  gradeType: any;
  studentId: any;
  types: Array<string>;
  score: any;
  coursesemesterdata: any;
  coursaSemesterGrades: any;
  semester_time: string;
  selectedLanguage: string;
  validations_form: FormGroup;
  courseCode: string;
  constructor(private adminservices: AdminservicesService, private _Activatedroute: ActivatedRoute, private formBuilder: FormBuilder,
    private _router: Router,
    private userserviceService: UserserviceService,
    private courseService: CourseService,
    private semesterserviceService: SemesterserviceService,
    private alertservice: AlertService,
    private translateConfigService: TranslateConfigService
  ) {
    this.currentClickedUser = this.userserviceService.currentClickedUserValue;
    this.currentCourse = this.courseService.currentCourseValue;
    this.currentCourseSemester = this.semesterserviceService.currentCourseSemesterValue;
    this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  sub: any;
  onSelectChange(event: any) {
    //update the ui
    this.gradeType = event.target.value;
  }
  addStudentGrade(studentId: HTMLInputElement, score: HTMLInputElement) {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');

      this.studentId = studentId.value, this.score = score.value;
      this.adminservices.addSemesterStudentGrade(this.courseCode, this.studentId, this.semester_time, this.gradeType, this.score).subscribe(res => {
        this.alertservice.showAlert("&#xE876;", "success", res.msg);
        studentId.value = "";
        score.value = "";
      }, err => {
        this.alertservice.showAlert("&#xE5CD;", "error", err.error.msg);
      }
      );
    });

  };

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
  ngOnInit(): void {
    this.types = [
      "Assignment",
      "Quiz 1",
      "Quiz 2",
      "Quiz 3",
      "Midterm",
      "Practice",
      "Final"
    ];

    this.validations_form = this.formBuilder.group({
      id: new FormControl('', Validators.compose([
        Validators.maxLength(8),
        Validators.minLength(8),
        Validators.max(20301800),
        Validators.min(20201800),
        Validators.required
      ])),
      gradetype: new FormControl(this.types[0], Validators.required),
      grade: new FormControl('', Validators.compose([
        Validators.max(100),
        Validators.min(0),
        Validators.required
      ])),
    });
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.courseCode = params.get('courseCode');
      this.semester_time = params.get('semester_time');
      this.adminservices.getCourseData(this.courseCode).subscribe(res => {
        this.coursedata = res.course;
      }, err => {
        this.coursedata = err;
      }
      );
      this.adminservices.getCourseSemesterData(this.courseCode, this.semester_time).subscribe(res => {
        this.coursesemesterdata = res.findsemesterdata.semesters[0];
        this.coursaSemesterGrades = res.findsemesterdata.semesters[0].grades;
      }, err => {
        this.coursesemesterdata = err;
      }
      );
    });

  }

  validation_messages = {
    'id': [
      { type: 'maxlength', message: 'ID cannot be more than 8 characters long.' },
      { type: 'minlength', message: 'ID must be at least 8 characters long.' },
      { type: 'max', message: 'ID cannot be more than 20301800.' },
      { type: 'min', message: 'ID must be at least 20201800.' },
      { type: 'required', message: 'ID is required.' }

    ],
    'grade': [
      { type: 'required', message: 'Grade is required.' },
      { type: 'min', message: 'Grade must be at least 0 Marks.' },
      { type: 'max', message: 'Grade cannot be more than 100 Marks.' },
    ]
  };

}
