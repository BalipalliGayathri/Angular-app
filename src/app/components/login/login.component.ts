import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formudata = {
    uname: '', password: '', rememberme: 'true'
  };
  uname: string = '';
  password: string = '';
  usererror: boolean = false;
  passworderror: boolean = false;
  isVisable: boolean = false;
  spinner: boolean = false;
  disabled: boolean;
  waring: boolean;
  waring1: boolean;
  fullYear = (new Date()).getFullYear();

  constructor(public router: Router, public loginService: LoginService) { }

  ngOnInit() {

    //checking user auth
    if (localStorage.getItem('auth') != null) {
      var userInfo = localStorage.getItem('auth');
      var UserObject = JSON.parse(userInfo);
      //based on user role we are navigating to page
      if (UserObject.RoleName === 'Admin' || UserObject.RoleName === 'Agent' || UserObject.RoleName === 'Super-Admin') {

        this.router.navigateByUrl('admin/dashboard');

      } else {

        this.router.navigateByUrl('dashboard');

      }
    } else {
      this.router.navigateByUrl('login');
    }
  }

  //login function
  login() {

    var userResponse = {
      "LoginId": this.formudata.uname,
      "Password": this.formudata.password,
      "Authorization": "YWRtaW46YWRtaW4="
    }
    this.uname = this.formudata.uname;
    this.password = this.formudata.password;
    if ((this.uname === '' || this.uname == undefined) && this.uname.length == 0 && (this.password != '' || this.password != undefined) && this.password.length > 0) {
      this.usererror = true;
      this.passworderror = false;

    }
    else if ((this.password === '' || this.password == undefined) && this.password.length == 0 && (this.uname != '' || this.uname != undefined) && this.uname.length > 0) {
      this.usererror = false;
      this.passworderror = true;

    }
    else if ((this.password === '' || this.password == undefined) && this.password.length == 0 && (this.uname === '' || this.uname == undefined) && this.uname.length == 0) {
      this.usererror = true;
      this.passworderror = true;

    }
    else {
      this.disabled = true;
      this.spinner = true;
      this.usererror = false;
      this.passworderror = false;
      this.loginService.insertDocument(userResponse).subscribe(res => {
        // console.log("login details",res);
        if (res.ResultString === "Valid") {
                this.waring = false;
          this.disabled = false;
          this.spinner = false;
          this.waring1 = false;
          localStorage.setItem('auth', JSON.stringify(res));
          //this.router.navigateByUrl('userPanel');
          if (res.RoleName === 'Admin' || res.RoleName === 'Agent' || res.RoleName === 'Super-Admin') {

            this.router.navigateByUrl('admin/dashboard');

          } else {

            this.router.navigateByUrl('dashboard');
          }



        } else {
         
          this.spinner = false;
          this.waring = true;
          this.disabled = false;
          this.waring1 = false;

        }

        // this.i =0;
      }, error => {
        this.spinner = false;
        this.waring = false;
        this.waring1 = true;
        setTimeout(() => {
          this.waring1 = false;
          this.waring = false;
          this.disabled = false;
        }, 1000)
        console.log(error);

      })

    }



    //this.router.navigateByUrl('userPanel');
  }


}
