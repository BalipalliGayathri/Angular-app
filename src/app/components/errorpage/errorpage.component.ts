import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-errorpage',
  templateUrl: './errorpage.component.html',
  styleUrls: ['./errorpage.component.scss']
})
export class ErrorpageComponent implements OnInit {
  roleName: any;
  UserObject: any;
  RoleNames:any;
  fullYear = (new Date()).getFullYear();
  constructor() { }

  ngOnInit() {
    var userInfo = localStorage.getItem('auth');
    // var UserObject = JSON.parse(userInfo);
    this.UserObject = JSON.parse(userInfo);
   // this.RoleNames = this.UserObject.RoleName;

    if (this.UserObject.RoleName === 'Admin' || this.UserObject.RoleName === 'Agent' || this.UserObject.RoleName === 'Super-Admin') {

    this.roleName = 'admin';

    } else {
      this.roleName = 'user';
    }

  }

}
