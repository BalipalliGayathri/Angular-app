import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UsermoduleService } from '../../services/usermodule.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs/Observable';
import { TicketsAssignService } from '../../services/tickets-assign.service';
import * as firebase from 'firebase';
import { NgForm } from '@angular/forms';
import { FcmNotificationsService } from '../../services/fcm-notifications.service';
import { NotificationStorageService } from '../../services/notification-storage.service';
import { NotificationsService } from '../../services/notifications.service';
import { RatingModule } from "ngx-rating";
import { BehaviorSubject } from 'rxjs';
declare var $: any;


@Component({
  selector: 'app-usermodule',
  templateUrl: './usermodule.component.html',
  styleUrls: ['./usermodule.component.scss']
})

export class UsermoduleComponent implements OnInit {
  notificaText: string;
  selected = false;
  modeHide: boolean = true;
  enableReopen: boolean = false;
  enableComplete: boolean = false;
  enableRating: boolean = false;
  enableCancel: boolean = false;
  upload: string = 'Upload';
  fileerror1: boolean;
  notifyStatus: boolean;
  allNotificationsLength: any;
  starRating: boolean = false;
  allNotifications: any;
  listOftoken: any = [];
  listOfAdmintoken: any = [];
  listOfAgenttoken: any = [];
  selectName: string;
  statusInfo: any;
  assignedTo: any;
  currentStatus: any;
  CategoryName = '';
  loader: boolean = false;
  showUserPanel: boolean;
  teamName;
  showCloseButton: boolean = false;
  badgeCount: any = 0;
  isConnected: Observable<boolean>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showRatingPanle = '';
  showCancelButton = false;
  cancelStatus = false;
  tempSearchValue: string = '';
  editTicketclosedDateHistory: any;
  buttonBlock: boolean = false;
  editTicketAssignHistory: any;
  buttonBlock1: boolean = false;
  editTicketDateHistory: any;
  docDescription: any;
  ticketTitle: any;
  title: string = '';
  replayComments = '';
  attachmentName = '';
  description: string = '';
  length: number = 0;
  pageSize = 5;
  pageIndex;
  pageSizeOptions = [5];
  userFullname;
  replayCommentValue = '';
  categoryNames: any;
  commentDataId = {};
  subCategoryNames;
  selectedCategory = '';
  selectedSubCategory = '';
  UserLoginId;
  ticketsList: any = [];
  isReadOnly = true;
  replayComment = '';
  replayComment1 = '';
  hrDeptCount;
  itDeptCount;
  mAppsCount;
  showCommentPanel: boolean;
  editTicketDetails;
  noTicketsDiv = false;
  fileerror: boolean = false;
  uploadmsg: string;
  files: any;
  fileName: string = '';
  buttonblock: boolean = false;
  userfullname: string;
  downloadURL1: any;
  path: string = '';
  response = localStorage.getItem('auth');
  UserObject: any;
  subCategoryName: any;
  flag: boolean = false;
  replayCommentValueMainId = '';
  ticketsId: any;
  ticketsDownloadurl: any;
  ticketoldFileName: any;
  userComments: Array<string>[];
  commentUserId: any;
  editCategory = '';
  editSubCategory = '';
  comment = '';
  replayCommentes = '';
  name: any;
  downloadURL: any;
  alive = true;
  // MatPaginator Output
  pageEvent: PageEvent;
  nextPageLabel: string;
  previousPageLabel: string
  pageNationdisable: boolean = false;
  customRate: number = 0;
  disable: boolean = false;
  paraticId: any;
  disable1: boolean;
  cancelData = '';
  optionSelected = 'Select';
  message;
  singleSelected = false;
  showCancelButton1: boolean = false;
  // messaging: any;
  myselction: string = '';
  myselection1: string = '';
  notifyStatus1: boolean;
  click: boolean = true;
  block: boolean = false;
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null)
  buttonInfo: string = 'Select All';
  notificationId = [];
  imageLoader: boolean = true;
  location: string;
  shiftTimings: string;
  shifts:any = ["09:00 AM - 06:00PM","02:00PM - 11:00PM","06:00PM - 03:00AM","04:00PM - 01:00AM","24/7 Shift","24/5 Shift","Others"];


  ngOnDestroy() {
    this.alive = false;
    // this.adminTeamService.replay.next("0");
  }

  constructor(public router: Router, public ticketsAssignServ: TicketsAssignService, public userModulService: UsermoduleService, private storage: AngularFireStorage, private fcmNotifications: FcmNotificationsService, public notification: NotificationStorageService, public notificationRetrive: NotificationsService) {
    //auth checking
    if (localStorage.getItem('auth') != null) {
      var userInfo = localStorage.getItem('auth');
      // var UserObject = JSON.parse(userInfo);
      this.UserObject = JSON.parse(userInfo);
      //based on user role we are navigating to page
      if (this.UserObject.RoleName === 'Admin' || this.UserObject.RoleName === 'Agent' || this.UserObject.RoleName === 'Super-Admin') {

        this.router.navigateByUrl('admin/dashboard');

      } else {
        this.router.navigateByUrl('dashboard');
      }

    } else {
      this.router.navigateByUrl('login');
    }


    //closing of constructor
  }



  ngOnInit() {

    //retriving data from user component
    this.userModulService.reqData.takeWhile(() => this.alive).subscribe(res => {
      if (res != '0') {
        this.showUserPanel = !this.showUserPanel;
      }
    })

    //this.message = this.msgService.currentMessage

    var userInfo = localStorage.getItem('auth');
    //var UserObject = JSON.parse(userInfo);
    this.paraticId = this.UserObject.PracticeId;
    this.UserLoginId = this.UserObject.LoginId;

    var fullName = this.UserObject.FName + " " + this.UserObject.MName + " " + this.UserObject.LName;
    this.userfullname = fullName;

    if (fullName.length > 20) {
      this.userFullname = fullName.substring(0, 20) + "..."
    } else {
      this.userFullname = fullName;
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

    var pageNumber = 1;
    this.ticketsLoader(pageNumber);
    this.getTicketCount();


    //asking permission to user for notifications from fcm
    this.fcmNotifications.getPermission(this.UserObject);

    // //reciving notifications from sender fcm
    this.fcmNotifications.receiveMessage()

    //notifications retriving api
    this.getNotifications();

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



  //reciving notifications
  receiveMessage() {

    this.messaging.onMessage((payload) => {

      if (this.UserObject.RoleName === 'Admin' || this.UserObject.RoleName === 'Agent' || this.UserObject.RoleName === 'Super-Admin') {


      } else {

        //notifications retriving api
        this.getNotifications();
      }

      this.currentMessage.next(payload)

    });
  }



  //this function is for giving edit option for panel
  reEditTicket() {

    this.isReadOnly = true;
  }

  //Retrivingall tickets Count list
  getTicketCount() {
    //Retrivingall tickets Count list
    this.userModulService.retriveAllTicketsCount(this.UserLoginId).subscribe(res => {

      this.hrDeptCount = res.HR;
      this.itDeptCount = res.IT;
      this.mAppsCount = res.APPS;
    }, error => {
      console.log(error);

    })

  }

  //pagination documents retriving

  //pagination documents retriving
  getDocumentDetails(event) {
    this.noTicketsDiv = false;
    this.loader = true;
    //this condition is for if user search a ticket then will go else cond other wise if
    if (this.tempSearchValue === "") {

      var userDetails = {
        "createdBy": this.UserLoginId,
        "pageNumber": event.page + 1
      }

      this.ticketsList = [];

      //Retriving Category list
      this.userModulService.retriveAllUserTickets(userDetails).subscribe(res => {

        this.ticketsList = res.List;
        this.length = res.Total;
        this.disable = false;
        if (this.length <= 0) {

          this.loader = false;
          this.noTicketsDiv = false;
          this.ticketsList = [];
        }
        else {
          this.loader = false;

        }
        this.noTicketsDiv = false;

      }, error => {
        this.ticketsList = [];

        this.loader = true;
        // this.noTicketsDiv = true;
        console.log(error);

      })


    } else {
      // alert("not null");
      this.noTicketsDiv = false;

      var userSearchDetails = {
        "createdBy": this.UserLoginId,
        "searchKey": this.tempSearchValue,
        "pageNumber": event.page + 1
      }
      this.ticketsList = [];

      this.userModulService.searchTickets(userSearchDetails).subscribe(res => {

        this.disable = false;
        this.ticketsList = res.List;
        this.length = res.Total;
        if (res.Total <= 0) {

          this.noTicketsDiv = true;
          this.loader = false;
          this.ticketsList = [];
          this.length = 0;
        } else {

          this.loader = false;
          this.noTicketsDiv = false;

        }

      }, error => {
        this.ticketsList = [];
        this.length = 0;
        this.loader = true;
        console.log(error);

      })
    }
  }



  //Sub Category
  selectCategory(subCategoryValue) {

    var subCategry = { "teamName": subCategoryValue.teamName };
    this.CategoryName = subCategry.teamName;
    this.editCategory = subCategry.teamName;
    let data = { "teamName": subCategoryValue.teamName }

    //Retriving sub Category list
    this.userModulService.retriveSubCategories(data).subscribe(res => {
      this.subCategoryNames = res;

    }, error => {
      console.log(error);

    })
  }

  // selecting seviarity
  selectSeviarity(response) {
    this.optionSelected = response;

  }
  //for retriving tickets
  ticketsLoader(pageNumber) {
    this.disable = false;
    this.noTicketsDiv = false;
    this.loader = true;
    this.ticketsList = [];
    var userDetails = {
      "createdBy": this.UserLoginId,
      "pageNumber": pageNumber
    }

    //Retriving Category list
    this.userModulService.retriveAllUserTickets(userDetails).subscribe(res => {

      if (res.Total <= 0) {
        this.loader = false;
        this.disable = true;
        this.disable1 = this.disable;
        this.noTicketsDiv = false;
      }
      else {
        this.ticketsList = res.List;
        this.length = res.Total;

        this.noTicketsDiv = false;
        this.disable = false;
        this.loader = false;

      }


    }, error => {


      this.ticketsList = [];
      this.length = 0;
      this.loader = true;
      this.noTicketsDiv = false;
      this.disable = false;

      console.log(error);

    })

  }

  //this function is for giving edit option for panel
  editTicket() {
    this.fileerror = false;
    this.fileerror1 = false;
    this.fileName = '';
    this.cancelStatus = false;



    this.upload = 'Upload';


    this.isReadOnly = false;
  }


  //retriving date by month
  formatDate(getDate) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    if (getDate === null) {

      return '--';

    } else {

      var date = new Date(getDate);
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();
      return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

  }

  //return badges css status
  ngClassForIcons(value) {
    let data = '';
    if (value == 'Opened') {
      data = 'badge badge-info';
    } else if (value == 'Assigned') {
      data = 'badge badge-warning';
    } else if (value == 'In progress') {
      data = 'badge badge-progress';
    } else if (value == 'Escalated') {
      data = 'badge badge-danger';
    } else if (value == 'Completed') {
      data = 'badge badge-success';
    } else if (value == 'Solved') {
      data = 'badge badge-success';
    } else if (value == 'Overdue') {
      data = 'badge badge-danger';
    } else if (value == 'Cancelled') {
      data = 'badge badge-danger';
    }
    return data;
  }


  editTicketDeatils(userTicket) {
    this.notifyStatus1 = false;
    this.editTicketDetails = userTicket;
    this.currentStatus = userTicket.currentStatus;
    this.assignedTo = userTicket.assignedTo;
    this.paraticId = userTicket.createdByDepartment;
    this.editTicketDateHistory = userTicket.createdDate;
    this.customRate = userTicket.rating;
    this.commentUserId = userTicket.createdBy;
    this.userComments = userTicket.commentsList;
    this.editCategory = userTicket.category;
    this.editSubCategory = userTicket.subCategory;
    this.attachmentName = userTicket.attachmentName;
    this.fileName = this.attachmentName; // new
    this.ticketsId = userTicket.id;
    this.ticketTitle = userTicket.ticketTitle;
    this.docDescription = userTicket.description;
    this.showRatingPanle = userTicket.currentStatus;
    this.ticketsDownloadurl = userTicket.attachmentLocation;
    this.ticketoldFileName = this.editTicketDetails.attachmentName;
    this.formatDate(this.editTicketDateHistory);
    this.editTicketAssignHistory = userTicket.assignedToName;
    this.editTicketclosedDateHistory = userTicket.closedDate;
    this.location = userTicket.location;
    this.shiftTimings = userTicket.shiftTimings;
    this.formatDate(this.editTicketclosedDateHistory);
    // let editTicketReOpenDateHistory = userTicket.
    //  editTicketTitle = userTicket.ticketTitle ;
    this.cancelStatus = false;
    if (this.currentStatus === 'In progress' || this.currentStatus === 'Assigned' || this.currentStatus === 'Opened' || this.currentStatus === 'Reopen') {
      this.enableCancel = true;
    }
    else {
      this.enableCancel = false;
    }

    if (userTicket.commentsList.length > 0) {
      this.showCommentPanel = true;
      return this.showCommentPanel;

    } else {
      this.showCommentPanel = false;
      return this.showCommentPanel;
    }

  }

  // add new  ticket 
  Submit(c: NgForm) { //new
    // alert("inside");
    // console.log(this.title.length ,this.description , this.CategoryName, this.selectedSubCategory);
    if (this.title.length >= 20 && this.description.length >= 50 && this.CategoryName != '' && this.selectedSubCategory != '') {
      
      this.block = true;
      setTimeout(() => {
        this.block = false;
        // $("#exampleModal-4").modal("hide");
        
      }, 4000);

      this.ticketsList = [];
      this.noTicketsDiv = false;
      this.length = 0;
      this.loader = true;
      this.disable = false;
      if (this.fileName.length > 0 && this.fileName != '') {
        let date = new Date();

        // this.path = '/test' + this.filename1[x];
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];
        // tslint:disable-next-line:prefer-const
        let dateObj = new Date();
        // tslint:disable-next-line:prefer-const
        let fileMonth = monthNames[dateObj.getMonth()];
        // var month = dateObj.getUTCMonth() + 1; //months from 1-12
        let fileYear = dateObj.getUTCFullYear();
        this.path = `help_desk/${fileYear}/${fileMonth}/${new Date().getTime()}_${this.fileName}`;
        // this.path = `test/${date}_${this.fileName}`;
        const fileRef = this.storage.ref(this.path);

        const task = fileRef.put(this.files[0], { customMetadata: { blah: 'blah' } }).then((snapshot) => {

          this.downloadURL = snapshot.downloadURL;
          let data = {
            category: this.CategoryName,
            subCategory: this.selectedSubCategory,
            ticketTitle: this.title,
            description: this.description,
            createdBy: this.UserLoginId,
            attachmentName: this.fileName,
            createdByName: this.userfullname,
            attachmentLocation: this.downloadURL,
            createdByDepartment: this.paraticId,
            userSeverity: this.optionSelected,
            location: this.UserObject.Location,
            shiftTimings: this.UserObject.ShiftTimings  
          }

          this.userModulService.insertDocument(data).subscribe((result) => {
            $("#exampleModal-4").modal("hide");
            $("#exampleModal-6").modal("show");
            setTimeout(() => { $("#exampleModal-6").modal("hide"); }, 2000);
            this.updatingDataInPanel();
            this.getTicketCount();
            this.closeTicket(c);
            this.fileName = '';
            this.files = [];
            this.title = '';

            //for notifications sending
            let input = {
              "purpose": "created",
              "id": result.id
            }

            this.sendNotification(input, result);

          }, error => {
            this.block = false;
            // setTimeout(() => {
              this.block = false;
            // }, 40000);
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
          createdBy: this.UserLoginId,
          attachmentName: '',
          createdByName: this.userfullname,
          attachmentLocation: '',
          createdByDepartment: this.paraticId,
          userSeverity: this.optionSelected,
          location: this.UserObject.Location,
          shiftTimings: this.UserObject.ShiftTimings 
        }
        this.userModulService.insertDocument(data).subscribe((result) => {
          $("#exampleModal-4").modal("hide");
          $("#exampleModal-6").modal("show");
          setTimeout(() => { $("#exampleModal-6").modal("hide"); }, 2000)
          this.updatingDataInPanel();
          this.getTicketCount();
          this.closeTicket(c);
          this.fileName = '';
          this.files = [];
          this.title = '';
          // this.block = false;
          // setTimeout(() => {
          //   this.block = false;
          // }, 40000);
          //for notifications sending
          let input = {
            "purpose": "created",
            "id": result.id
          }

          this.sendNotification(input, result);

        }, error => {
          this.block = false;
          // setTimeout(() => {
          //   this.block = false;
          // }, 40000);
          console.log(error)
        });
      }
    }
    else {
      this.block = true;
    }


  }

  updatingDataInPanel() {
    this.loader = true;
    var userDetails = {
      "createdBy": this.UserLoginId,
      "pageNumber": 1
    }
    //Retriving Category list
    this.userModulService.retriveAllUserTickets(userDetails).subscribe(res => {
      this.ticketsList = res.List;
      this.length = res.Total;
      //  this.loader = false;  
      if (this.length <= 0) {
        this.loader = false;
        // this.disable = true;
      } else {
        this.loader = false;
        this.disable = false;
      }
    }, error => {
      this.ticketsList = [];
      this.length = 0;
      this.loader = true;
      this.noTicketsDiv = false;
      this.disable = false;

      console.log(error);
    })
  }

  //clears file selection
  clearFiles() {
    this.upload = 'Upload'
    this.fileName = '';
    this.files = [];
    this.downloadURL = '';
    this.ticketsDownloadurl = '';
    this.attachmentName = '';
    this.ticketsDownloadurl = '';
    // this.block = false;
    setTimeout(() => {
      this.block = false;
    }, 40000);
  }
  // update ticket 
  updateTicket() {
    this.isReadOnly = true;
    this.ticketsList = [];
    this.noTicketsDiv = false;
    this.length = 0;
    this.loader = true;
    this.disable = false;
    if (this.fileName.length > 0) {

      var date = new Date();

        // this.path = '/test' + this.filename1[x];
        const monthNames = ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"];
        // tslint:disable-next-line:prefer-const
        let dateObj = new Date();
        // tslint:disable-next-line:prefer-const
        let fileMonth = monthNames[dateObj.getMonth()];
        // var month = dateObj.getUTCMonth() + 1; //months from 1-12
        let fileYear = dateObj.getUTCFullYear();
        this.path = `help_desk/${fileYear}/${fileMonth}/${new Date().getTime()}_${this.fileName}`;

      //this.path = `test/${date}_${this.fileName}`;
      const fileRef = this.storage.ref(this.path);

      const task = fileRef.put(this.files[0], { customMetadata: { testing: 'testing' } }).then((snapshot) => {
        this.downloadURL = snapshot.downloadURL;
        let data = {
          category: this.editCategory,
          subCategory: this.editSubCategory,
          ticketTitle: this.ticketTitle,
          description: this.docDescription,
          id: this.ticketsId,
          attachmentName: this.fileName,
          attachmentLocation: this.downloadURL,
          createdByDepartment: this.paraticId
        };
        this.userModulService.updateDocument(data).subscribe((result) => {
          this.updatingDataInPanel();
          this.getTicketCount();
        }, error => {
          console.log(error)
        });
      });

    }
    else {

      let data = {
        category: this.editCategory,
        subCategory: this.editSubCategory,
        ticketTitle: this.ticketTitle,
        description: this.docDescription,
        id: this.ticketsId,
        attachmentName: this.attachmentName,
        attachmentLocation: this.ticketsDownloadurl,
        createdByDepartment: this.paraticId

      }
      this.userModulService.updateDocument(data).subscribe((result) => {

        this.updatingDataInPanel();
        this.getTicketCount();
      }, error => {
        console.log(error)
      });
    }
  }


  getExten(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }

  //for uploading a file
  uploadfile1(event) {
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


  setdate(createdDate) {
    var IST = new Date(createdDate); // Clone UTC Timestamp
    IST.setHours(IST.getHours() + 5); // set Hours to 5 hours later
    IST.setMinutes(IST.getMinutes() + 30); // set Minutes to be 30 minutes later
    return IST;

  }

  //Serach Funcationality
  filterItem(myInput) {
    if (myInput.length > 0) {

      this.ticketsList = [];
      this.noTicketsDiv = false;
      this.disable = false;
      this.loader = true;

      this.tempSearchValue = myInput;
      if (this.tempSearchValue === "" && this.disable1 === true) {

        this.loader = false;
        this.noTicketsDiv = false;
        this.disable = true;

        return 1;

      }
      else {
        var userSearchDetails = {
          "createdBy": this.UserLoginId,
          "searchKey": this.tempSearchValue,
          "pageNumber": "1"
        }

        this.userModulService.searchTickets(userSearchDetails).subscribe(res => {
          this.disable = false;
          this.ticketsList = res.List;
          this.length = res.Total;
          if (res.Total <= 0) {
            this.ticketsList = [];
            this.noTicketsDiv = true;
            this.loader = false;
          } else {
            this.noTicketsDiv = false;
            this.loader = false;
          }
        }, error => {
          this.loader = true;
          this.noTicketsDiv = false;

          console.log(error);

        })
      }
    }

  }

  //comment function
  userComment(comment) {
    // alert("called3")
    var commentDetails = {
      "ticketId": this.editTicketDetails.id,
      "commentDescription": comment,
      "commentedBy": this.UserLoginId
    }

    if (comment != '') {

      this.userModulService.addingComment(commentDetails).subscribe(res => {
        $('#reachagent').animate({ scrollTop: $('#reachagent1').height() }, 1000);
        this.comment = '';
        this.docDetails(res);


      }, error => {
        console.log(error);

      })

    }

  }



  docDetails(res) {
    this.userModulService.retriveSingleTicket(res.ticketId).subscribe(res => {
      this.showCommentPanel = true;
      this.commentUserId = res[0].createdBy;
      this.userComments = res[0].commentsList;

    }, error => {
      console.log(error);

    })
  }

  showReplayPanel(i, userComment) {
    this.replayComment = i;
    this.replayCommentValueMainId = userComment.ticketId;

  }

  showReplayPanel2(i, userReplayComments, userComment) {
    this.replayComment1 = i;
    this.replayCommentValue = userReplayComments.commentId;
    this.replayCommentValueMainId = userComment.id;

  }

  showCommentBox(comments) {

    if (comments.length <= 0) {
      return false;
    } else {

      return true;
    }
  }

  userReplayComment(inputstring, commentData) {
    //  alert("called2")
    let string = inputstring;

    // alert(inputstring)
    if (string.length > 0) {

      var commentDetailes = {
        "commentId": commentData.id,
        "commentDescription": inputstring,
        "commentedBy": this.UserLoginId
      }

      this.userModulService.addingReplayComment(commentDetailes).subscribe(res => {
        this.replayComments = '';
        this.replayComment = '';
        this.replayCommentes = '';
        $('#reachagent').animate({

          scrollTop: $('#reachagent').scrollHeight

        });
        this.commentDataId = {
          'ticketId': this.replayCommentValueMainId
        }
        this.docDetails(this.commentDataId)

      }, error => {
        console.log(error);
      })
    }
  }

  userReplayComment2(inputstring, userReplayComment, userComment) {
    //alert("called1")
    let string = inputstring;
    // alert(inputstring)
    if (string.length > 0) {
      var commentDetailes = {
        "commentId": this.replayCommentValue,
        "commentDescription": inputstring,
        "commentedBy": this.UserLoginId
      }

      this.userModulService.addingReplayComment(commentDetailes).subscribe(res => {
        this.replayComments = '';
        this.replayComment = '';
        this.replayComment1 = '';
        this.replayCommentes = '';

        this.commentDataId = {
          'ticketId': userComment.ticketId
        }
        $('#reachagent').animate({

          scrollTop: $('#reachagent').scrollHeight

        });
        this.docDetails(this.commentDataId)

      }, error => {
        console.log(error);

      })
    }
  }

  //logout
  logOut() {

    localStorage.removeItem('auth');
    this.router.navigateByUrl('login');

    let unSubNot = {
      "loginId": this.UserLoginId
    }

    //unsub token from db
    this.notification.UnsubToken(unSubNot).subscribe(res => {

    }, error => {
      console.log(error);

    })

  }


  //user rating 
  addUserRating() {
    this.enableRating = false
    this.enableComplete = true;

    var userServiceRating = {
      "rating": this.customRate,
      "ratingBy": this.UserLoginId,
      "id": this.editTicketDetails.id
    }

    this.userModulService.updateRating(userServiceRating).subscribe(res => {

      this.commentDataId = {
        'ticketId': res.id
      }

      //this.enableCancel = false;
      // $("#exampleModal-85").modal("hide");

      var request = {
        currentStatus: this.statusInfo,
        modifiedBy: this.UserLoginId,
        id: this.ticketsId,
        comments: this.cancelData
      };

      this.ticketsAssignServ.ticketsStatusUpdate(request).subscribe(
        (res) => {

          // let input = {
          // 	purpose: 'created',
          // 	id: res.id
          // };

          //	this.sendNotificationUpdate(input, res);

          //cancel close notificatins functionality
          this.sendCancelNotifi(res);
          this.ticketsLoader(1);

        },
        (error) => {
          console.log(error);

        }
      );



      this.customRate = res.rating;
      this.enableRating = false
      this.starRating = false;
      this.notifyStatus1 = false;
      setTimeout(() => {

        this.notifyStatus1 = true;
      }, 3000);

      this.cancelStatus = true;
      this.updatingDataInPanel();
      setTimeout(() => {this.cancelStatus = false}, 3000)


      this.docDetails(this.commentDataId)

    }, error => {
      console.log(error);

    })
  }


  //Status update
  statusUpdate(response) {

    
    this.statusInfo = response;
    this.click = false;
    if (response === 'Completed') {
      this.block = true;
      setTimeout(() => {
        this.block = false;
        // $("#exampleModal-4").modal("hide");
        
      }, 6000);
      this.modeHide = false;
      this.enableReopen = false;
      this.enableComplete = false;
      this.enableRating = true;
      this.showCancelButton1 = false;

    }
    else if (response === 'Cancelled') {
      this.showCancelButton1 = true;
      this.modeHide = false;
      this.enableReopen = false;
      this.enableRating = false;
    }
    else if (response === 'Reopen') {

      this.modeHide = false;
      this.enableRating = false;
      this.enableReopen = true;
      this.enableComplete = false;

    }


  }

  sendCancelInfo() {
    this.enableCancel = false;
    this.block = true;
    setTimeout(() => {
      this.block = false;
      // $("#exampleModal-4").modal("hide");
      
    }, 6000);
    $("#exampleModal-85").modal("hide");
    if (this.cancelData.length > 0 && this.cancelData != '') {
      var request = {
        currentStatus: this.statusInfo,
        modifiedBy: this.UserLoginId,
        id: this.ticketsId,
        comments: this.cancelData
      };

      this.showCancelButton = false;
      this.showCloseButton = false;
      this.showCancelButton1 = false;
      this.showRatingPanle = 'Cancelled';
      this.enableComplete = false;
      this.enableReopen = false;



      this.ticketsAssignServ.ticketsStatusUpdate(request).subscribe(
        (res) => {

          this.click = true;
          this.currentStatus = this.statusInfo;
          this.showCancelButton = false;
          this.showCloseButton = false;
          this.updatingDataInPanel();
          this.cancelStatus = true;
          this.notifyStatus = false;
          this.starRating = true;
          this.enableComplete = false;
          this.enableReopen = false;
          this.modeHide = true;
          this.enableRating = false;
          this.enableCancel = false;
          setTimeout(() => {
            this.notifyStatus = true;
          }, 3000);

          this.cancelData = '';
          var pageNumber = 1;
          this.ticketsLoader(pageNumber);


          //	this.sendNotificationUpdate(input, res);
          setTimeout(() => {
            this.cancelStatus = false;
          }, 3000);

          //cancel close notificatins functionality
          this.sendCancelNotifi(res);

        },
        (error) => {
          console.log(error);

        }
      );
    }

  }


  sendCancelNotifi(res) {

    if (res.currentStatus === "Reopen") {


      //for notifications sending
      let input = {
        "purpose": "Reopen",
        "id": res.id
      }

      this.sendReOpenNotification(input, res);

    } else if (res.currentStatus === "Cancelled" || res.currentStatus === 'Completed') {

      //for notifications sending
      let input = {
        "purpose": "Closed",
        "id": res.id
      }

      this.sendCancelNotification(input, res);

    }

  }


  sendReOpenNotification(data, docData) {

    this.notification.getTokens(data).subscribe(res => {

      var listOfTokens = res.TokenList.AdminTokenList;
      var notificationBody = '@ ' + this.commentUserId + ' has reopened his ticket';

      if (listOfTokens.length > 0) {
        for (var i = 0; i < listOfTokens.length; i++) {
          this.listOftoken.push(listOfTokens[i].fcmToken);

        }

        //sending notification to user 
        this.sendNotifications(this.listOftoken, notificationBody);

        var agentListOfTokens = res.TokenList.AgentTokenList;

        //agent list of tokens
        if (agentListOfTokens.length > 0) {
          for (var i = 0; i < agentListOfTokens.length; i++) {
            this.listOfAgenttoken.push(agentListOfTokens[i].fcmToken);

          }
          //sending notification to user 
          this.sendNotifications(this.listOfAgenttoken, notificationBody);
        }

        this.listOftoken = [];
        this.listOfAgenttoken = [];
      }


    }, error => {
      console.log(error);

    })

  }


  sendCancelNotification(data, docData) {

    this.notification.getTokens(data).subscribe(res => {

      var listOfTokens = res.TokenList.AdminTokenList;

      var notificationBody = '@ ' + this.commentUserId + ' updated his ticket status to ' + docData.currentStatus;

      if (listOfTokens.length > 0) {
        for (var i = 0; i < listOfTokens.length; i++) {
          this.listOftoken.push(listOfTokens[i].fcmToken);

        }

        //sending notification to user 
        this.sendNotifications(this.listOftoken, notificationBody);

        var agentListOfTokens = res.TokenList.AgentTokenList;


        //agent list of tokens
        if (agentListOfTokens.length > 0) {
          for (var i = 0; i < agentListOfTokens.length; i++) {
            this.listOfAgenttoken.push(agentListOfTokens[i].fcmToken);

          }
          //sending notification to user 
          this.sendNotifications(this.listOfAgenttoken, notificationBody);
        }

        this.listOftoken = [];
        this.listOfAgenttoken = [];
      }


    }, error => {
      console.log(error);

    })


  }


  //for updating edit option assigned to  
  updateName(reponse) {

    if (reponse === '') {
      return 'Yet to be assigned';
    } else {
      return reponse;
    }

  }

  closeModel() {
    $("#exampleModal-4").modal("hide");
  }
  // addUserRating($event){}
  closeTicket(c: NgForm) {
    //this.selectedSubCategory = this.categoryNames[0].teamName;
    //this.selectedCategory = this.subCategoryNames[0].subCategoryName;
    $("#exampleModal-4").modal("hide");
    c.form.reset();
    this.selectedSubCategory = ''
    this.selectedCategory = '';
    this.fileName = '';
    // this.block = false;
    setTimeout(() => {
      this.block = false;
    }, 40000);
    this.fileerror = false;
    this.fileerror1 = false;
    this.files = [];
    this.title = '';
    this.upload = 'Upload';
    // this.description = '';
    // this.selectedSubCategory = 'Select Catagory';
  }



  close() {
    $("#exampleModal-8").modal("hide");
    this.showCancelButton = false;
    this.showCloseButton = false;
    this.showCancelButton1 = false;
    this.starRating = false;
    this.fileName = '';
    this.files = [];
    this.title = '';

  }


  //sending notifications 
  sendNotification(data, docData) {

    this.notification.getTokens(data).subscribe(res => {

      var listOfTokens = res.TokenList.AdminTokenList;
      // @spatnala has raised a ticket(<Ticket ID>) in category(<Category>
      var notificationBody = '@ ' + docData.createdBy + ' has raised a ticket ' + docData.trackingId + ' in category ' + docData.subCategory;

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



  getNotifications() {
    let input = {
      "toLoginId": this.UserLoginId
    }

    //retrive notifications
    this.notificationRetrive.retriveNotifications(input).subscribe(res => {

      this.badgeCount = res[0].unReadCount;
      this.allNotifications = res[0].fcmNotifications;
      this.allNotificationsLength = res[0].fcmNotifications.length;


    }, error => {
      console.log(error);

    })

  }


  //showing all notifications in notifications panel
  showNotification(data) {
    this.showUserPanel = !this.showUserPanel;
    // this.notificationRetrive.replay.next(this.allNotifications);

  }

  //sending notifications
  sendNotificationOnComment(data, docData) {
    this.notification.getTokens(data).subscribe(
      (res) => {

        var listOfTokens = res.TokenList.AgentTokenList;
        var notificationBody = '@ ' + docData.createdBy + 'has commented on his ' + docData.subCategory + ' issue ticket';

        if (listOfTokens.length > 0) {
          for (var i = 0; i < listOfTokens.length; i++) {
            this.listOftoken.push(listOfTokens[i].fcmToken);

          }
        }

        //sending notification to user
        this.sendNotifications(this.listOftoken, notificationBody);

        var listOfAdminTokens = res.TokenList.AdminTokenList;
        if (listOfAdminTokens.length > 0) {
          for (var i = 0; i < listOfTokens.length; i++) {
            this.listOfAdmintoken.push(listOfTokens[i].fcmToken);

          }
        }

        //sending notification to user
        this.sendNotifications(this.listOfAdmintoken, notificationBody);

      },
      (error) => {
        console.log(error);

      }
    );
  }

  //decreasing notification count when user seen his all notifications
  refresNotificatCount() {
    let data = {
      "toLoginId": this.UserLoginId
    }
    this.notification.NotificountDecrese(data).subscribe(res => {

      this.getNotifications();
    })
  }
 

  showEditnotfPanel(notification) {
    this.showUserPanel = false;

    this.unreadNotificatio(notification);
    this.userModulService.retriveSingleTicket(notification.ticketId).subscribe(res => {

      //this.editTicketDeatils(res[0]);
      this.router.navigate(['ticket', notification.trackingId]);
      // this.router.navigateByUrl('userTicketDetails');
      let ticketData = res[0];
      this.userModulService.sendData.next(ticketData);

    }, error => {
      console.log(error);

    })

  }

  sendStatus(userTicket) {
    this.router.navigate(['ticket', userTicket.trackingId]);
    this.userModulService.sendData.next(userTicket);
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

  //selecting all notifications
  selectAll() {

    if (this.selected === false) {
      this.buttonInfo = 'Deselect All';
      this.selected = !this.selected;
      this.singleSelected = false;
      this.readAllFunc();
    }
    else {
      this.selected = !this.selected;
      this.singleSelected = false;
      this.buttonInfo = 'Select All';
      this.getNotifications();
      this.notificationId = [];
    }

  }

  //read all function
  readAllFunc() {
    this.allNotifications.forEach(element => {
      if (this.notificationId.includes(element.id)) {

      } else if (element.isRead === 1) {
        element.isRead = element.isRead;
      } else {
        element.isRead = !element.isRead;
      }

      //this.notificationId.push(element.id)
    });
  }


  addUnread(unReadNotifi) {

    this.selected = false;
    this.singleSelected = true;

    if (this.notificationId.includes(unReadNotifi.id)) {

      for (var i = 0; i < this.notificationId.length; i++) {

        if (this.notificationId[i] === unReadNotifi.id) {

          this.notificationId.splice(i, 1);
        }
      }

      if (this.notificationId.length === 1) {
        this.notificaText = "Read";
      }

      if (this.notificationId.length < 1) {
        // alert("inside");
        this.selected = false;
        this.singleSelected = false;
      }

    } else {
      this.notificationId.push(unReadNotifi.id);
      if (this.notificationId.length > 1) {
        this.notificaText = "Read All";
      } else {
        this.notificaText = "Read";
      }
    }

  }


  readSelNotifications() {
    let RequestBody = {
      "notificationIds": this.notificationId,
      "modifiedBy": this.UserLoginId
    }

    if (this.notificationId.length > 0) {
      this.notification.singleNotifUnread(RequestBody).subscribe(res => {

        this.getNotifications();
        this.notificationRetrive.notification.next(this.allNotifications);
        this.notificationId = [];
      })
    }
  }


  //unread all
  readAll() {

    let notificationId = []
    this.selected = false;
    this.allNotifications.forEach(element => {
      notificationId.push(element.id)
    });
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

