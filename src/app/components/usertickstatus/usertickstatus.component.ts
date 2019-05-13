import { Component, OnInit } from '@angular/core';
import { UsermoduleService } from '../../services/usermodule.service';
import { NotificationsService } from '../../services/notifications.service';
import { FcmNotificationsService } from '../../services/fcm-notifications.service';
import { NotificationStorageService } from '../../services/notification-storage.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { TicketsAssignService } from '../../services/tickets-assign.service';
import {Directive,HostListener} from '@angular/core';

declare var jquery:any;
declare var $: any;


export interface State {
  LoginId: string;
  Name: string;
}

@Component({
  selector: 'app-usertickstatus',
  templateUrl: './usertickstatus.component.html',
  styleUrls: ['./usertickstatus.component.scss']
})


export class UsertickstatusComponent implements OnInit {
  block: boolean = false;
  rating: number;
  tempComment: any;
  fileName1: string = '';
  upload: string = 'Upload';
  flag: boolean;
  fileerror1: boolean;
  fileerror: boolean;
  ticketStats: string = " ";
  resolution: string;
  userRating: string;
  resolutionComm: string;
  cancelData: string = '';
  edit: boolean = true;
  agentPhone: any;
  agentLocation: any;
  agentDesgnation: any;
  agentDepartment: any;
  userDescription: any;
  userTicket: any;
  userComments: Array<string>[];
  commentUserId: any;
  showCommentPanel: boolean;
  editTicketDetails: any;
  subCateg: any;
  cagaryName: any;
  seviarity: any;
  count: number = 0;
  ticketStatus: any;
  reOpenDate: any;
  imageSrc: any;
  closedOn: any;
  escalatedOn: any;
  raisedDate: any;
  assignedToUser: string;
  allNotificationsLength: any;
  allNotifications: any;
  badgeCount: any;
  editCategory: string;
  subCategoryNames: any;
  mAppsCount: any;
  itDeptCount: any;
  hrDeptCount: any;
  ticketsList: any[];
  imageLocation: any;
  loader: boolean;
  noTicketsDiv: boolean;
  disable: boolean;
  UserObject: any;
  tickrtObject: any;
  paraticId: any;
  UserLoginId;
  userfullname: string;
  userFullname;
  categoryNames: any;
  CategoryName = '';
  alive = true;
  UserticketDetails: any;
  comment = '';
  fileName: string = '';
  path: string;
  files: any = [];
  downloadURL: string;
  editSubCategory: string;
  ticketTitle: string;
  docDescription: string;
  ticketsId: string;
  length: number;
  attachmentName: string;
  ticketsDownloadurl: string;
  invalid: boolean = false;
  statusInfo: any;
  customRate: any;
  buttonenable: boolean = true;
  listOftoken: any = [];
  mainLoader: boolean = false;
  imageLoader: boolean = true;
  states: State[] = [];
  tempStates: State[] = [];
  
  showUserlist :boolean = false;
  @HostListener('click', ['$event.target'])
  onClick(btn) {
    this.showUserlist = false;
 }
 

  ngOnDestroy() {
    this.alive = false;
    // this.adminTeamService.replay.next("0");
  }

  constructor(public router: Router, public ticketsAssignServ: TicketsAssignService, private storage: AngularFireStorage, public userModulService: UsermoduleService, public notification: NotificationStorageService, private fcmNotifications: FcmNotificationsService, public notificationRetrive: NotificationsService) {
    var userInfo = localStorage.getItem('auth');
    // var UserObject = JSON.parse(userInfo);
    this.UserObject = JSON.parse(userInfo);
  }

  ngOnInit() {
    // $('#other').click(()=> {
    //   alert("checked");
    //   $("#target").focus();
    // })
    this.mainLoader = false;
    //retriving data from user component
    this.userModulService.sendData.takeWhile(() => this.alive).subscribe(res => {
      if (res != '0') {
        this.count = 1;
        this.mainLoader = false;
        this.getDocData(res);
        localStorage.removeItem('adminStatus');
        // this.mainLoader = false;
      }
    })

    this.paraticId = this.UserObject.PracticeId;
    this.UserLoginId = this.UserObject.LoginId;
    var fullName = this.UserObject.FName + " " + this.UserObject.MName + " " + this.UserObject.LName;
    this.userfullname = fullName;
    // if(this.UserObject)
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
    if (this.count != 1) {
      this.ticketDetails();
    }

    //asking permission to user for notifications from fcm
    this.fcmNotifications.getPermission(this.UserObject);

    // //reciving notifications from sender fcm
    this.fcmNotifications.receiveMessage()

    //notifications retriving api
    this.getNotifications();


    //closing of on
  }


