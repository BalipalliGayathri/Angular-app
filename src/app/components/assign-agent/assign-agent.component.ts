import { Component, OnInit } from '@angular/core';
import { TicketsAssignService } from '../../services/tickets-assign.service';
import { UsermoduleService } from '../../services/usermodule.service';
import { NotificationStorageService } from '../../services/notification-storage.service';
import { FcmNotificationsService } from '../../services/fcm-notifications.service';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
// import {Directive,HostListener} from '@angular/core';
import { splitAtColon } from '@angular/compiler/src/util';


declare var jQuery: any;
declare var $: any;

export interface State {
  LoginId: string;
  Name: string;
}

@Component({
  selector: 'app-assign-agent',
  templateUrl: './assign-agent.component.html',
  styleUrls: ['./assign-agent.component.scss']
})

// @Directive({
//   selector: 'span'
// })


export class AssignAgentComponent implements OnInit {
  rating:number  = 0;
  enable1:boolean = true;
  enable:boolean = false;
  blockchages: boolean = false;
  tempComment: any;
  tackingId: any;
  selectEscalstedValue: string = '';
  enableTextarea: boolean = false;
  reOpenObject: Array<any> = [];
  commentArray: any;
  userLoginId: any;
  escalatedObject: Array<any> = [];
  ticketStatus: string = '';
  docFulldetails: any = [];
  showLoader = false;
  alive = true;
  docId = '';
  modifiedBy = '';
  ticketAssignedStatus = false;
  UserObject: any;
  ticketCommentModal = false;
  statusComment = '';
  ticketUpdate = '';
  comment = '';
  commentInput;
  RoleName: string = '';
  severity: string = '';
  changeCategoryvalue: string = '';
  changeSubCategoryvalue: string = '';
  subCategoryNames: any;
  imageSrc: any;
  imageLoader: boolean = true;
  listOftoken: any = [];
  listOfUsertoken: any = [];
  statusError: boolean = false;
  resolution: Array<any> = [];
  cancelResolu: Array<any> = [];
  userFeedObje: Array<any> = [];
  text:boolean = false;
  assignedToName1: string = '';
  assignedfullname: any;
  assignedToDetails: any = {};
  enableTick:boolean = false;
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;
  disable1:boolean=false;
  states: State[] = [];
  tempStates: State[] = [];
  userFullName= '';
  block: boolean = false;
  showUserlist: boolean = false;
  showDesc:boolean = false;
  show:boolean = false;
  disp: boolean = false;
  start: boolean = false;
  assignto = '';
  var1 = 1;
  spinenable1 :boolean = false;
  // @HostListener('click', ['$event.target'])
  // onClick(btn) {
  //   this.showUserlist = false;
  // }


  constructor(public ticketsAssignServ: TicketsAssignService, private fcmNotifications: FcmNotificationsService, public notification: NotificationStorageService, public userModulService: UsermoduleService) { 
   //filtering objects
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(startWith(''),map(state => state ? this._filterStates(state) : this.states.slice()));

  }

  //filtering array
  private _filterStates(value: string): State[] {
      this.assignedToName1 = '';
    const filterValue = value.toLowerCase();
      // setTimeout(() => {
      this.var1 +=1;
      this.spinenable1 = false; 
    // }, 1000);
    return this.states.filter(state => { return state.LoginId.toLowerCase().indexOf(filterValue) === 0 || state.Name.toLowerCase().indexOf(filterValue) === 0 });
  }

  ngOnDestroy() {
    this.alive = false;
    // this.adminTeamService.replay.next("0");
  }

  ngOnInit() {

    this.ticketsAssignServ.replay.takeWhile(() => this.alive).subscribe(res => {

      if (res != '0') {
        //retrvingData
        this.getSingleDoc(res);
      }
    })

    var userInfo = localStorage.getItem('auth');
    this.UserObject = JSON.parse(userInfo);
    // console.log(this.UserObject)
    this.userLoginId = this.UserObject.LoginId;
    this.RoleName = this.UserObject.RoleName;
    // alert("agent")
    this.changeCategoryvalue = this.UserObject.TeamName;
    this.userFullName = this.UserObject.FName + " " + this.UserObject.MName + " " + this.UserObject.LName;
     // console.log("Team Name superAdmin");
   // this.selectCategory(this.changeCategoryvalue);


   //retriving users list inputs
   var usersListInputs = {

    "Authorization": "YWRtaW46YWRtaW4=",
    "roleName": this.UserObject.RoleName,
    "teamName": this.UserObject.TeamName,
  }
  // console.log('userobj:',this.UserObject);
  //Retrivingall unAssigned  tickets list
  this.ticketsAssignServ.agentNamesList(usersListInputs).subscribe(res => {
    this.states = res.UserList;
    this.tempStates = this.states;
  }, error => {
    console.log(error);
  })

  //closing oninit
  }

