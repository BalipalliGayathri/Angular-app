import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app';
  //for network connection checking
  isConnected: Observable<boolean>;
  public online: Observable<boolean>;
  UserObject: any = {};
  userInfo = localStorage.getItem('auth');
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);


  constructor(public router: Router) { 
  
    //checking auth
    if(localStorage.getItem('auth') != null){
     
    } else {
      this.router.navigateByUrl('login');
    }
  
  }
 
  ngOnInit() {
    this.UserObject = JSON.parse(this.userInfo);

    this.isConnected = Observable.merge(
    Observable.of(navigator.onLine),
    Observable.fromEvent(window, 'online').map(() => true),
    Observable.fromEvent(window, 'offline').map(() => false));
    }


    

}