  userList(){
    var usersListInputs = {

      "Authorization": "YWRtaW46YWRtaW4=",
      "roleName": "Admin",
      "teamName": this.UserticketDetails.category
    }
  
    //Retrivingall unAssigned  tickets list
    this.ticketsAssignServ.agentNamesList(usersListInputs).subscribe(res => {
      this.states = res.UserList;
      this.tempStates = this.states;
    }, error => {
      console.log(error);
    })
  
  }

// //@comminting
//  filtering(comment){
    
//   if(this.showUserlist === true){
//     console.log(comment);
//     let tempValue = comment;
//     let splitval = tempValue.split(" ");
//     splitval.forEach(val => {
//       if(val.charAt(0) === '@'){
//         let temp = val.split('@');
//         // console.log(this.states); 
//         this.tempStates = [];
//         this.states.filter(state => { 
//           if(state.LoginId.includes(temp[1]) || state.Name.toLowerCase().includes(temp[1].toLowerCase())){
//             this.tempStates.push(state);
//           }
//         });
//       }

//     });
    
//   }
//   }


//   storeValue(userObj) {
//     // alert("unchecked");

    
//     let tempValue = this.comment;
//     let splitval=tempValue.split(" ");
//     let temp = '';
//     splitval.forEach((val,i)=> {
//       // if(i === 0 && val!='@'){
//       //   temp = temp +''+ val;
//       // }
//        if(splitval.length-1 !== i){
//         temp = temp +' '+ val;
//       }
//     });
//     // console.log("temp comment",temp);
//     var sample =  temp+' @'+ userObj.LoginId;
//     this.comment = sample.trim();

//     this.showUserlist = false;
  
//    }

// //@commenting
// toShowUserList(value){

//   console.log("value",this.comment);
//     let tempValue = this.comment;
//     let splitval=tempValue.split(" ");
//     splitval.forEach(val => {

//     if(val.charAt(0) === '@' && val.length === 1){
    
//       this.showUserlist = true;
 
//     }    
//     });
//   }
  

  getDocData(input) {
    var req = { "ticketId": input.id };
    this.docDetails(req);

  }


  //Sub Category
  selectCategory(subCategoryValue) {

    var subCategry = { "teamName": subCategoryValue.teamName };
    this.CategoryName = subCategry.teamName;
    //this.editCategory = subCategry.teamName;
    let data = { "teamName": subCategoryValue.teamName }

    //Retriving sub Category list
    this.userModulService.retriveSubCategories(data).subscribe(res => {
      this.subCategoryNames = res;
    }, error => {
      console.log(error);
    })
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
  }


  valueNullChecking(response) {

    if (response != '' && response != null) {

      return response;
    } else {

      response = '--';
      return response;
    }

  }

