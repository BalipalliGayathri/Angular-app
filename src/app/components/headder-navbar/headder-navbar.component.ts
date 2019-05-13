import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UsermoduleService } from '../../services/usermodule.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { FcmNotificationsService } from '../../services/fcm-notifications.service';
import { NotificationStorageService } from '../../services/notification-storage.service';
import { NgForm } from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TicketsAssignService } from '../../services/tickets-assign.service';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TicketsAssignComponent } from '../tickets-assign/tickets-assign.component';
import { UsertickstatusComponent } from '../usertickstatus/usertickstatus.component';
import { UsermoduleComponent } from '../usermodule/usermodule.component';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-headder-navbar',
  templateUrl: './headder-navbar.component.html',
  styleUrls: ['./headder-navbar.component.scss']
})
export class HeadderNavbarComponent implements OnInit {
  input: any;
  upload: string = 'Upload';
  fileerror1: boolean;
  fileerror: boolean;
  allNotificationsLength: any;
  allNotifications: any;
  userLoginId = '';
  userfullname = '';
  userFullname = '';
  listOftoken: any = [];
  designation = '';
  customRate: number = 0;
  designationShortName = '';
  department = '';
  fileName: string = '';
  departmentShortName = '';
  mainpanelFooter = true;
  categoryNames: any;
  selectedCategory = '';
  downloadURL: any;
  paraticId: any;
  UserLoginId;
  description: string = '';
  files: any;
  selectedSubCategory = '';
  title: string = '';
  editCategory = '';
  subCategoryNames;
  CategoryName: any;
  pathdata = '';
  path: string = '';
  showActivepanel;
  UserObject;
  flag: boolean = false;
  showAssignedPanel: boolean = false;
  fullYear = (new Date()).getFullYear();
  badgeCount: any = 0;
  alive = true;
  block: boolean = false;
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  locationu: string;
  shiftTimings: string;
  shifts:any = ["09:00 AM - 06:00PM","02:00PM - 11:00PM","06:00PM - 03:00AM","04:00PM - 01:00AM","24/7 Shift","24/5 Shift","Others"];
  badge:boolean = true;
  prevbadge:number;

  ngOnDestroy() {
    this.alive = false;
    // this.adminTeamService.replay.next("0");
  }


  constructor(public router: Router, public dialog: MatDialog, public ticketsAssignServ: TicketsAssignService, public notificationRetrive: NotificationsService, private fcmNotifications: FcmNotificationsService, private activeroute: ActivatedRoute, private storage: AngularFireStorage, public userModulService: UsermoduleService, public location: Location, public notification: NotificationStorageService) {

    this.pathdata = this.location.path();

  }

  ngOnInit() {

    this.notificationRetrive.notification.takeWhile(() => this.alive).subscribe(res => {

      if (res != '0') {
        //retrvingData
        this.getNotifications();
      }
    })

    //window.location.reload()
    var userInfo = localStorage.getItem('auth');
    this.UserObject = JSON.parse(userInfo);
    this.userLoginId = this.UserObject.LoginId;


    //for user permission
    this.fcmNotifications.getPermission(this.UserObject)

    //reciving notifications from sender fcm
    this.receiveMessage();

    //notifications retriving api
    this.getNotifications();


    var fullName = this.UserObject.FName + " " + this.UserObject.LName;
    this.userfullname = fullName;
    if (fullName.length > 18) {
      this.userfullname = fullName.substring(0, 18) + ".."
    } else {
      this.userfullname = fullName;
    }
    this.designation = this.UserObject.TitleTypeId;
    this.designationShortName = this.designation
    if (this.designation.length > 20) {
      this.designationShortName = this.designation.substring(0, 20) + "..."
    } else {
      this.designationShortName = this.UserObject.TitleTypeId;
    }
    this.department = this.UserObject.PracticeId;
    this.departmentShortName = this.department;
    if (this.departmentShortName.length > 20) {
      this.departmentShortName = this.department.substring(0, 20) + "..."
    }
    else {
      this.departmentShortName = this.department
    }

    //usermanagement panel showing 
    //tickets assigning panel showing conditions
    if (this.UserObject.RoleName === 'Admin' || this.UserObject.RoleName === 'Super-Admin') {

      this.showAssignedPanel = true;
      //un assigned retrive function
    } else {


    }

    //Retriving Category list
    this.userModulService.retriveCategories().subscribe(res => {
      this.categoryNames = res;
      var subCategry = "ITDept";
      var selected = { id: 1, teamName: "Mapps" };
      this.selectCategory(res)
    }, error => {
      console.log(error);
    })

    //notifications retriving api
    this.getNotifications();


    //closing of oninit
  }