  //chips funcationality 
  selected(event: MatAutocompleteSelectedEvent, i): void {
    this.show = true;
    this.assignedToName1 = event.option.value;
    this.disable1= true;
    this.enableTick = true;
    this.assignedfullname = this.assignedName(this.assignedToName1);
    this.assignedToDetails = this.assignedToPerson(this.assignedToName1);

    // console.log("selected employee list",this.assignedToName1);
  }

  spinner1(){
    
    // alert("inside");
    if(this.var1 === 1)
    this.spinenable1 = true;

    
  }

  spinner11(){
    // alert("inside");
    this.spinenable1 = false;
  }
    // function that returns full name of the    taskassigned to name
    assignedName(name) {

      for (let i = 0; i < this.states.length; i++) {
        if (name === this.states[i].LoginId) {
          return this.states[i].Name;
        }
  
      }
    }


    showdesc(){
      
    }

    assignedToPerson(name) {
      for (let i = 0; i < this.states.length; i++) {
        if (name === this.states[i].LoginId) {
          return this.states[i];
        }
  
      }
    }

   // Full name substring function
   idStringSubstring(response) {
    let Response: string = response;
    this.assignto = response;
    if (Response.length > 7) {
      return Response.substring(0, 7) + ".";
    } else {
      return Response;
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

  updateTicket(){
    this.text=true;
    this.disp=false;
  }

  assto(){
    this.text = false;
    this.disp = true;
    // alert("inside");
  }

  reassignTicket(agent){
    this.text=false;
    this.disp = true;
    
  }

  //priority color code
  ngClassForSeviorty(value) {
    let data = '';
    if (value == 'High') {
      data = 'badge badge-danger';
    } else if (value == 'Medium') {
      data = 'badge badge-warning';
    } else if (value == 'Low') {
      data = 'badge badge-success';
    }

    return data;
  }

  valueNullChecking(response) {

    if (response != '' && response != null) {

      return response;

    } else {

      response = '--';
      return response;
    }

  }

  valueNullChecking1(response) {

    if (response != '' && response != null) {

      return '' + response;

    } else {

      response = '--';
      return response;
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
  


  //retriving single doc details
  getSingleDoc(response) {
    //alert('called');
    this.userModulService.retriveSingleTicket(response.id).subscribe(res => {

      this.showLoader = true;
      this.docFulldetails = res[0];
      // console.log("Full doc details",this.docFulldetails);
      this.commentArray = res[0].commentsList;
      this.docId = res[0].id;
      this.modifiedBy = res[0].modifiedBy;
      this.ticketStatus = res[0].currentStatus;
      this.resolution = this.docFulldetails.resolved;
      this.cancelResolu = this.docFulldetails.cancelled;
      this.reOpenObject = this.docFulldetails.reopened;
      this.escalatedObject = this.docFulldetails.escalated;
      this.userFeedObje = this.docFulldetails.completed;
      this.tackingId = this.docFulldetails.trackingId;
      this.rating = this.docFulldetails.rating;
      // console.log("res",res);
      this.selectCategory(this.docFulldetails.category);
    }, error => {
      console.log(error);
    })
  }


  // change Severity method
  changeSeverity(e) {
    this.severity = e;
    let data = {
      "id": this.docId,
      "modifiedBy": this.userLoginId,
      "adminSeverity": this.severity

    }
    this.ticketsAssignServ.changeSeverity(data).subscribe((res) => {

      this.docFulldetails.adminSeverity = this.severity;
    }, (error) => {
      console.log(error)
    })

}


changeCategory1(e) {
    this.changeCategoryvalue = e;
    $("#exampleModal-25").modal("show");

 }

  changeCategory(){ 
    this.blockchages = true;
    this.block = true;
    setTimeout(() => {
      this.block = false;
      // $("#exampleModal-4").modal("hide");
      
    }, 6000);
    if(this.changeCategoryvalue === 'APPS'){
    let data = {
          "id": this.docId,
          "category": 'APPS',
          "modifiedBy": this.userLoginId,
          "subCategory": "MINT"
        }
        this.ticketsAssignServ.changeCatageryMethod(data).subscribe((res) => {
          this.docFulldetails.category = res[0].category;
          this.docFulldetails.subCategory = res[0].subCategory;
          this.ticketStatus = res[0].currentStatus; 
          this.docFulldetails.assignedTo = res[0].assignedTo;
        }, error => {
          console.log(error)
        })
      }
      else if( this.changeCategoryvalue === 'IT'){
        let data = {
          "id": this.docId,
          "category": 'IT',
          "modifiedBy": this.userLoginId,
          "subCategory": "VOIP"
        }
        this.ticketsAssignServ.changeCatageryMethod(data).subscribe((res) => {
          this.docFulldetails.category = res[0].category;
          this.docFulldetails.subCategory = res[0].subCategory;
          this.ticketStatus = res[0].currentStatus; 
          this.docFulldetails.assignedTo = res[0].assignedTo;
    
        }, error => {
 
           console.log(error)
        })
      }
      else if( this.changeCategoryvalue === 'HR')
      {
        let data = {
          "id": this.docId,
          "category": 'HR',
          "modifiedBy": this.userLoginId,
          "subCategory": "Payroll"
        }

        this.ticketsAssignServ.changeCatageryMethod(data).subscribe((res) => {
         this.docFulldetails.category = res[0].category;
         this.docFulldetails.subCategory = res[0].subCategory;
         this.ticketStatus = res[0].currentStatus; 
         this.docFulldetails.assignedTo = res[0].assignedTo;
    
        }, error => {

          console.log(error)
        })
      }
  }

  changesubCategory() {
    // alert("called")
    // console.log(this.changeSubCategoryvalue)
    this.block = true;
    setTimeout(() => {
      this.block = false;
      // $("#exampleModal-4").modal("hide");
      
    }, 6000);
    let data = {
      "id": this.docId,
      "category":  this.docFulldetails.category,
      "modifiedBy": this.userLoginId,
      "subCategory": this.changeSubCategoryvalue
    }
    // console.log(data.subCategory)
    this.ticketsAssignServ.changeCatageryMethod(data).subscribe((res) => {
      this.docFulldetails.category = this.docFulldetails.category;
      this.docFulldetails.subCategory = this.changeSubCategoryvalue;
      // console.log(this.docFulldetails.subCategory+"res"+res)
    }, error => {
      this.docFulldetails.category = this.changeCategoryvalue;
      this.docFulldetails.subCategory = this.changeSubCategoryvalue;
       console.log(error)
    })

  }

  changeSubCategory(e) {
    // console.log(e)
    this.changeSubCategoryvalue = e;
  }

  //Sub Category
  selectCategory(subCategoryValue) {
    var subCategry = { "teamName": subCategoryValue };
    //Retriving sub Category list
    this.userModulService.retriveSubCategories(subCategry).subscribe(res => {
      this.subCategoryNames = res;
      this.changeSubCategoryvalue = this.subCategoryNames[0].subCategoryName;
    }, error => {
      console.log(error);
    })
  }


  //Status update
  statusUpdate(docDeatals, response) {
    this.showDesc = true;
    this.text = false;
    this.disp = true;
    this.start = true;
    if (docDeatals.currentStatus === "Assigned" && response === 'Solved') {
      this.ticketAssignedStatus = true;

    } else {
      //checking status if solved then pushing poup for Escalated
      if (response === 'Solved' || response === 'Escalated') {
        this.ticketUpdate = response;
        this.ticketAssignedStatus = true;
        this.ticketCommentModal = true;


      } else {

        var request = {
          "currentStatus": response,
          "modifiedBy": this.userLoginId,
          "id": this.docId
        }

        this.ticketsAssignServ.ticketsStatusUpdate(request).subscribe(res => {
          this.ticketAssignedStatus = false;
          this.ticketStatus = response;
          this.getSingleDoc(res);

        }, error => {
          console.log(error);
        })

      }
    }
    //closing of status function 
  }


  //alert 
  submitStatusComment() {
    // alert("hello");
    this.block = true;
    setTimeout(() => {
      this.block = false;
      // $("#exampleModal-4").modal("hide");
      
    }, 6000);
    if (this.statusComment != '') {
      //alert("hello1");
      $("#exampleModal-11").modal("hide");
      this.statusError = false;
      var request = {
        "currentStatus": this.ticketUpdate,
        "modifiedBy": this.userLoginId,
        "id": this.docId,
        "comments": this.statusComment
      }

      this.ticketsAssignServ.ticketsStatusUpdate(request).subscribe(res => {
        this.ticketAssignedStatus = false;
        this.ticketCommentModal = false;
        this.getSingleDoc(res);
        this.notificationSending(res);
        this.enableTextarea = false;
      }, error => {
        console.log(error);
      })

    }
    else {
      this.enableTextarea = false;
      $("#exampleModal-11").modal("hide");
      //alert("hello1");
      this.statusError = true;
    }
  }


  notificationSending(res) {

    if (res.currentStatus === 'Escalated') {

      //for notifications sending
      let input = {
        "purpose": "Escalated",
        "id": res.id
      }
      this.sendEscalateNotifi(input, res);

    } else if (res.currentStatus === 'Solved') {

      //for notifications sending
      let input = {
        "purpose": "resolved",
        "id": res.id
      }

      this.sendSolveNotifi(input, res);

    }
  }


  sendSolveNotifi(data, docData) {

    this.notification.getTokens(data).subscribe(res => {

      var listOfTokens = res.TokenList.AdminTokenList;
      //@skatta has updated the status of your ticket(<Ticket ID>) to  /cancelled
      var notificationBody = this.docFulldetails.assignedTo + '  has marked your ticket ' + this.tackingId + ' as resolved';

      //admin list of tokens
      if (listOfTokens.length > 0) {
        for (var i = 0; i < listOfTokens.length; i++) {
          this.listOftoken.push(listOfTokens[i].fcmToken);
        }
        //sending notification to user 
        this.sendNotifications(this.listOftoken, notificationBody);
      }
      //user list of tokens
      //var agentNotificationBody = this.docFulldetails.assignedTo + '  has updated the status of your ticket ' + this.tackingId + ' to' + this.ticketUpdate;
      var agentNotificationBody = this.docFulldetails.assignedTo + '  has marked your ticket ' + this.tackingId + ' as resolved';
      var userListOfTokens = res.TokenList.UserTokenList;
      if (userListOfTokens.length > 0) {
        for (var i = 0; i < userListOfTokens.length; i++) {
          this.listOfUsertoken.push(userListOfTokens[i].fcmToken);
        }
        //sending notification to user 
        this.sendNotifications(this.listOfUsertoken, agentNotificationBody);
        this.listOfUsertoken = [];
        this.listOftoken = [];
      }

    }, error => {
      console.log(error);
    })
  }

  //sending notifications 
  sendEscalateNotifi(data, docData) {

    this.notification.getTokens(data).subscribe(res => {
      var listOfTokens = res.TokenList.AdminTokenList;
      //@skatta has escalated ticket(<Ticket ID>)
      var notificationBody = this.docFulldetails.modifiedBy + ' has escalated ticket ' + this.tackingId;
      //admin list of tokens
      if (listOfTokens.length > 0) {
        for (var i = 0; i < listOfTokens.length; i++) {
          this.listOftoken.push(listOfTokens[i].fcmToken);
        }
        //sending notification to user 
        this.sendNotifications(this.listOftoken, notificationBody);
      }

      //user list of tokens
      var agentNotificationBody = 'You ticket ' + this.tackingId + ' has been escalated for resolution';
      var userListOfTokens = res.TokenList.UserTokenList;
      if (userListOfTokens.length > 0) {
        for (var i = 0; i < userListOfTokens.length; i++) {
          this.listOfUsertoken.push(userListOfTokens[i].fcmToken);
        }
        //sending notification to user 
        this.sendNotifications(this.listOfUsertoken, agentNotificationBody);
        this.listOfUsertoken = [];
        this.listOftoken = [];
      }

    }, error => {
      console.log(error);
    })

  }

//   filtering(comment){
    
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
//     let tempValue = this.comment;
//     let splitval=tempValue.split(" ");
//     let temp = '';
//     splitval.forEach((val,i)=> {
//       if(splitval.length-1 !== i){
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
    
//       this.showUserlist = !this.showUserlist;
//     }    
//     });
//   }
  
  //comment function
  userComment(comment) {
  
  // console.log(code);
  
    if (comment.trim() != '') {  
      var commentDetails = {
        "ticketId": this.docId,
        "commentDescription": comment.trim(),
        "commentedBy": this.userLoginId
      }
      //checking previous comment if yes then stoping
      if (this.tempComment != comment) {
        this.tempComment = comment;
        this.userModulService.addingComment(commentDetails).subscribe(res => {
          this.comment = '';
          $('#reachagent').animate({ scrollTop: $('#reachagent1').height() + 50 }, 1000);

          //for notifications sending
          let input = {
            "purpose": "AgentComment",
            "id": res.id
          }

          this.sendCommentNotific(input, res);

          this.commentInput = {
            'id': res.ticketId
          }

          this.getSingleDoc(this.commentInput);
        }, error => {
          console.log(error);
        })

      }

    }


  }

  //sending notifications 
  sendCommentNotific(data, docData) {

    this.notification.getTokens(data).subscribe(res => {

      //user list of tokens
      var agentNotificationBody = '@ ' + docData.assignedTo + ' commented on your ticket ' + this.tackingId;
      var userListOfTokens = res.TokenList.UserTokenList;
      if (userListOfTokens.length > 0) {
        for (var i = 0; i < userListOfTokens.length; i++) {
          this.listOfUsertoken.push(userListOfTokens[i].fcmToken);
        }
        //sending notification to user 
        this.sendNotifications(this.listOfUsertoken, agentNotificationBody);
        this.listOfUsertoken = [];
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
      'route': '/admin/ticketsAssign'
    }

    this.fcmNotifications.sendMessage(inputs);

  }



  //showing alert poupup data for escalated and closed
  showAlertData(docFulldetails) {

    this.escalatedObject = docFulldetails.escalated;
  }

  //showing alert poupup data for escalated and closed
  showReopendData(docFulldetails) {
    this.reOpenObject = docFulldetails.reopened;
  }

  //closng of main div
  openmodal(src, extension) {
    var someTempUrl = extension;
    let lastChar = extension.substr(extension.length -3);
    if(lastChar === 'pdf'){
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




  startTicket() {

    if (this.docFulldetails.subCategory === "" || this.docFulldetails.subCategory === null || this.docFulldetails.subCategory === undefined) {
      $("#exampleModal-15").modal("hide");
      $("#exampleModal-31").modal("show");
    }
    else {
      $("#exampleModal-15").modal("show");
      $("#exampleModal-31").modal("hide");

    }

  }



  clearStatusComment() {
    $('#exampleModal-11').modal("hide");
    this.statusComment = '';
  }

  selectEscalsted(event) {
    if (this.selectEscalstedValue === 'Other') {
      this.enableTextarea = true;
      this.statusComment = '';
    }
    else {
      this.enableTextarea = false;
      this.statusComment = this.selectEscalstedValue;
    }
  }

  cancle1() {
    this.stateCtrl.enable();
    this.stateCtrl.setValue('');
    this.assignedToName1='';
    this.disable1 = false;
    this.enableTick = false;
    this.show = false;
  }

  assignSeverity(e){
    // console.log(e)
    this.docFulldetails.adminSeverity = e.target.value;
    this.enable1 = false;
  }
  assign() {
    this.enable = true;
    this.block = true;
    setTimeout(() => {
      this.show = false;
      $('#exampleModal-28').modal("hide");
      $('#exampleModal-100').modal("show");
    }, 2000);
    
    
    setTimeout(() => {
      $('#exampleModal-100').modal("hide");
    }, 4000);
    var data;
    // console.log( "assign to:",this.assignto);
    
    if(this.assignto === ''){
       data ={
        "id":  this.docId,
        "assignedToName": this.assignedfullname,
        "assignedTo": this.assignedToName1,
        "assignedBy": this.userLoginId,
        "assignedByName": this.userFullName,
        "adminSeverity": this.docFulldetails.adminSeverity
      }
    }else{
      // console.log(this.assignto);
      data ={
        "id":  this.docId,
        "assignedToName": this.assignedfullname,
        "assignedTo": this.assignto,
        "assignedBy": this.userLoginId,
        "assignedByName": this.userFullName,
        "adminSeverity": this.docFulldetails.adminSeverity
      }
    }


    this.ticketsAssignServ.assigntask(data).subscribe((res) => {
      this.stateCtrl.setValue('');
      this.stateCtrl.enable();
      this.assignedToName1='';
      this.disable1 = false;
      this.enableTick = false;
      this.text = false;
      //this.reassignTicket(this.text);
     var req = {"id": this.docId };
      this.getSingleDoc(req);


    }, (error) => {
      console.log(error);
    })

  }

}


