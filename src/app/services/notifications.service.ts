import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class NotificationsService {

  replay = new BehaviorSubject('0');
  notification = new BehaviorSubject('0');
 
  constructor(public http: HttpClient) { }

  // rootUrl = "http://192.168.1.230:8080/v3/ticket/";
  rootUrl = environment.rootUrl;
  getNotificationsUrl = this.rootUrl + "/ticket/get-fcm-notification-by-loginid";
  notificationsShowStatusUrl = this.rootUrl + '/ticket/update-fcm-notification-by-loginid';

  //retrive notifications
  retriveNotifications(input) {
    // console.log('inside of service panel', input)
    return this.http.post(
      this.getNotificationsUrl, input).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse;
      }, error => {
        console.log(error);
      });
  }


  //notificationsShowStatus
  NotificationShowStat(input) {
    return this.http.post(
      this.notificationsShowStatusUrl, input).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }

}
