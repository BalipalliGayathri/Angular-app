import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { Router } from '@angular/router';
import { TicketsAssignService } from '../../services/tickets-assign.service';
import { NotificationStorageService } from '../../services/notification-storage.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { FcmNotificationsService } from '../../services/fcm-notifications.service';
import { UsermoduleService } from '../../services/usermodule.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationsComponent implements OnInit {
  notificaText: string;
  badgeCount: any;
  input:any;
  userLoginId: any;
  allNotifications: any;
  alive = true;
  UserObject;
  selected = false;
  singleSelected = false;
  buttonInfo = 'Select All';
  notificationId =[]

  constructor(public notificationRetrive: NotificationsService, public userModulService: UsermoduleService,  public router: Router, public ticketsAssignServ: TicketsAssignService, private storage: AngularFireStorage, private fcmNotifications: FcmNotificationsService, public notification: NotificationStorageService) { }


  ngOnDestroy() {
    this.alive = false;
    // this.adminTeamService.replay.next("0");
  }

  ngOnInit() {
    var userInfo = localStorage.getItem('auth');
    this.UserObject = JSON.parse(userInfo);
    this.userLoginId = this.UserObject.LoginId;

    this.notificationRetrive.replay.takeWhile(() => this.alive).subscribe(res => {

      if (res != '0') {
        //retrvingData
        this.showNotifications(res);
      } else {
        this.showNotifications(res);
      }
    })

    //for retriving latest notifications
    this.getNotifications()
  }


  //show notifications
  showNotifications(res) {

    if (res === '0') {

      //notifications retriving api
      this.getNotifications();

    } else {

      this.allNotifications = res;


    }

  }

  convertToLocalDate(date) {

    var newstr = date.replace(" ", "T");
	
    let d = new Date(newstr);
 
 
     var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
   
   var reqFormat =  monthNames[d.getMonth()]+" "+d.getDate()+", "+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+ " GMT-0500"
   
     var now = new Date(reqFormat);
     var localDateTime = new Date(now.toUTCString());



    return localDateTime;
  }
  

  getNotifications() {
    let input = {
      "toLoginId": this.userLoginId
    }
    //retrive notifications
    this.notificationRetrive.retriveNotifications(input).subscribe(res => {

      this.badgeCount = res[0].unReadCount;
      this.allNotifications = res[0].fcmNotifications;

    }, error => {
      console.log(error);

    })

  }

  showEditnotfPanel(notification){

    this.unreadNotificatio(notification);
    this.input = {'id': notification.ticketId}
    if(notification.ticketcreatedBy === this.userLoginId){
      //this.ticketsAssignServ.userReplay.next(notification);
       this.userModulService.sendData.next(this.input);
      this.router.navigateByUrl('admin/my-ticket');
     
    } else {

     this.ticketsAssignServ.replay.next(this.input)
      this.router.navigateByUrl('admin/ticket');
    }

  }

  //unread notification
  unreadNotificatio(notification) {

        let notificationId =[];
        notificationId.push(notification.id)
      let RequestBody = {
        "notificationIds": notificationId,
        "modifiedBy":  this.userLoginId
        }

      if(notificationId.length > 0) {
        this.notification.singleNotifUnread(RequestBody).subscribe(res => {

          this.getNotifications();
          this.notificationRetrive.notification.next(this.allNotifications);
          notificationId =[];
        })
      }
    }

    //selecting all notifications
    selectAll() {

      if(this.selected === false){
        this.buttonInfo  = 'Deselect All';
        this.selected = !this.selected;
        this.singleSelected = false;
        this.readAllFunc();
      }
      else {
        this.selected = !this.selected;
        this.singleSelected = false;
        this.buttonInfo  = 'Select All';
        this.getNotifications();
        this.notificationId = [];
      }
  
    } 
  
   //read all function
   readAllFunc(){
    this.allNotifications.forEach(element => {
      if(this.notificationId.includes(element.id)){
  
      } else if(element.isRead === 1) {
        element.isRead =  element.isRead;
      } else  {
        element.isRead = !element.isRead;
      }
      
      //this.notificationId.push(element.id)
    }); 
  }
    
    addUnread(unReadNotifi){
    
      this.selected = false;
      this.singleSelected = true;      
      if(this.notificationId.includes(unReadNotifi.id)){
       
        for( var i = 0; i < this.notificationId.length; i++){ 
           if ( this.notificationId[i] === unReadNotifi.id) {
            this.notificationId.splice(i, 1); 
           }
        }

        if(this.notificationId.length === 1) {
          this.notificaText = "Read" ;
        }

        if(this.notificationId.length < 1) {
         // alert("inside");
          this.selected = false;
          this.singleSelected = false;
        }
        
      } else {
        this.notificationId.push(unReadNotifi.id);
        if(this.notificationId.length > 1) {
          this.notificaText = "Read All" ;
        } else {
          this.notificaText = "Read" ;
        }
      }

    }


    setdate(createdDate){
      var IST = new Date(createdDate); // Clone UTC Timestamp
      IST.setHours(IST.getHours() + 5); // set Hours to 5 hours later
     IST.setMinutes(IST.getMinutes() + 30); // set Minutes to be 30 minutes later
     return IST ;
  
    }

    
    //unread all
    readAll() {
           
      this.selected = false;
      this.allNotifications.forEach(element => {
        this.notificationId.push(element.id)
      });   
        let RequestBody = {
          "notificationIds": this.notificationId,
          "modifiedBy":  this.userLoginId
          }
        if(this.notificationId.length > 0) {
          this.notification.singleNotifUnread(RequestBody).subscribe(res => {
            this.getNotifications();
            this.notificationRetrive.notification.next(this.allNotifications);
            this.notificationId = [];
          })
        }
      } 


 readSelNotifications(){
  let RequestBody = {
    "notificationIds": this.notificationId,
    "modifiedBy":  this.userLoginId
    }
    if(this.notificationId.length > 0) {
          this.notification.singleNotifUnread(RequestBody).subscribe(res => {
            this.getNotifications();
            this.notificationRetrive.notification.next(this.allNotifications);
            this.notificationId = [];
          })
        }
 } 

}
