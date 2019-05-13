import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public router: Router, public location: Location) { }

  ngOnInit() {

    if(localStorage.getItem('auth') != null){
      var userInfo = localStorage.getItem('auth');
     var UserObject = JSON.parse(userInfo);
     //based on user role we are navigating to page
     if(UserObject.RoleName === 'Admin'|| UserObject.RoleName === 'Agent' || UserObject.RoleName === 'Super-Admin' ){
     
      if (this.location.path() === '/admin/ticket') {

        this.router.navigateByUrl('/admin/assign');
  
      } else if(this.location.path() === '/admin/team-member') {

        this.router.navigateByUrl('/admin/team');
      }

    } else {
       
      this.router.navigateByUrl('dashboard');
      
    }
    
    } else {

      this.router.navigateByUrl('login');
    }
  }

}
