import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminservicesService } from 'src/app/services/adminservices.service';
import { User, Semester } from 'src/app/_models';
import { Course } from 'src/app/_models/course';
import { ActivatedRoute, Router } from '@angular/router';
import { UserserviceService } from 'src/app/services/userservice.service';
import { CourseService } from 'src/app/services/course.service';
import { SemesterserviceService } from 'src/app/services/semesterservice.service';
import { first } from 'rxjs/operators';
import { TranslateConfigService } from 'src/app/services/translate-config.service';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import * as $ from 'jquery';
import * as dt from 'node_modules/datatables.net';

// declare var $: any;
@Component({
  selector: 'app-admin-users',
  templateUrl: 'users.page.html',
  styleUrls: ['users.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class usersPage implements OnInit {
  currentClickedUser: User;
  currentCourse: Course;
  currentCourseSemester: Semester;

  usersdata: any[];
  role: any;
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
      { name: '_id' },
      { name: 'name' },
      { name: 'email' }
    ];
  }

  onSelectChange(event: any) {
    //update the ui
    this.role = event.target.value;
    if (this.role == '') {
      this.adminservices.getUsers().subscribe(res => {
        this.usersdata = res;
        this.rows = res;
      }, err => {
        this.usersdata = err;
        this.rows = err;
      }
      );
    }
    else {
      this.adminservices.getUsersByRole(this.role).subscribe(res => {
        this.usersdata = res;
        this.rows = res;
      }, err => {
        this.usersdata = err;
        this.rows = err;
      }
      );
    }

  }

  languageChanged() {
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }

  ngOnInit(): void {
    $(document).ready(function () {
      dt.$('#table_id').DataTable();
    });
    this.adminservices.getUsers().subscribe(res => {
      this.usersdata = res;
      this.rows = res;
    }, err => {
      this.usersdata = err;
      this.rows = err;
    }
    );


  }
  // closClickedUser() {
  //   this.userserviceService.closeClickedUser();
  // }
  openClickedUser(id) {
    this._router.navigate(['/user/profile/' + id])
  }

}