  setdate(createdDate) {
    var IST = new Date(createdDate); // Clone UTC Timestamp
    IST.setHours(IST.getHours() + 5); // set Hours to 5 hours later
    IST.setMinutes(IST.getMinutes() + 30); // set Minutes to be 30 minutes later
    return IST;

  }


  //reciving notifications
  receiveMessage() {

    this.messaging.onMessage((payload) => {

      if (this.UserObject.RoleName === 'Admin' || this.UserObject.RoleName === 'Agent' || this.UserObject.RoleName === 'Super-Admin') {
        //notifications retriving for admin module
        //this.admiModule.ngOnInit();
        this.ngOnInit();

        // this.openTicketsLoad.ngOnInit();

      } else {


      }

      this.currentMessage.next(payload)

    });
  }



  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('login');

    let unSubNot = {
      "loginId": this.userLoginId
    }

    //unsub token from db
    this.notification.UnsubToken(unSubNot).subscribe(res => {
      this.subCategoryNames = res;
    }, error => {
      console.log(error);
    })

  }

  getNotifications() {
    let input = {
      "toLoginId": this.userLoginId
    }
    //retrive notifications
    this.notificationRetrive.retriveNotifications(input).subscribe(res => {
     
      this.badgeCount = res[0].unReadCount;
      this.allNotifications = res[0].fcmNotifications;
      this.allNotificationsLength = res[0].fcmNotifications.length;
      // console.log(this.badgeCount, this.prevbadge);
      if(this.badgeCount >= this.prevbadge){
        this.badge = true;
      }
      

    }, error => {
      console.log(error);
    })

  }

  hideFooter() {
    //$("#sidebar").toggle('sidebar-hidden'); 
    //this.toggleMenu();
    var body = $('body');

    if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
      body.toggleClass('sidebar-hidden');
    } else {
      body.toggleClass('sidebar-icon-only');
      this.mainpanelFooter = !this.mainpanelFooter;
    }

  }

  clearFiles() {
    this.upload = 'Upload'
    this.fileName = '';
    this.files = [];
    this.downloadURL = '';
    this.block = false;

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

  toggleMenu() {
    $('.sidebar-offcanvas').toggleClass('active')
  }

  getExten(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }

  //for uploading a file
  public uploadFile1(event) {

    this.files = event.target.files || event.srcElement.files;
    this.fileName = this.files[0].name;
    var exten = this.getExten(this.fileName)
    //  if(this.updateTicketFilename)


    if (exten[0] === 'jpg' || exten[0] === 'png' || exten[0] === "PNG" || exten[0] === "jpeg" || exten[0] === "pdf") {
      this.fileerror = false;
      if (this.files[0].size <= 1048576) {
        this.upload = 'Re-upload';
        this.fileerror1 = false;
        if (this.fileName.length > 16) {
          this.fileName = this.fileName.substring(0, 15);
          this.fileName = this.fileName + '...' + exten;
        }
        if (this.fileName.length > 0 && this.fileName != '') {
          this.flag = true;

        }
        else {
          this.flag = false;

        }
      }

      else {
        // this.fileerror = true;
        this.fileerror1 = true;
        this.fileName = '';
        this.files = [];

      }

    }
    else {
      this.fileName = '';
      this.files = [];
      this.fileerror = true;
    }



  }


  //Sub Category
  selectCategory(subCategoryValue) {
    var subCategry = { "teamName": subCategoryValue.teamName };
    this.CategoryName = subCategry.teamName;
    this.editCategory = subCategry.teamName;
    //Retriving sub Category list
    this.userModulService.retriveSubCategories(subCategry).subscribe(res => {
      this.subCategoryNames = res;
    }, error => {
      console.log(error);
    })
  }

  //substring of data
  subStringData(data) {
    if (data.length > 16) {
      return data.substring(0, 16) + "..";
    } else {

      return data;

    }

  }


  // add new  ticket 
  Submit(c: NgForm) { //new
    this.block = true;
    setTimeout(() => {
      this.block = false;
    }, 6000);
    
    if (this.fileName.length > 0 && this.fileName != '') {
      let date = new Date();
        // this.path = '/test' + this.filename1[x];
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];
        // tslint:disable-next-line:prefer-const
      
        // tslint:disable-next-line:prefer-const
        let fileMonth = monthNames[date.getMonth()];
        // var month = dateObj.getUTCMonth() + 1; //months from 1-12
        let fileYear = date.getUTCFullYear();
        this.path = `help_desk/${fileYear}/${fileMonth}/${new Date().getTime()}_${this.fileName}`;
    
        //this.path = `test/${date}_${this.fileName}`;
      const fileRef = this.storage.ref(this.path);

      const task = fileRef.put(this.files[0], { customMetadata: { blah: 'blah' } }).then((snapshot) => {

        this.downloadURL = snapshot.downloadURL;
        let data = {
          category: this.CategoryName,
          subCategory: this.selectedSubCategory,
          ticketTitle: this.title,
          description: this.description,
          createdBy: this.userLoginId,
          attachmentName: this.fileName,
          createdByName: this.userfullname,
          attachmentLocation: this.downloadURL,
          createdByDepartment: this.paraticId,
          location:  this.UserObject.Location,
          shiftTimings: this.UserObject.ShiftTimings 
        }
        this.userModulService.insertDocument(data).subscribe((result) => {

          //this.updatingDataInPanel()
          $("#exampleModal-6").modal("show");
          setTimeout(() => { $("#exampleModal-6").modal("hide"); }, 2000)
          this.closeTicket(c);
          
         

          //for notifications sending
          let input = {
            "purpose": "created",
            "id": result.id
          }

          this.sendNotification(input, result);


        }, error => {
          this.block = false;
          console.log(error)
        });
      })
    }
    else {
      let data = {
        category: this.CategoryName,
        subCategory: this.selectedSubCategory,
        ticketTitle: this.title,
        description: this.description,
        createdBy: this.userLoginId,
        attachmentName: '',
        createdByName: this.userfullname,
        attachmentLocation: '',
        createdByDepartment: this.paraticId,
        location: this.UserObject.Location,
        shiftTimings: this.UserObject.ShiftTimings 
      }
      this.userModulService.insertDocument(data).subscribe((result) => {
        // this.updatingDataInPanel();
        $("#exampleModal-6").modal("show");
        setTimeout(() => { $("#exampleModal-6").modal("hide"); }, 2000)
        this.closeTicket(c);
        // this.block = false;
        //for notifications sending
        let input = {
          "purpose": "created",
          "id": result.id
        }

        this.sendNotification(input, result);

      }, error => {
        this.block = false;
        console.log(error)
      });
    }
  }

  closeModel() {
    $("#exampleModal-41").modal("hide");
  }
  closeTicket(c: NgForm) {

    $("#exampleModal-41").modal("hide");
    c.form.reset();
    this.selectedSubCategory = ''
    this.selectedCategory = '';
    this.fileName = '';
    this.files = [];
    this.title = '';
    this.fileerror = false;
    this.fileerror1 = false;
    this.upload = 'Upload';
    this.block = false;
    // this.description = '';
    // this.selectedSubCategory = 'Select Catagory';
  }



  //sending notifications 
  sendNotification(data, docData) {

    this.notification.getTokens(data).subscribe(res => {

      var listOfTokens = res.TokenList.AdminTokenList;
      var notificationBody = '@ ' + docData.createdBy + ' has raised a ticket on ' + docData.subCategory;

      if (listOfTokens.length > 0) {
        for (var i = 0; i < listOfTokens.length; i++) {
          this.listOftoken.push(listOfTokens[i].fcmToken);

        }

        //sending notification to user 
        this.sendNotifications(this.listOftoken, notificationBody);
        this.listOftoken = [];
      }

    }, error => {
      console.log(error);

    })

  }


  //sending notification
  sendNotifications(listOfTokens, docData) {

    let inputs = {
      'listOfTokens': listOfTokens,
      'docData': docData,
      'route': '/admin/assign'
    }
    this.fcmNotifications.sendMessage(inputs);

  }


  //showing all notifications in notifications panel
  showNotification() {

    this.notificationRetrive.replay.next(this.allNotifications);

  }

  //decreasing notification count when user seen his all notifications
  refresNotificatCount() {
    let data = {
      "toLoginId": this.userLoginId
    }

    this.notification.NotificountDecrese(data).subscribe(res => {
      this.getNotifications();
    })
  }

  openNotification(data) {
    this.badge = false;
    this.prevbadge = this.badgeCount;
    this.input = { 'id': data.ticketId }
    this.unreadNotificatio(data);
    if (data.ticketcreatedBy === this.userLoginId) {

      this.ticketsAssignServ.userReplay.next(data);
      this.router.navigateByUrl('/admin/my-ticket');

    } else {
      this.ticketsAssignServ.replay.next(this.input)
      this.router.navigateByUrl('admin/ticket');
    }

  }

  //unread notification
  unreadNotificatio(notification) {

    let notificationId = []
    notificationId.push(notification.id)
    let RequestBody = {
      "notificationIds": notificationId,
      "modifiedBy": this.UserLoginId
    }

    if (notificationId.length > 0) {
      this.notification.singleNotifUnread(RequestBody).subscribe(res => {

        this.getNotifications();
      })
    }
  }

}
