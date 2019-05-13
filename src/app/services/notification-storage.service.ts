import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class NotificationStorageService {
  ///ticket/get-fcm-tokens get-fcm-notification
  // rootUrl = "http://192.168.1.230:8080/v3/ticket";
  rootUrl = environment.rootUrl;
  subscribeUrl = this.rootUrl + "/ticket/subscribe-token";
  unSubscribeUrl = this.rootUrl + "/ticket/unsubscribe-token";
  addNotificationUrl = this.rootUrl + "/ticket/add-fcm-notification";
  retriveTokensUrl = this.rootUrl + "/ticket/get-fcm-tokens";
  showNotificationPanel = this.rootUrl + "/ticket/update-fcm-notification-by-loginid";
  unreadSingleNotification = this.rootUrl + "/ticket/do-update-as-read";

  // {
  // "toLoginId":"rvuyyuru"
  // }

  constructor(@Inject(Http) public http: Http) { }

  //updating token in db
  updateToken(data) {

    // console.log('requstsd Object', data);

    return this.http.post(
      this.subscribeUrl,
      data).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }


  //removing token from db
  UnsubToken(token) {

    return this.http.post(
      this.unSubscribeUrl,
      token).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }


  //for retriving fcm tokens
  getTokens(data) {

    return this.http.post(
      this.retriveTokensUrl,
      data).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });

  }

  NotificountDecrese(data) {

    return this.http.post(
      this.showNotificationPanel,
      data).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });

  }



  //single notification unread
  singleNotifUnread(data) {

    return this.http.post(
      this.unreadSingleNotification,
      data).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }

}
