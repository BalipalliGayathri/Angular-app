import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UsermoduleService } from '../../services/usermodule.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { MatPaginator } from '@angular/material/paginator';

import { Observable } from 'rxjs/Observable';
import { TicketsAssignService } from '../../services/tickets-assign.service';
import { NgForm } from '@angular/forms';
import { FcmNotificationsService } from '../../services/fcm-notifications.service';
import { NotificationsService } from '../../services/notifications.service';
import { NotificationStorageService } from '../../services/notification-storage.service';
import { RatingModule } from "ngx-rating";
import {Directive,HostListener} from '@angular/core';
declare var $: any;

export interface State {
  LoginId: string;
  Name: string;
}


@Component({
  selector: 'app-your-tickets',
  templateUrl: './your-tickets.component.html',
  styleUrls: ['./your-tickets.component.scss']
})
export class YourTicketsComponent implements OnInit {
  modeHide: boolean = true;
  enableReopen: boolean = false;
  enableComplete: boolean = false;
  enableRating: boolean = false;
  enableCancel: boolean = false;
  upload: string = 'Upload';
  fileerror1: boolean;
  optionSelected: any;
  assignedTo: any;
  CategoryName: any;
  noTicketsDiv: boolean = false;
  loader: boolean = false;
  disable: boolean = false;
  showCancelButton = false;
  statusInfo: any;
  listOftoken: any = [];
  isConnected: Observable<boolean>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  showRatingPanle = '';
  tempSearchValue: string = '';
  editTicketclosedDateHistory: any;
  buttonBlock: boolean = false;
  editTicketAssignHistory: any;
  buttonBlock1: boolean = false;
  editTicketDateHistory: any;
  docDescription: any;
  ticketTitle: any;
  title: string = '';
  name = '';
  cancelData = '';
  replayComments = '';
  attachmentName = '';
  description: string = '';
  length: number = 0;
  pageSize = 5;
  pageIndex;
  pageSizeOptions = [5];
  userFullname;
  replayCommentValue = '';
  categoryNames;
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
  docDescription1: string = '';
  currentStatus: any;
  fileerror: boolean;
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
  cancelStatus = false;
  downloadURL: any;
  allNotificationsLength: any;
  // MatPaginator Output
  pageEvent: PageEvent;
  allNotifications: any;
  nextPageLabel: string;
  previousPageLabel: string;
  badgeCount: any = 0;
  pageNationdisable: boolean = false;
  customRate: number = 0;
  paraticId: any;
  disable1: boolean;
  showCloseButton: boolean = false;
  showCancelButton1: boolean = false;
  notifyStatus: boolean;
  starRating: boolean = false;
  notifyStatus1: boolean;
  click: boolean = true;
  alive = true;
  block: boolean = false;
  states: State[] = [];
  tempStates: State[] = [];
  
  showUserlist :boolean = false;
  @HostListener('click', ['$event.target'])
  onClick(btn) {
    this.showUserlist = false;
 }


  constructor(public router: Router, public notification: NotificationStorageService, public notificationRetrive: NotificationsService, private fcmNotifications: FcmNotificationsService, public ticketsAssignServ: TicketsAssignService, public userModulService: UsermoduleService, private storage: AngularFireStorage) { }



  ngOnInit() {



    //asking permission to user for notifications from fcm
    this.fcmNotifications.getPermission(this.UserObject);

    // //reciving notifications from sender fcm
    this.fcmNotifications.receiveMessage()

    //notifications retriving api
    this.getNotifications();


    var userInfo = localStorage.getItem('auth');
    var UserObject = JSON.parse(userInfo);
    this.UserObject = UserObject;
    // console.log(UserObject)
    this.paraticId = UserObject.PracticeId;
    this.UserLoginId = UserObject.LoginId;
    var fullName = UserObject.FName + " " + UserObject.MName + " " + UserObject.LName;
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
      this.selectCategory(subCategry)
    }, error => {
      console.log(error);
    })

    var pageNumber = 1;
    this.ticketsLoader(pageNumber);
    this.getTicketCount();

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
    // console.log("value:",subCategoryValue);
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
      data = 'badge badge-assigned';
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

  
  userList(){
    var usersListInputs = {

      "Authorization": "YWRtaW46YWRtaW4=",
      "roleName": this.UserObject.RoleName,
      "teamName": this.UserObject.TeamName,
    }
  
    //Retrivingall unAssigned  tickets list
    this.ticketsAssignServ.agentNamesList(usersListInputs).subscribe(res => {
      this.states = res.UserList;
      this.tempStates = this.states;
    }, error => {
      console.log(error);
    })
  
  }

//@comminting
 filtering(comment){
    
  if(this.showUserlist === true){
    // console.log(comment);
    let tempValue = comment;
    let splitval = tempValue.split(" ");
    splitval.forEach(val => {
      if(val.charAt(0) === '@'){
        let temp = val.split('@');
        // console.log(this.states); 
        this.tempStates = [];
        this.states.filter(state => { 
          if(state.LoginId.includes(temp[1]) || state.Name.toLowerCase().includes(temp[1].toLowerCase())){
            this.tempStates.push(state);
          }
        });
      }

    });
    
  }
  }


  storeValue(userObj,inputstring) {
    // alert("unchecked");

    
    let tempValue = this.comment;
    let splitval=tempValue.split(" ");
    let temp = '';
    splitval.forEach((val,i)=> {
      // if(i === 0 && val!='@'){
      //   temp = temp +''+ val;
      // }
       if(splitval.length-1 !== i){
        temp = temp +' '+ val;
      }
    });
    // console.log("temp comment",temp);
    var sample =  temp+' @'+ userObj.LoginId;
    this.comment = sample.trim();

    this.showUserlist = false;
    inputstring.setFocus();
   }

