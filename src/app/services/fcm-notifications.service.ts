import { Injectable, Inject } from '@angular/core';
import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Http, Headers, Response, RequestOptions, Httpclin } from '@angular/http';
import { NotificationStorageService } from './notification-storage.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { UsermoduleComponent } from '../components/usermodule/usermodule.component';
import { HeadderNavbarComponent } from '../components/headder-navbar/headder-navbar.component';
import { AdminrisingticktComponent } from '../components/adminrisingtickt/adminrisingtickt.component';
import { UsertickstatusComponent } from '../components/usertickstatus/usertickstatus.component';
import { TicketsAssignComponent } from '../components/tickets-assign/tickets-assign.component';


@Injectable()
export class FcmNotificationsService {

    RoleName: any = '';
    messaging = firebase.messaging()
    currentMessage = new BehaviorSubject(null)
    UserObject: any = {};
    userLoginId: any = '';
    subInput: {};
    userInfo = localStorage.getItem('auth');


    constructor(public http: HttpClient, public notificatStor: NotificationStorageService) { }

    // rootUrl = "http://192.168.1.230:8080/v3/ticket";
    rootUrl = environment.rootUrl;
    subscribeUrl = this.rootUrl + "/subscribe-token";
    unSubscribeUrl = this.rootUrl + "/unsubscribe-token";
    addNotificationUrl = this.rootUrl + "/add-fcm-notification";

    ngOnInit() {

        this.UserObject = JSON.parse(this.userInfo);

    }

    /** Request permission for sending notifications using browser **/
    getPermission(UserObjects) {

        this.messaging.requestPermission()
            .then(() => {
                return this.messaging.getToken()
            })
            .then(token => {

                this.UserObject = UserObjects;    
                this.userLoginId = this.UserObject.LoginId;
                this.RoleName = this.UserObject.RoleName;
                this.updateTokens(token);

            })
            .catch((err) => {
                console.log('Unable to get permission to notify.', err);
            });
    }

    //reciving notifications
    receiveMessage() {

        this.messaging.onMessage((payload) => {

            if (this.UserObject.RoleName === 'Admin' || this.UserObject.RoleName === 'Agent' || this.UserObject.RoleName === 'Super-Admin') {
                //notifications retriving for admin module
                //this.admiModule.ngOnInit();
                // this.admiModule.getNotifications();
                // //admin rising ticket
                // var pageNumber = 1;
                // this.adminrisingTickets.ticketsLoader(pageNumber);
                
            } else {
                // //notifications retriving for user module
                // this.userModule.getNotifications();
                // //admin rising ticket
                // var pageNumber = 1;
                // this.userModule.ticketsLoader(pageNumber);

                // this.adminDocs.retriveDocs();
                // //notifications retriving user ticket status
                // this.userTicketStatus.getNotifications();
            }

            this.currentMessage.next(payload)
        });
    }


    //sending notification to user
    sendMessage(fields) {
        let count = fields.listOfTokens
        let fullInfo = fields
        if (count.length > 0) {
            for (var _i = 0; _i < count.length; _i++) {
                this.sendNotification(count[_i], fullInfo);
            }
        } else {
            console.log('no tokens foubnd');
        }
        //closing of sending message functions    
    }

    //sending notifications through fcm api
    sendNotification(listofToken, details) {
        const fcmHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'key=' + environment.fcmAuthHeader /** Auth token generated in firebase console **/
        });

        const requestBody = {
            'notification': {
                'title': 'Helpdesk',
                'body': details.docData,
                'click_action': details.route,
                'icon': './assets/images/notifications.png',
                'badge': './assets/images/notifications.png'
            },
            'to': listofToken,
        };

        this.http.post(`https://fcm.googleapis.com/fcm/send`, requestBody,
            { headers: fcmHeaders }).subscribe();
        return;

    }

    //updating fcm token into db 
    updateTokens(token) {

        let subInput =
            {
                "loginId": this.userLoginId,
                "roleName": this.RoleName,
                "fcmToken": token
            }


        this.notificatStor.updateToken(subInput).subscribe(res => {
        }, error => {
            console.log(error);
            console.log('error');
        })
    }



}