  convertUTCDateToLocalDate(date) {

    var newDate = new Date(date);

    return newDate;
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

  //user Ticket Details function
  ticketDetails() {

    this.count = 2;
    var mainObject = localStorage.getItem('userStatus');
    this.UserticketDetails = this.tickrtObject = JSON.parse(mainObject);
    // console.log('TicketDetils',this.UserticketDetails);
    this.editTicketDetails = this.UserticketDetails.id;
    this.assignedToUser = this.UserticketDetails.assignedTo;
    this.raisedDate = this.UserticketDetails.createdDate;
    this.escalatedOn = this.UserticketDetails.escalatedDate;
    this.closedOn = this.UserticketDetails.closedDate;
    this.reOpenDate = this.UserticketDetails.reOpenedDate;
    this.ticketStatus = this.UserticketDetails.currentStatus;
    this.editCategory = this.UserticketDetails.category;
    this.agentDepartment = this.UserticketDetails.assignedToDepartment;
    this.agentDesgnation = this.UserticketDetails.assignedToTitleType;
    this.agentLocation = this.UserticketDetails.assignedToLocation;
    this.agentPhone = this.UserticketDetails.assignedToWorkPhone;
    this.editSubCategory = this.UserticketDetails.subCategory;
    this.ticketsId = this.UserticketDetails.id;
    this.attachmentName = this.UserticketDetails.attachmentName;
    this.imageLocation = this.UserticketDetails.attachmentLocation;
    this.fileName = this.attachmentName;
    this.rating = this.UserticketDetails.rating;
    // console.log("ticket detils",this.UserticketDetails)
    // getting user List
    this.userList(); 

    if (this.fileName !== '') {
      this.upload = "Re-upload"
    }

    if (this.UserticketDetails.resolved.length > 0) {
      this.resolution = this.UserticketDetails.resolved[0].statusComments;
      // console.log("Completed commentf",this.UserticketDetails.resolved[0].statusComments)
    }
   // console.log("Completed comment",typeof(this.UserticketDetails.completed[0]));
    if ( this.UserticketDetails.completed != undefined) {
     if(this.UserticketDetails.completed.length > 0){
    //  console.log("Completed commentr",this.UserticketDetails.completed[0].statusComments)
      this.resolutionComm = this.UserticketDetails.completed[0].statusComments;
     }    
    }
    this.mainLoader = true;
    this.userRating = this.UserticketDetails.rating;
    this.ngClassForIcons(this.ticketStatus);
    this.seviarity = this.UserticketDetails.adminSeverity;
    this.cagaryName = this.UserticketDetails.category;
    this.subCateg = this.UserticketDetails.subCategory;
    this.userComments = this.UserticketDetails.commentsList;
    this.userTicket = this.UserticketDetails.ticketTitle;
    this.docDescription = this.UserticketDetails.description;
    //this.paraticId = this.UserticketDetails.createdByDepartment;
    this.ticketsDownloadurl = this.UserticketDetails.attachmentLocation;

  }


  //
  setdate(createdDate) {
    var IST = new Date(createdDate); // Clone UTC Timestamp
    IST.setHours(IST.getHours() - 5); // set Hours to 5 hours later
    IST.setMinutes(IST.getMinutes() - 30); // set Minutes to be 30 minutes later

    return IST;

  }

  //return badges css status
  ngClassForIcons(value) {
    let data = '';
    if (value == 'Opened') {
      data = 'badge badge-info';
    } else if (value == 'Assigned') {
      data = 'badge badge-warning';
    } else if (value == 'In progress') {
      data = 'badge badge-primary';
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


  //comment function
  userComment(comment) {
    // alert("called3")
    var commentDetails = {
      "ticketId": this.editTicketDetails,
      "commentDescription": comment.trim(),
      "commentedBy": this.UserLoginId
    }
    if (comment.trim() != '') {

      if (this.tempComment != comment) {
        this.tempComment = comment;
        this.userModulService.addingComment(commentDetails).subscribe(res => {
          $('#reachagent').animate({ scrollTop: $('#reachagent1').height() }, 1000);
          this.comment = '';
          this.docDetails(res)

        }, error => {
          console.log(error);
        })
      }
    }

  }


  docDetails(res) {

    this.userModulService.retriveSingleTicket(res.ticketId).subscribe(res => {

      this.showCommentPanel = true;
      this.commentUserId = res[0].createdBy;
      this.userComments = res[0].commentsList;
      localStorage.setItem('userStatus', JSON.stringify(res[0]));
      this.mainLoader = true;
      this.ticketDetails();
    }, error => {
      console.log(error);
    })
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



  checkDesc(descri, e) {
    if (this.ticketStatus === 'Opened' || this.ticketStatus === 'Assigned' || this.ticketStatus === 'In progress' || this.ticketStatus === 'Reopen' || this.ticketStatus === 'Escalated') {
      this.edit = false;
      if (e.invalid === false) {
        this.invalid = false;

      } else {
        this.invalid = true;
      }
    } else {
      this.edit = true;
    }

  }


  checkUser(user, e) {
    if (this.ticketStatus === 'Opened' || this.ticketStatus === 'Assigned' || this.ticketStatus === 'In progress' || this.ticketStatus === 'Reopen' || this.ticketStatus === 'Escalated') {
      this.edit = false;
      if (e.invalid === false) {
        this.invalid = false;

      } else {
        this.invalid = true;
      }
    } else {
      this.edit = true;
    }

  }



  // update ticket 
  updateTicket() {
    this.edit = false;
    this.block = true;
    setTimeout(() => {
      this.block = false;
    }, 3000);
    if (this.fileName1.length > 0) {

      var date = new Date();

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
          ticketTitle: this.userTicket,
          description: this.docDescription,
          id: this.ticketsId,
          attachmentName: this.fileName,
          attachmentLocation: this.downloadURL,
          createdByDepartment: this.paraticId
        };
        this.userModulService.updateDocument(data).subscribe((result) => {
          //this.updatingDataInPanel();
          this.edit = true;
          // this.block = false;
          $("#exampleModal-7").modal("show");
          setTimeout(() => {
            $("#exampleModal-7").modal("hide");
          }, 2000)
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
        ticketTitle: this.userTicket,
        description: this.docDescription,
        id: this.ticketsId,
        attachmentName: this.attachmentName,
        attachmentLocation: this.ticketsDownloadurl,
        createdByDepartment: this.paraticId

      }
      this.userModulService.updateDocument(data).subscribe((result) => {
        this.edit = true;
        this.block = false;
        $("#exampleModal-7").modal("show");
        setTimeout(() => {
          $("#exampleModal-7").modal("hide");

        }, 2000)
        // this.updatingDataInPanel();
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
    this.fileName1 = this.files[0].name;
    this.attachmentName = this.files[0].name;
    var exten = this.getExten(this.fileName)
    //  if(this.updateTicketFilename)
    if (exten[0] === 'jpg' || exten[0] === 'png' || exten[0] === "PNG" || exten[0] === "jpeg" || exten[0] === "pdf") {
      this.fileerror = false;
      if (this.files[0].size <= 1048576) {
        this.upload = 'Re-upload';
        this.fileerror1 = false;
        this.edit = false;
        if (this.fileName.length > 16) {
          this.fileName = this.fileName.substring(0, 15);
          this.fileName = this.fileName + '...' + exten;
          this.attachmentName = this.fileName;
        }

        if (this.fileName.length > 0 && this.fileName != '') {
         
          this.flag = true;

        } else {
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

  sendCancelInfo() {
    this.block = true;
    setTimeout(() => {
      this.block = false;
    }, 6000);

    if (this.cancelData.length > 0 && this.cancelData != '') {
      var request = {
        currentStatus: 'Cancelled',
        modifiedBy: this.UserLoginId,
        id: this.ticketsId,
        comments: this.cancelData
      };
      this.ticketStats = 'Cancelled';
      this.ticketsAssignServ.ticketsStatusUpdate(request).subscribe(
        (res) => {
          $("#exampleModal-8").modal("hide");
          this.ticketStatus = request.currentStatus;
          let req = {
            "ticketId": this.ticketsId
          }
          this.docDetails(req);


          let input = {
            "purpose": "created",
            "id": res.id
          }
          //update notification sending notiifcation
          this.sendNotification(input, res);

        },
        (error) => {
          console.log(error);
        }
      );
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


  addUserRating() {
    this.buttonenable = false;
    var userServiceRating = {
      "rating": this.customRate,
      "ratingBy": this.UserLoginId,
      "id": this.editTicketDetails
    }
    this.userModulService.updateRating(userServiceRating).subscribe(res => {
      //  alert("hello1");
      this.rating = res.rating;

    });
  }

  statusupdate(statusInfo) {
    this.block = true;
    setTimeout(() => {
      this.block = false;
    }, 6000);
    if (this.cancelData.length > 0 && this.cancelData != '') {
      var request = {
        currentStatus: statusInfo,
        modifiedBy: this.UserLoginId,
        id: this.ticketsId,
        comments: this.cancelData
      };
      // console.log(statusInfo,request);
      this.ticketStats = statusInfo;
      this.ticketsAssignServ.ticketsStatusUpdate(request).subscribe(
        (res) => {
          // console.log(res);
          // $("#exampleModel-46").modal("hide");
          $("#exampleModal-5").modal("hide");
          $("#exampleModal-6").modal("hide");
          this.buttonenable = true;
          this.ticketStatus = request.currentStatus;
          let req = {
            "ticketId": this.ticketsId
          }
          this.docDetails(req);

          let input = {
            "purpose": "created",
            "id": res.id
          }
          //update notification sending notiifcation
          this.sendNotification(input, res);

        },
        (error) => {
          console.log(error);
        });
    }
  }


  statusupdate1(statusInfo) {
    this.block = true;
    setTimeout(() => {
      this.block = false;
    }, 6000);
    var request = {
      currentStatus: statusInfo,
      modifiedBy: this.UserLoginId,
      id: this.ticketsId,
      comments: this.cancelData
    };
    console.log(request)
    this.ticketStats = statusInfo;
    this.ticketsAssignServ.ticketsStatusUpdate(request).subscribe(
      (res) => {
        $("#exampleModal-5").modal("hide");
        $("#exampleModal-6").modal("hide");
        this.buttonenable = true;
        this.ticketStatus = request.currentStatus;
        let req = {
          "ticketId": this.ticketsId
        }
        this.docDetails(req);

        let input = {
          "purpose": "created",
          "id": res.id
        }
        //update notification sending notiifcation
        this.sendNotification(input, res);

      },
      (error) => {
        console.log(error);
      });

  }

  statusupdate2(statusInfo) {
    this.block = true;
    setTimeout(() => {
      this.block = false;
    }, 2000);
    if (this.cancelData.length > 0 && this.cancelData != '') {
      var request = {
        currentStatus: statusInfo,
        modifiedBy: this.UserLoginId,
        id: this.ticketsId,
        comments: this.cancelData
      };
      this.ticketStats = statusInfo;
      this.ticketsAssignServ.userResolve(request).subscribe(
        (res) => {
          $("#exampleModal-46").modal("hide");
          this.ticketStatus = request.currentStatus;
          let req = {
            "id": this.ticketsId
          }
          // console.log(this.ticketsId)
          this.docDetails(req);

          let input = {
            "purpose": "created",
            "id": res.id
          }
          //update notification sending notiifcation
          this.sendNotification(input, res);

        },
        (error) => {
          console.log(error);
        });
    }
  }

  showNotification() {
    let data = 'false';
    this.router.navigateByUrl('dashboard');
    this.userModulService.reqData.next(data);
  }


  //unread notification
  unreadNotificatio(notification) {
    let notificationId = []
    notificationId.push(notification.id)
    let RequestBody = {
      "notificationIds": notificationId,
      "modifiedBy": this.UserLoginId
    }
    this.docDetails(notification);
    if (notificationId.length > 0) {
      this.notification.singleNotifUnread(RequestBody).subscribe(res => {
        this.getNotifications();
      })
    }
  }


  //sending notifications 
  sendNotification(data, docData) {

    this.notification.getTokens(data).subscribe(res => {
      var listOfTokens = res.TokenList.AdminTokenList;
      // @spatnala updated his ticket(<Ticket ID> this.UserticketDetails.trackingId) status to closed/resolved
      var notificationBody = '@ ' + this.commentUserId + ' updated his ticket ' + this.UserticketDetails.trackingId + ' status to ' + this.ticketStats;
      if (listOfTokens.length > 0) {
        for (var i = 0; i < listOfTokens.length; i++) {
          this.listOftoken.push(listOfTokens[i].fcmToken);
        }
        var listOfTokens = res.TokenList.AgentTokenList;
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

  //closng of main div
  openmodal(src, extension) {
    var someTempUrl = extension;
    this.block = true;
    setTimeout(() => {
      this.block = false;
    }, 3000);
    let lastChar = extension.substr(extension.length - 3);
    if (lastChar === 'pdf') {
      window.open(src, '_blank');
    } else {
      $("#exampleModal-24").modal("show");
      this.imageLoader = true;
      setTimeout(() => {
        this.imageLoader = false;
      }, 2500);
      //setTimeout(this.imageLoader = false, 2000)
      this.imageSrc = src;
    }
  }

  clearFiles() {
    //alert(this.edit)
    this.edit = false;
    this.upload = 'Upload'
    this.fileName = '';
    this.files = [];
    this.downloadURL = '';
    this.fileName1 = '';
    this.attachmentName = '';
    this.imageLocation = '';
  }

}