//@commenting
toShowUserList(value){

  // console.log("value",this.comment);
    let tempValue = this.comment;
    let splitval=tempValue.split(" ");
    splitval.forEach(val => {

    if(val.charAt(0) === '@' && val.length === 1){
    
      this.showUserlist = true;
 
    }    
    });
  }
  

  // add new  ticket 
  Submit(c: NgForm) { //new
    this.block = true;
    setTimeout(() => {
      this.block = false;
    }, 6000);
    
  // console.log(this.UserObject)
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
        // this.path = `test/${date}_${this.fileName}`;

     // this.path = `test/${date}_${this.fileName}`;
      this.path = `help_desk/${fileYear}/${fileMonth}/${new Date().getTime()}_${this.fileName}`;
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

          this.updatingDataInPanel();
          this.getTicketCount();
          this.closemodel(c);

          $("#exampleModal-67").modal("hide");
          $("#exampleModal-6").modal("show");
          setTimeout(() => { $("#exampleModal-6").modal("hide"); }, 2000)
          this.block = false;
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
        $("#exampleModal-105").modal("hide");
        $("#exampleModal-6").modal("show");
        setTimeout(() => { $("#exampleModal-6").modal("hide"); }, 2000)
        this.updatingDataInPanel();
        this.getTicketCount();
        this.closemodel(c);
        this.block = false;
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
    this.fileName = '';
    this.files = [];
    this.downloadURL = '';
    this.ticketsDownloadurl = '';
    this.attachmentName = '';
    this.ticketsDownloadurl = '';
    this.upload = "Upload";
    this.block = false;
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
      
        // tslint:disable-next-line:prefer-const
        let fileMonth = monthNames[date.getMonth()];
        // var month = dateObj.getUTCMonth() + 1; //months from 1-12
        let fileYear = date.getUTCFullYear();
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
          createdByDepartment: this.paraticId,
          location: this.UserObject.Location,
          shiftTimings: this.UserObject.ShiftTimings
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
        createdByDepartment: this.paraticId,
        location: this.UserObject.Location,
          shiftTimings: this.UserObject.ShiftTimings

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
  uploadFile(event) {
    this.files = event.target.files || event.srcElement.files;
    this.fileName = this.files[0].name;
    var exten = this.getExten(this.fileName)

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
          "searchKey": myInput,
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
    var commentDetails = {
      "ticketId": this.editTicketDetails.id,
      "commentDescription": comment,
      "commentedBy": this.UserLoginId
    }

    if (comment != '') {

      this.userModulService.addingComment(commentDetails).subscribe(res => {
        this.comment = '';
        this.docDetails(res)
        $('#reachagent').animate({

          scrollTop: $('#reachagent').scrollHeight

        });
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
    let string = inputstring;
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
    let string = inputstring;
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
        this.docDetails(this.commentDataId)

      }, error => {
        console.log(error);
      })
    }
  }



  //user rating 
  addUserRating() {
    this.enableRating = false
    this.enableComplete = true;
    //alert("hello");
    var userServiceRating = {
      "rating": this.customRate,
      "ratingBy": this.UserLoginId,
      "id": this.editTicketDetails.id
    }
    this.userModulService.updateRating(userServiceRating).subscribe(res => {
      this.commentDataId = {
        'ticketId': res.id
      }
      var request = {
        currentStatus: this.statusInfo,
        modifiedBy: this.UserLoginId,
        id: this.ticketsId,
        comments: this.cancelData
      };

      this.ticketsAssignServ.ticketsStatusUpdate(request).subscribe(
        (res) => {
          //cancel close notificatins functionality
          // this.sendCancelNotifi(res);
          var pageNumber = 1;
          this.ticketsLoader(pageNumber);

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
    this.block = true;
    setTimeout(() => {
      this.block = false;
    }, 6000);

    if (response === 'Completed') {
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
      this.showCancelButton1 = false; 
    }


  }

  sendCancelInfo() {
    this.enableCancel = false;
    this.block = true;
    setTimeout(() => {
      this.block = false;
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
          // let input = {
          // 	purpose: 'created',
          // 	id: res.id
          // };

          //	this.sendNotificationUpdate(input, res);
          setTimeout(() => {
            this.cancelStatus = false;
          }, 3000);

          //cancel close notificatins functionality
          //this.sendCancelNotifi(res);

        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  //for updating edit option assigned to  
  updateName(reponse) {

    if (reponse === '') {
      return 'Yet to be assigned';
    } else {
      return reponse;
    }

  }

  closeModal() {
    $("#exampleModal-105").modal("hide");
  }
  // addUserRating($event){}
  closemodel(c: NgForm) {

    $("#exampleModal-105").modal("hide");
    c.form.reset();
    this.fileName = '';
    this.files = [];
    this.title = '';
    this.fileerror = false;
    this.fileerror1 = false;
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
    this.upload = 'Upload';
    this.block = false;
  }
  openModel() {
    $("#exampleModal-105").modal("show");
  }


  //sending notifications 
  sendNotification(data, docData) {

    this.notification.getTokens(data).subscribe(res => {
      var listOfTokens = res.TokenList.AdminTokenList;
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

  openModelforFeedback() {
    $("#exampleModal-85").modal("show");
    this.enableComplete = false;
    this.enableReopen = false;
    this.modeHide = true;
    this.enableRating = false;
  }


  sendStatus(userTicket) {
    this.userModulService.sendData.next(userTicket);
  }



}
