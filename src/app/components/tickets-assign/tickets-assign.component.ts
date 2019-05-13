import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { TicketsAssignService } from '../../services/tickets-assign.service';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase';
import { NotificationStorageService } from '../../services/notification-storage.service';
import { FcmNotificationsService } from '../../services/fcm-notifications.service';
import { YourTicketsComponent } from '../your-tickets/your-tickets.component';
// import { userInfo } from 'os';
declare var $: any;

export interface State {
  LoginId: string;
  Name: string;
  TicketCount: string;
}

@Component({
  selector: 'app-tickets-assign',
  templateUrl: './tickets-assign.component.html',
  styleUrls: ['./tickets-assign.component.scss']
})
export class TicketsAssignComponent implements OnInit {
  tackingId: any;
  assignedToDetails: any = {};
  subcatvalue: any;
  docIndex: any;
  catValue: any;
  catgeoryDoc: any;
  CatgeoryDoc: any;
  RoleName: string = '';
  listOfAgenttoken: any;
  subCatNotific: any;
  aDay = 24 * 60 * 60 * 1000 * 2;
  stateCtrl = new FormControl();
  stateCtrl1 = new FormControl();
  stateCtrl2 = new FormControl();
  stateCtrl3 = new FormControl();
  stateCtrl4 = new FormControl();
  filteredStates0: Observable<State[]>;
  filteredStates1: Observable<State[]>;
  filteredStates2: Observable<State[]>;
  filteredStates3: Observable<State[]>;
  filteredStates4: Observable<State[]>;
  disable1: boolean = false;
  disable2: boolean = false;
  disable3: boolean = false;
  disable4: boolean = false;
  disable5: boolean = false;
  block: boolean = false;
  name = '';
  filteredStates: Observable<State[]>;
  severityValue: string = '';
  severityValue1: string = '';
  severityValue2: string = '';
  severityValue3: string = '';
  severityValue4: string = '';
  severityStatus: string = '';
  listOftoken: any = [];
  listOfUsertoken: any = [];
  searchValue = '';
  //object for assigning users list
  states: State[] = [];
  searchValueState = '';
  UserObject;
  assignedObject;
  assignedListLength: number;
  //pagination length for un asssigned
  unAssignedListLength: number = 0;
  escalatedListLength: number;
  yourtaksListLength: number;
  solvedTicketsLength: number;
  pageSize = 5;
  escalatedObject;
  yourTasksObject;
  resolvedTasksObject;
  unAssignedObject;
  fruitCtrl = new FormControl();
  allFruits: any = []; //
  @ViewChild('fruitInput') fruitInput: ElementRef;
  privateEmp: any = ['rkanumetta', 'skola']; // For Track Tags
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = false;
  separatorKeysCodes = [ENTER, COMMA];
  filteredFruits: Observable<any[]>;
  showAssignedPanel: boolean = false;
  tags = [];
  tags1: any = [];
  tags2: any = [];
  tags3: any = [];
  tags4: any = [];
  rajeshTemp: any = 52;
  myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  option1: any;
  option2: any;
  option3: any;
  option4: any;
  option5: any;
  noTicketsDiv: boolean = false;
  assignId: any;
  assignedfullname: any;
  fullName: string = '';
  UserLoginId: any = '';
  assignedToName5: string = '';
  assignedToName4: string = '';
  assignedToName3: string = '';
  assignedToName1: string = '';
  assignedToName2: string = '';
  hide: boolean;
  disable: boolean;
  loader: boolean;
  selectSeverityerror: boolean;
  selectSeverityerror1: boolean;
  selectSeverityerror2: boolean;
  selectSeverityerror4: boolean;
  selectSeverityerror3: boolean;
  seconds: number;
  tab1: boolean = true;
  tab2: boolean = false;
  tab3: boolean = false;
  tab4: boolean = false;
  tab5: boolean = false;
  unAssignedListLength1:number;
  assignedListLength1 :number;
  yourtaksListLength1 :number;
  escalatedListLength1 :number;
  solvedTicketsLength1 :number;
  spinenable:boolean = false;
  spinenable1:boolean = false;
  spinenable2:boolean = false;
  spinenable3:boolean = false;
  spinenable4:boolean = false;
  var = 1;
  var1 = 1;
  var2 = 1;
  var3 = 1;
  var4 = 1;
  // tabname:string;

  currentStatus = {
    "currentTab":'',
    "apiData":'',
    "pageNumber": 0
  }
  //showing tickets
  showUnass:boolean = false;
  showAss:boolean = false;
  showYour:boolean = false;
  showEscal:boolean = false;
  showSolved:boolean = false;
  //pagination--> zero based row number
  first:number = 0;
  second:number = 0;
  assfirst:number = 0;
  unassfirst:number = 0;
  escalfirst:number = 0;

  ngAfterViewInit() {

    this.cdr.detectChanges();
  }


  constructor(public router: Router, private fcmNotifications: FcmNotificationsService, public notification: NotificationStorageService, private cdr: ChangeDetectorRef, public ticketsAssignServ: TicketsAssignService, public location: Location) {
    // get user data from localstorage 
    var userInfo = localStorage.getItem('auth');
    var UserObject = JSON.parse(userInfo);
    var fullName = UserObject.FName + " " + UserObject.MName + " " + UserObject.LName;
    this.fullName = fullName;
    this.UserLoginId = UserObject.LoginId;
    this.RoleName = UserObject.RoleName;
    // filters 

  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();
    // setTimeout(() => {
      // alert("flase");
      this.var +=1;
      this.spinenable = false;
    // }, 1000);
    return this.states.filter(state => { return state.LoginId.toLowerCase().indexOf(filterValue) === 0 || state.Name.toLowerCase().indexOf(filterValue) === 0 });
  }
  private _filterStates1(value: string): State[] {
    const filterValue = value.toLowerCase();
    // setTimeout(() => {
      // alert("flase");
      this.var1 +=1;
      this.spinenable1 = false;
    // }, 1000);
    return this.states.filter(state => { return state.LoginId.toLowerCase().indexOf(filterValue) === 0 || state.Name.toLowerCase().indexOf(filterValue) === 0 });
  }
  private _filterStates2(value: string): State[] {
    const filterValue = value.toLowerCase();
    // setTimeout(() => {
      // alert("flase");
      this.var2 +=1;
      this.spinenable2 = false;
    // }, 1000);
    return this.states.filter(state => { return state.LoginId.toLowerCase().indexOf(filterValue) === 0 || state.Name.toLowerCase().indexOf(filterValue) === 0 });
  }
  private _filterStates3(value: string): State[] {
    const filterValue = value.toLowerCase();
    // setTimeout(() => {
      // alert("flase");
      this.var3 +=1;
      this.spinenable3 = false;
    // }, 1000);
    return this.states.filter(state => { return state.LoginId.toLowerCase().indexOf(filterValue) === 0 || state.Name.toLowerCase().indexOf(filterValue) === 0 });
  } private _filterStates4(value: string): State[] {
    const filterValue = value.toLowerCase();
    // setTimeout(() => {
      // alert("flase");
      this.var4 +=1;
      this.spinenable4 = false;
    // }, 1000);
    return this.states.filter(state => { return state.LoginId.toLowerCase().indexOf(filterValue) === 0 || state.Name.toLowerCase().indexOf(filterValue) === 0 });
  }



  ngOnInit() {

     

    this.filteredStates0 = this.stateCtrl.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates(state) : this.states.slice()));

    this.filteredStates1 = this.stateCtrl1.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates1(state) : this.states.slice()));

    this.filteredStates2 = this.stateCtrl2.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates2(state) : this.states.slice()));

    this.filteredStates3 = this.stateCtrl3.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates3(state) : this.states.slice()));

    this.filteredStates4 = this.stateCtrl4.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates4(state) : this.states.slice()));

    if (this.location.path() === '/admin/ticket') {
    }
    var user = JSON.parse(localStorage.getItem('user'));

    var userInfo = localStorage.getItem('auth');
    this.UserObject = JSON.parse(userInfo);

    //retriving users list inputs
    var usersListInputs = {

      "Authorization": "YWRtaW46YWRtaW4=",
      "roleName": this.UserObject.RoleName,
      "teamName": this.UserObject.TeamName,
    }

    //Retrivingall unAssigned  tickets list
    this.ticketsAssignServ.agentNamesList(usersListInputs).subscribe(res => {

      this.states = res.UserList;
    }, error => {
      console.log(error);

    })
    //for getting all ticksts count in panel headder
    this.retriveAllTicketsCount();

    this.retriveDocs(user);
    //on init ending 
  }

  spinner(){
    
    // alert("inside");
    if(this.var === 1)
    this.spinenable = true;
  }

  spinner01(){
    // alert("inside");
    this.spinenable = false;
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
  spinner2(){
    
    // alert("inside");
    if(this.var2 === 1)
    this.spinenable2 = true;
  }

  spinner21(){
    // alert("inside");
    this.spinenable2 = false;
  }
  spinner3(){
    
    // alert("inside");
    if(this.var3 === 1)
    this.spinenable3 = true;
  }

  spinner31(){
    // alert("inside");
    this.spinenable3 = false;
  }
  spinner4(){
    
    // alert("inside");
    if(this.var4 === 1)
    this.spinenable4 = true;
  }

  spinner41(){
    // alert("inside");
    this.spinenable4 = false;
  }

  sessionData(request){

    // this.noTicketsDiv = false;
    // this.loader = true;

    if(request.apiData === "Opened"){
      
      if(request.pageNumber === 1){
        this.unAssigned();
        // localStorage.removeItem('user');
      }
      else{
        this.unassfirst = request.pageNumber * this.pageSize - 1;
        this.ticketsAssignServ.tabName = "Open";
        this.unAssignedObject = [];
        this.showAss = false;
        this.noTicketsDiv = false;
        this.loader = true;
        // clear assigned task feilds  --> start
        this.disable1 = false;
        this.disable2 = false;
        this.disable3 = false;
        this.disable4 = false;
        this.disable5 = false;
        this.stateCtrl4.enable()
        this.stateCtrl1.enable()
        this.stateCtrl2.enable()
        this.stateCtrl3.enable()
        this.stateCtrl.enable()
        this.stateCtrl4.setValue('');
        this.stateCtrl1.setValue('');
        this.stateCtrl2.setValue('');
        this.stateCtrl3.setValue('');
        this.stateCtrl.setValue('');
        this.assignedToName1 = '';
        this.assignedToName4 = '';
        this.assignedToName3 = '';
        this.assignedToName2 = '';
        this.assignedToName5 = '';
        // -->end

        //checking condition wether search value is null or not if not null going to else block
        if (this.searchValue === "") {

          //retriving unAssigned tickets inputs
          var unAssignedTicketsInputs = {
            "currentStatus": "Opened",
            "category": this.UserObject.TeamName,
            "assignedTo": this.UserObject.LoginId,
            "roleName": this.UserObject.RoleName,
            "yourTasks": false,
            "searchKey": "",
            "pageNumber": request.pageNumber
          }

          var tabName =  "unassigned"
          this. storingStateValue(unAssignedTicketsInputs, tabName);
          //getting un assigned tickets from service
          this.ticketsAssignServ.allTicketsList(unAssignedTicketsInputs).subscribe(res => {
            // localStorage.removeItem('user');
            this.loader = false;
            if (res.List.length === 0) {
              this.unAssignedObject = [];
              this.unAssignedListLength = 0;
              this.noTicketsDiv = true;
            } else {
              this.unAssignedObject = res.List;
              this.unAssignedListLength = res.Total;
              this.noTicketsDiv = false;
            }

          }, error => {
            this.loader = true;
            this.noTicketsDiv = false;
            this.unAssignedObject = [];
            this.unAssignedListLength = 0;
            console.log(error);
          })

        } else {
          //retriving unAssigned tickets inputs
          var unAssignedTicketsInputs = {
            "currentStatus": "Opened",
            "category": this.UserObject.TeamName,
            "assignedTo": this.UserObject.LoginId,
            "roleName": this.UserObject.RoleName,
            "yourTasks": false,
            "searchKey": this.searchValue,
            "pageNumber": request.pageNumber
          }

          var tabName =  "unassigned"
          this. storingStateValue(unAssignedTicketsInputs, tabName);
          //getting un assigned tickets from service
          this.ticketsAssignServ.allTicketsList(unAssignedTicketsInputs).subscribe(res => {
            this.loader = false;
            // localStorage.removeItem('user');
            if (res.List.length === 0) {
              this.unAssignedObject = [];
              this.unAssignedListLength = 0;
              this.noTicketsDiv = true;
            } else {
              this.noTicketsDiv = false;
              this.unAssignedObject = res.List;
              this.unAssignedListLength = res.Total;
            }
          }, error => {
            console.log(error);
            this.loader = true;
            this.unAssignedObject = [];
            this.unAssignedListLength = 0;
          })
          //else closing block
        }

      }

    }else if(request.apiData === "youTasks"){
     
      if(request.pageNumber === 1){
        this.yourTaks();
        // localStorage.removeItem('user');
      }
      else{
        this.second = request.pageNumber * this.pageSize - 1;
        this.ticketsAssignServ.tabName = "Your Tasks";
        this.yourTasksObject = [];
        // this.yourtaksListLength = 0;
        this.noTicketsDiv = false;
        this.loader = true;
    
        //checking condition wether search value is null or not if not null going to else block
        if (this.searchValue === '') {
    
          //retriving yourTask tickets inputs
          var youTaskTicketsInputs = {
            "currentStatus": "youTasks",
            "category": this.UserObject.TeamName,
            "assignedTo": this.UserObject.LoginId,
            "roleName": this.UserObject.RoleName,
            "yourTasks": true,
            "searchKey": "",
            "pageNumber": request.pageNumber
          }
          var tabname = "yourtasks";
          this.storingStateValue(youTaskTicketsInputs,tabname);
          //getting un yourTask tickets from service
          this.ticketsAssignServ.allTicketsList(youTaskTicketsInputs).subscribe(res => {
            // localStorage.removeItem('user');
            this.loader = false;
            if (res.List.length === 0) {
              this.yourTasksObject = [];
              this.yourtaksListLength = 0;
              this.noTicketsDiv = true;
    
    
            } else {
              this.noTicketsDiv = false;
              this.yourTasksObject = res.List;
              this.yourtaksListLength = res.Total;
    
            }
    
          }, error => {
            this.yourTasksObject = [];
            this.yourtaksListLength = 0;
            this.noTicketsDiv = false;
            this.loader = true;
    
            console.log(error);
          })
    
        } else {
          this.noTicketsDiv = false;
          this.loader = true;
          //retriving Assigned tickets inputs
          var youTaskTicketsInputs = {
            "currentStatus": "youTasks",
            "category": this.UserObject.TeamName,
            "assignedTo": this.UserObject.LoginId,
            "roleName": this.UserObject.RoleName,
            "yourTasks": true,
            "searchKey": this.searchValue,
            "pageNumber": request.pageNumber
          }
          var tabname = "yourtasks";
          this.storingStateValue(youTaskTicketsInputs,tabname);
          //getting  assigned tickets from service
          this.ticketsAssignServ.allTicketsList(youTaskTicketsInputs).subscribe(res => {
            this.loader = false;
            // localStorage.removeItem('user');
            if (res.List.length === 0) {
              this.noTicketsDiv = true;
              this.yourTasksObject = [];
              this.yourtaksListLength = 0;
            } else {
              this.noTicketsDiv = false;
              this.yourTasksObject = res.List;
              this.yourtaksListLength = res.Total;
            }
          }, error => {
            this.yourTasksObject = [];
            this.yourtaksListLength = 0;
            this.loader = true;
            this.noTicketsDiv = false;
            console.log(error);
          })
          //else closing block
        }
      }

    }else if(request.apiData === "Escalated"){
      if(request.pageNumber === 1){
        this.escalated();
        // localStorage.removeItem('user');
      }
      else{
        this.escalfirst = request.pageNumber * this.pageSize - 1;
        this.ticketsAssignServ.tabName = "Escalated";
        this.escalatedObject = [];
        this.escalatedListLength = 0;
        this.noTicketsDiv = false;
        this.loader = true;
        // clear assigned task feilds  --> start
        this.disable1 = false;
        this.disable2 = false;
        this.disable3 = false;
        this.disable4 = false;
        this.disable5 = false;
        this.stateCtrl4.enable()
        this.stateCtrl1.enable()
        this.stateCtrl2.enable()
        this.stateCtrl3.enable()
        this.stateCtrl.enable()
        this.stateCtrl4.setValue('');
        this.stateCtrl1.setValue('');
        this.stateCtrl2.setValue('');
        this.stateCtrl3.setValue('');
        this.stateCtrl.setValue('');
        this.assignedToName1 = '';
        this.assignedToName4 = '';
        this.assignedToName3 = '';
        this.assignedToName2 = '';
        this.assignedToName5 = '';
        // -->end
        //checking condition wether search value is null or not if not null going to else block
        if (this.searchValue === "") {
    
          //retriving  escalated tickets inputs
          var escalatedTicketsInputs = {
            "currentStatus": "Escalated",
            "category": this.UserObject.TeamName,
            "assignedTo": this.UserObject.LoginId,
            "roleName": this.UserObject.RoleName,
            "yourTasks": false,
            "searchKey": "",
            "pageNumber": request.pageNumber
          }
    
          var tabName =  "escalated"
          this. storingStateValue(escalatedTicketsInputs, tabName);
          //getting un  escalated tickets from service
          this.ticketsAssignServ.allTicketsList(escalatedTicketsInputs).subscribe(res => {
            this.loader = false;
            // localStorage.removeItem('user');
            if (res.List.length === 0) {
              this.escalatedObject = [];
              this.escalatedListLength = 0;
              this.noTicketsDiv = true;
            } else {
              this.noTicketsDiv = false;
              this.escalatedObject = res.List;
              this.escalatedListLength = res.Total;
            }
          }, error => {
            this.escalatedObject = [];
            this.escalatedListLength = 0;
            this.loader = true;
            this.noTicketsDiv = false;
            console.log(error);
          })
    
        } else{
          this.escalatedObject = [];
          this.escalatedListLength = 0;
          this.noTicketsDiv = false;
          this.loader = true;
    
          //retriving  escalated tickets inputs
          var escalatedTicketsInputs = {
            "currentStatus": "Escalated",
            "category": this.UserObject.TeamName,
            "assignedTo": this.UserObject.LoginId,
            "roleName": this.UserObject.RoleName,
            "yourTasks": false,
            "searchKey": this.searchValue,
            "pageNumber": request.pageNumber
          }
    
          var tabName =  "escalated"
          this. storingStateValue(escalatedTicketsInputs, tabName);
          //getting   escalated tickets from service
          this.ticketsAssignServ.allTicketsList(escalatedTicketsInputs).subscribe(res => {
            this.loader = false;
            // localStorage.removeItem('user');
            if (res.List.length === 0) {
              this.noTicketsDiv = true;
              this.escalatedObject = [];
              this.escalatedListLength = 0;
            } else {
              this.noTicketsDiv = false;
              this.escalatedObject = res.List;
              this.escalatedListLength = res.Total;
            }
          }, error => {
            this.escalatedObject = [];
            this.escalatedListLength = 0;
            this.loader = true;
            this.noTicketsDiv = false;
            console.log(error);
          })
          //else closing block
        }
      }

    }else if(request.apiData === "Solved"){
      
      if(request.pageNumber === 1){
        this.solved();
        // localStorage.removeItem('user');
      }
      else{
        // request.page -=1;
        this.first = request.pageNumber * this.pageSize - 1;
        // this.solvedDocDetails(request);
        this.ticketsAssignServ.tabName = "Closed";
        this.resolvedTasksObject = [];

        this.noTicketsDiv = false;
        this.loader = true;

        //checking condition wether search value is null or not if not null going to else block
        if (this.searchValue === "") {

          //retriving solved tickets inputs
          var SolvedTicketsInputs = {
            "currentStatus": "Solved",
            "category": this.UserObject.TeamName,
            "assignedTo": this.UserObject.LoginId,
            "roleName": this.UserObject.RoleName,
            "yourTasks": false,
            "searchKey": "",
            "pageNumber": request.pageNumber
          }

          var tabName =  "solved"
          this. storingStateValue(SolvedTicketsInputs, tabName);
          //getting un Solved tickets from service
          this.ticketsAssignServ.allTicketsList(SolvedTicketsInputs).subscribe(res => {
            this.loader = false;
            // localStorage.removeItem('user');
            if (res.List.length === 0) {
              this.resolvedTasksObject = [];
              this.solvedTicketsLength = 0;
              this.noTicketsDiv = true;
            } else {
              this.noTicketsDiv = false;
              this.resolvedTasksObject = res.List;
              this.solvedTicketsLength = res.Total;
              // console.log(this.resolvedTasksObject)
            }

          }, error => {
            this.resolvedTasksObject = [];
            this.solvedTicketsLength = 0;
            this.loader = true;
            this.noTicketsDiv = false;
            console.log(error);
          })

        } else{
          this.noTicketsDiv = false;
          this.loader = true;

          //retriving Solved tickets inputs
          var SolvedTicketsInputs = {
            "currentStatus": "Solved",
            "category": this.UserObject.TeamName,
            "assignedTo": this.UserObject.LoginId,
            "roleName": this.UserObject.RoleName,
            "yourTasks": false,
            "searchKey": this.searchValue,
            "pageNumber": request.pageNumber
          }

          var tabName =  "solved"
          this. storingStateValue(SolvedTicketsInputs, tabName);
          //getting  solved tickets from service
          this.ticketsAssignServ.allTicketsList(SolvedTicketsInputs).subscribe(res => {
            this.loader = false;
            // localStorage.removeItem('user');
            if (res.List.length === 0) {
              this.resolvedTasksObject = [];
              this.solvedTicketsLength = 0;
              this.noTicketsDiv = true;

            } else {
              this.noTicketsDiv = false;
              this.resolvedTasksObject = res.List;
              this.solvedTicketsLength = res.Total;
            }
          }, error => {
            this.resolvedTasksObject = [];
            this.solvedTicketsLength = 0;
            this.loader = true;
            console.log(error);
          })
          //else closing block
        }
        //closing of inner else
        }

    }else if(request.apiData === "Assigned"){

      if(request.pageNumber === 1){
        this.assigned();
        // localStorage.removeItem('user');
      }
      else{
        this.assfirst = request.pageNumber * this.pageSize - 1;
        this.ticketsAssignServ.tabName = "Assigned";
        this.assignedObject = [];
        //this.assignedListLength = 0;
        this.noTicketsDiv = false;
        this.loader = true;
        // clear assigned task feilds  --> start
        this.disable1 = false;
        this.disable2 = false;
        this.disable3 = false;
        this.disable4 = false;
        this.disable5 = false;
        this.stateCtrl4.enable()
        this.stateCtrl1.enable()
        this.stateCtrl2.enable()
        this.stateCtrl3.enable()
        this.stateCtrl.enable()
        this.stateCtrl4.setValue('');
        this.stateCtrl1.setValue('');
        this.stateCtrl2.setValue('');
        this.stateCtrl3.setValue('');
        this.stateCtrl.setValue('');
        this.assignedToName1 = '';
        this.assignedToName4 = '';
        this.assignedToName3 = '';
        this.assignedToName2 = '';
        this.assignedToName5 = '';
        // -->end

        //checking condition wether search value is null or not if not null going to else block
        if (this.searchValue === "") {

          //retriving Assigned tickets inputs
          var AssignedTicketsInputs = {
            "currentStatus": "Assigned",
            "category": this.UserObject.TeamName,
            "assignedTo": this.UserObject.LoginId,
            "roleName": this.UserObject.RoleName,
            "yourTasks": false,
            "searchKey": "",
            "pageNumber": request.pageNumber
          }

          var tabName =  "assigned"
          this. storingStateValue(AssignedTicketsInputs, tabName);
          //getting un assigned tickets from service
          this.ticketsAssignServ.allTicketsList(AssignedTicketsInputs).subscribe(res => {
            this.loader = false;
            // localStorage.removeItem('user');
            if (res.List.length === 0) {
              this.assignedObject = [];
              this.assignedListLength = 0;
              this.noTicketsDiv = true;
            } else {
              this.noTicketsDiv = false;
              this.assignedObject = res.List;
              this.assignedListLength = res.Total;
            }

          }, error => {
            console.log(error);
            this.assignedObject = [];
            this.assignedListLength = 0;
            this.loader = true;
          })

        } else {
          this.noTicketsDiv = false;
          this.loader = true;
          //retriving Assigned tickets inputs
          var AssignedTicketsInputs = {
            "currentStatus": "Assigned",
            "category": this.UserObject.TeamName,
            "assignedTo": this.UserObject.LoginId,
            "roleName": this.UserObject.RoleName,
            "yourTasks": false,
            "searchKey": this.searchValue,
            "pageNumber": request.pageNumber
          }

          var tabName =  "assigned"
          this. storingStateValue(AssignedTicketsInputs, tabName);
          //getting  assigned tickets from service
          this.ticketsAssignServ.allTicketsList(AssignedTicketsInputs).subscribe(res => {
            this.loader = false;
            // localStorage.removeItem('user');
            if (res.List.length === 0) {
              this.assignedObject = [];
              this.assignedListLength = 0;
              this.noTicketsDiv = true;

            } else {
              this.noTicketsDiv = false;
              this.assignedObject = res.List;
              this.assignedListLength = res.Total;
            }
          }, error => {
            console.log(error);
            this.assignedObject = [];
            this.assignedListLength = 0;
            this.noTicketsDiv = false;
            this.loader = true;

          })
          //else closing block
        }

      }

    }
    // setTimeout(() => {
      // localStorage.removeItem('user');
    // }, 10000);
    
  }

  ngclassUnass(){
    this.showAss = false;
    if(this.currentStatus.currentTab === '' || this.currentStatus.currentTab === "unassigned"){
      this.showAss = false;
      this.showUnass = true;
      this.showYour = false;
      this.showEscal = false;
      this.showSolved = false;
      // console.log(this.showAss);
      this.opentab();
      return 'nav-link active';
    }else{      
      this.showUnass = false; 
      return 'nav-link'
    }
  }
  // && this.showEscal === false && this.showSolved === false && this.showYour === false && this.showAss === false
  ngclassAss(){
    
    if(this.currentStatus.currentTab === "assigned" && this.showUnass === false){
      this.showAss = true;
      this.showUnass = false;
      this.showYour = false;
      this.showEscal = false;
      this.showSolved = false;
      this.assignedtab();
      return 'nav-link active';
    }else{
      this.showAss = false;
      return 'nav-link'
    }
  }

  ngclassYour(){
    
    if(this.currentStatus.currentTab === "yourtasks" && this.showAssignedPanel ){
      this.showYour = true;
      this.showAss = false;
      this.showUnass = false;
      this.showEscal = false;
      this.showSolved = false;
      this.yourTaskstab();
      return 'nav-link active';
    }else if(!this.showAssignedPanel && this.currentStatus.currentTab === "yourtasks"){
      this.showYour = true;
      this.showAss = false;
      this.showUnass = false;
      this.showEscal = false;
      this.showSolved = false;
      this.yourTaskstab();
      return 'nav-link active';

    }else{
      this.showYour = false; 
      return 'nav-link';
    }
  }

  ngclassEscalated(){
    
    if(this.currentStatus.currentTab === "escalated"){
      this.showEscal = true;
      this.showAss = false;
      this.showUnass = false;
      this.showYour = false;
      this.showSolved = false;
      this.escalatedtab();
      return 'nav-link active';
    }else{
      this.showEscal = false; 
      return 'nav-link'
    }
  }

  ngclassSolved(){
    
    if(this.currentStatus.currentTab === "solved"){
      this.showSolved = true;
      this.showAss = false;
      this.showYour = false;
      this.showEscal = false;
      this.showUnass = false;

      this.closedtab();
      return 'nav-link active';
    }else{
      this.showSolved = false; 
      return 'nav-link'
    }
  }

  showyourTasks(){
    if(!this.showAssignedPanel && this.showEscal === false && this.showSolved === false && this.showYour === true){
      return 'tab-pane fade show active';
    }else if(this.showyourTasks  && this.currentStatus.currentTab === "yourtasks" ){
      return 'tab-pane fade show active';
    }else{
      return 'tab-pane fade'
    }
  }
  showAssinged(){
    if(this.showAss)
    return 'tab-pane fade show active';
    else
    return 'tab-pane fade';
  }
  storingStateValue(data, tabName){
    this.currentStatus.apiData = data.currentStatus;
    this.currentStatus.pageNumber = data.pageNumber;
    this.currentStatus.currentTab = tabName;
    localStorage.setItem('user', JSON.stringify(this.currentStatus));
    // console.log("storing ",this.currentStatus);
  }
    

  retriveAllTicketsCount() {
    var userInfo = localStorage.getItem('auth');
    this.UserObject = JSON.parse(userInfo);
    // console.log(this.UserObject)
    var retriveAllCounts = {
      "currentStatus": "Assigned",
      "category": this.UserObject.TeamName,
      "assignedTo": this.UserObject.LoginId,
      "roleName": this.UserObject.RoleName,
      "yourTasks": false,
      "searchKey": "",
      "pageNumber": 1
    }
    // console.log(this.UserObject.TeamName)
      //for getting all ticksts count in panel headder
      this.ticketsAssignServ.retriveAllCount(retriveAllCounts).subscribe(res => {
        // console.log("All tcikets Count",res);
        this.unAssignedListLength1 = res.OpenedCount;
        this.assignedListLength1 = res.AssignedCount;
        this.yourtaksListLength1 = res.YourTasksCount;
        this.escalatedListLength1 = res.EscalatedCount;
      this.solvedTicketsLength1 = res.SolvedCount;
      }, error => {
        console.log(error);
      })
  }

  opentab() {
    this.showAss = false;
    this.tab1 = true;
    this.tab2 = false;
    this.tab3 = false;
    this.tab4 = false;
    this.tab5 = false;
    return this.tab1;
  }
  assignedtab() {
    this.showAss = true;
    this.tab1 = false;
    this.tab2 = true;
    this.tab3 = false;
    this.tab4 = false;
    this.tab5 = false;
    return this.tab2;
  }
  yourTaskstab() {
    this.tab1 = false;
    this.tab2 = false;
    this.tab3 = true;
    this.tab4 = false;
    this.tab5 = false;
    return this.tab3;
  }
  escalatedtab() {
    this.tab1 = false;
    this.tab2 = false;
    this.tab3 = false;
    this.tab4 = true;
    this.tab5 = false;
    return this.tab4;
  }
  closedtab() {
    this.tab1 = false;
    this.tab2 = false;
    this.tab3 = false;
    this.tab4 = false;
    this.tab5 = true;
    return this.tab5;
  }

  retriveDocs(user) {

    //tickets assigning panel showing conditions
    if (this.UserObject.RoleName === 'Admin' || this.UserObject.RoleName === 'Super-Admin') {

      this.showAssignedPanel = true;
      //un assigned retrive function
      //this.yourTaks();
      if(!user)
      this.unAssigned()
      else
      this.sessionData(user);
      
    } else {
      if(!user)
      this.yourTaks();
      else
      this.sessionData(user);
    }

  }

  unAssigned() {
    // alert("un inside");
    this.showAss = false;
    this.ticketsAssignServ.tabName = "Open";
    this.stateCtrl.setValue('');
    this.stateCtrl1.setValue('');
    this.stateCtrl2.setValue('');
    this.stateCtrl3.setValue('');
    this.stateCtrl4.setValue('');
    this.assignedToName5 = '';
    this.assignedToName4 = '';
    this.assignedToName3 = '';
    this.assignedToName2 = '';
    this.assignedToName1 = '';
    this.stateCtrl1.enable()
    this.stateCtrl.enable()
    this.stateCtrl2.enable()
    this.stateCtrl3.enable()
    this.stateCtrl4.enable()
    this.disable1 = false;
    this.disable2 = false;
    this.disable3 = false;
    this.disable4 = false;
    this.disable5 = false;
    this.escalatedObject = [];
    this.assignedObject = [];
    this.unAssignedObject = [];
    this.yourTasksObject = [];
    this.resolvedTasksObject = [];
    this.noTicketsDiv = false;
    // this.unAssignedObject =[];
    this.unAssignedListLength = 0;
    this.loader = true;

    this.searchValueState = 'unAssigned';

    //retriving users list inputs
    var usersListInputs = {

      "Authorization": "YWRtaW46YWRtaW4=",
      "roleName": this.UserObject.RoleName,
      "teamName": this.UserObject.TeamName,
    }

    //Retrivingall unAssigned  tickets list
    this.ticketsAssignServ.agentNamesList(usersListInputs).subscribe(res => {
      this.states = res.UserList;
    }, error => {
      console.log(error);
    })

    //checking wether serach value is null or not if null  then executing if without serach value
    if (this.searchValue === "") {

      //retriving unAssigned tickets inputs
      var unAssignedTicketsInputs = {
        "currentStatus": "Opened",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": "",
        "pageNumber": 1,

      }
      var tabName =  "unassigned"
      this. storingStateValue(unAssignedTicketsInputs, tabName);
      //Retrivingall unAssigned  tickets list
      this.ticketsAssignServ.allTicketsList(unAssignedTicketsInputs).subscribe(res => {

        this.loader = false;
        this.noTicketsDiv = false;

        if (res.List.length <= 0) {
          this.unAssignedObject = [];
          this.unAssignedListLength = 0;
          this.noTicketsDiv = true;

        }
        else {
          this.noTicketsDiv = false;
          this.unAssignedObject = res.List;
          // console.log(this.unAssignedObject);
          this.unAssignedListLength = res.Total;
        }

      }, error => {
        console.log(error);
        this.unAssignedObject = [];
        this.unAssignedListLength = 0;
        this.noTicketsDiv = false;
        this.loader = true;
      })

    } else{
      this.noTicketsDiv = false;
      this.unAssignedObject = [];
      this.unAssignedListLength = 0;
      //retriving unAssigned tickets inputs
      var unAssignedTicketsInputs = {
        "currentStatus": "Opened",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": this.searchValue,
        "pageNumber": 1
      }

      var tabName =  "unassigned"
      this. storingStateValue(unAssignedTicketsInputs, tabName);
      //Retrivingall unAssigned  tickets list
      this.ticketsAssignServ.allTicketsList(unAssignedTicketsInputs).subscribe(res => {

        this.loader = false;
        if (res.List.length <= 0) {
          this.unAssignedObject = [];
          this.unAssignedListLength = 0;
          this.noTicketsDiv = true;

        }
        else {
          this.unAssignedObject = res.List;
          this.unAssignedListLength = res.Total;
          this.noTicketsDiv = false;
        }
      }, error => {
        console.log(error);
        this.loader = false;
        this.unAssignedObject = [];
        this.unAssignedListLength = 0;
      })

    }
    
    //closing of un assigned 
  }

  // loading unAssigned tickets after assigning
  reloadUnassignedTickets() {
    this.noTicketsDiv = false;
    this.unAssignedObject = [];
    this.unAssignedListLength = 0;
    this.loader = true;

    //retriving users list inputs
    var usersListInputs = {

      "Authorization": "YWRtaW46YWRtaW4=",
      "roleName": this.UserObject.RoleName,
      "teamName": this.UserObject.TeamName,
    }

    //Retrivingall unAssigned  tickets list
    this.ticketsAssignServ.agentNamesList(usersListInputs).subscribe(res => {
      this.states = res.UserList;
    }, error => {
      console.log(error);
    })

    //retriving unAssigned tickets 
    var unAssignedTickets = {
      "currentStatus": "Opened",
      "category": this.UserObject.TeamName,
      "assignedTo": this.UserObject.LoginId,
      "roleName": this.UserObject.RoleName,
      "yourTasks": false,
      "pageNumber": 1
    }

    var tabName =  "unassigned"
    this. storingStateValue(unAssignedTickets, tabName);
    //Retrivingall unAssigned  tickets list
    this.ticketsAssignServ.allTicketsList(unAssignedTickets).subscribe(res => {

      this.loader = false;
      if (res.List.length <= 0) {
        this.unAssignedObject = [];
        this.unAssignedListLength = 0;
        this.noTicketsDiv = true;
      }
      else {
        this.noTicketsDiv = false;
        this.unAssignedObject = res.List;
        this.unAssignedListLength = res.Total;
      }
    }, error => {
      this.loader = true;
      console.log(error);
      this.unAssignedObject = [];
      this.unAssignedListLength = 0;
    })
   
  }


  editTicketDeatilsassigned(e) {

    this.assignId = e.id;
    this.severityStatus = e.adminSeverity;
    this.subCatNotific = e.subCategory;
    let data =
    {
      "id": this.assignId,
      "assignedToName": this.assignedfullname,
      "assignedTo": this.option1,
      "assignedBy": this.UserLoginId,
      "assignedByName": this.fullName,
      "adminSeverity": this.severityStatus
    }

    this.ticketsAssignServ.assigntask(data).subscribe((res) => {
      this.stateCtrl.setValue('');
      this.stateCtrl1.setValue('');
      this.stateCtrl2.setValue('');
      this.stateCtrl3.setValue('');
      this.stateCtrl4.setValue('');
      this.assignedToName5 = '';
      this.assignedToName4 = '';
      this.assignedToName3 = '';
      this.assignedToName2 = '';
      this.assignedToName1 = '';
      this.stateCtrl1.enable()
      this.stateCtrl.enable()
      this.stateCtrl2.enable()
      this.stateCtrl3.enable()
      this.stateCtrl4.enable()
      this.disable1 = false;
      this.disable2 = false;
      this.disable3 = false;
      this.disable4 = false;
      this.disable5 = false;
      $('#exampleModal-100').modal('show');

      setTimeout(() => {
        $('#exampleModal-100').modal('hide');
      }, 3000)
      // this.unAssigned();
      // this.assigned();

      //  this.loader = true;


      this.loader = true;
      this.assignedObject = [];
      var assignedTicketsInputs = {
        "currentStatus": "Assigned",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": "",
        "pageNumber": 1

      }
      //Retrivingall assigned tickets list
      this.ticketsAssignServ.allTicketsList(assignedTicketsInputs).subscribe(res => {
        // console.log("Assigned Tickets:",res);
        this.loader = false;

        if (res.List.length <= 0) {
          this.assignedObject = [];
          this.assignedListLength = 0;
          this.noTicketsDiv = true;


        }
        else {
          this.noTicketsDiv = false;
          this.assignedObject = res.List;
          this.assignedListLength = res.Total;
        }
      }, error => {
        console.log(error);
        this.loader = true;
        this.noTicketsDiv = false;
        this.assignedObject = [];
        this.assignedListLength = 0;
      })




    }, (error) => {
      console.log(error);
    })

  }







  //  function to get individual ticket data on click assign function
  editTicketDeatils(e) {

    this.assignId = e.id;
    this.severityStatus = e.adminSeverity;
    let data =
    {
      "id": this.assignId,
      "assignedToName": this.assignedfullname,
      "assignedTo": this.option1,
      "assignedBy": this.UserLoginId,
      "assignedByName": this.fullName,
      "adminSeverity": this.severityStatus
    }

    this.ticketsAssignServ.assigntask(data).subscribe((res) => {
      this.stateCtrl.setValue('');
      this.stateCtrl1.setValue('');
      this.stateCtrl2.setValue('');
      this.stateCtrl3.setValue('');
      this.stateCtrl4.setValue('');
      this.assignedToName5 = '';
      this.assignedToName4 = '';
      this.assignedToName3 = '';
      this.assignedToName2 = '';
      this.assignedToName1 = '';
      this.stateCtrl1.enable()
      this.stateCtrl.enable()
      this.stateCtrl2.enable()
      this.stateCtrl3.enable()
      this.stateCtrl4.enable()
      this.disable1 = false;
      this.disable2 = false;
      this.disable3 = false;
      this.disable4 = false;
      this.disable5 = false;
      $('#exampleModal-100').modal('show');

      setTimeout(() => {
        $('#exampleModal-100').modal('hide');
      }, 3000)

      this.loader = true;
      // this.loader = true;
      this.escalatedObject = [];
      //retriving escalated tickets inputs
      var escalatedTicketsInputs = {
        "currentStatus": "Escalated",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": "",
        "pageNumber": 1
      }

      //Retrivingall escalated tickets list
      this.ticketsAssignServ.allTicketsList(escalatedTicketsInputs).subscribe(res => {

        this.loader = false;

        if (res.List.length === 0) {

          this.escalatedObject = [];
          this.escalatedListLength = 0; // r
          this.noTicketsDiv = true;
        }
        else {
          this.noTicketsDiv = false;
          this.escalatedObject = res.List;
          this.escalatedListLength = res.Total;
        }
      }, error => {
        this.loader = true;
        console.log(error);
        this.escalatedObject = [];
        this.escalatedListLength = 0; // r
      })




    }, (error) => {
      console.log(error);
    })

  }
  //Asign to function 

  getslatest(e) {
    //let a = e.reverse();
    if (e.length > 0) {
      return e[0].statusComments;
    } else {
      return '--';
    }

  }

  editTicketDeatils1(e, i) {

    this.assignId = e.id;
    this.tackingId = e.trackingId;
    this.subCatNotific = e;

    if (i === 0) {
      if (this.severityValue === '') {
        this.selectSeverityerror = true;

      }
      else {
        this.selectSeverityerror = false;
        this.severityStatus = this.severityValue;
        this.assign();

      }

    }
    if (i === 1) {
      if (this.severityValue1 === '') {
        this.selectSeverityerror1 = true;

      }
      else {
        this.selectSeverityerror1 = false;
        this.severityStatus = this.severityValue1;
        this.assign();

      }

    }
    if (i === 2) {
      if (this.severityValue2 === '') {
        this.selectSeverityerror2 = true;

      }
      else {
        this.selectSeverityerror2 = false;
        this.severityStatus = this.severityValue2;
        this.assign();

      }

    }
    if (i === 3) {
      if (this.severityValue3 === '') {
        this.selectSeverityerror3 = true;

      }
      else {
        this.selectSeverityerror3 = false;
        this.severityStatus = this.severityValue3;
        this.assign();

      }

    }
    if (i === 4) {
      if (this.severityValue4 === '') {
        this.selectSeverityerror4 = true;

      }
      else {
        this.selectSeverityerror4 = false;
        this.severityStatus = this.severityValue4;
        this.assign();

      }

    }

  }


  assign() {
    $('#exampleModal-100').modal('show');
    this.stateCtrl.setValue('');
    this.stateCtrl1.setValue('');
    this.stateCtrl2.setValue('');
    this.stateCtrl3.setValue('');
    this.stateCtrl4.setValue('');
    this.assignedToName5 = '';
    this.assignedToName4 = '';
    this.assignedToName3 = '';
    this.assignedToName2 = '';
    this.assignedToName1 = '';
    this.stateCtrl1.enable()
    this.stateCtrl.enable()
    this.stateCtrl2.enable()
    this.stateCtrl3.enable()
    this.stateCtrl4.enable()
    this.disable1 = false;
    this.disable2 = false;
    this.disable3 = false;
    this.disable4 = false;
    this.disable5 = false;
    //retriving users list inputs
    var usersListInputs = {

      "Authorization": "YWRtaW46YWRtaW4=",
      "roleName": this.UserObject.RoleName,
      "teamName": this.UserObject.TeamName,
    }

    //Retrivingall unAssigned  tickets list
    this.ticketsAssignServ.agentNamesList(usersListInputs).subscribe(res => {

      this.states = res.UserList;
    }, error => {
      console.log(error);

    })
    let data =
    {
      "id": this.assignId,
      "assignedToName": this.assignedfullname,
      "assignedTo": this.option1,
      "assignedBy": this.UserLoginId,
      "assignedByName": this.fullName,
      "adminSeverity": this.severityStatus,
      "assignedToDepartment": this.assignedToDetails.Department,
      "assignedToTitleType": this.assignedToDetails.Designation,
      "assignedToLocation": this.assignedToDetails.Location,
      "assignedToWorkPhone": this.assignedToDetails.WorkPhoneNo
    }


    this.ticketsAssignServ.assigntask(data).subscribe((res) => {

      //sending notifications 

      //for notifications sending
      let input = {
        "purpose": "Assigned",
        "id": res.id
      }


      this.sendNotification(input, res);

      this.stateCtrl.setValue('');
      this.stateCtrl1.setValue('');
      this.stateCtrl2.setValue('');
      this.stateCtrl3.setValue('');
      this.stateCtrl4.setValue('');
      this.assignedToName5 = '';
      this.assignedToName4 = '';
      this.assignedToName3 = '';
      this.assignedToName2 = '';
      this.assignedToName1 = '';
      this.stateCtrl1.enable()
      this.stateCtrl.enable()
      this.stateCtrl2.enable()
      this.stateCtrl3.enable()
      this.stateCtrl4.enable()
      this.disable1 = false;
      this.disable2 = false;
      this.disable3 = false;
      this.disable4 = false;
      this.disable5 = false;
      this.severityStatus = '';
      this.severityValue = '';
      this.severityValue1 = '';
      this.severityValue2 = '';
      this.severityValue3 = '';
      this.severityValue4 = '';
      this.selectSeverityerror = false;
      this.selectSeverityerror1 = false;
      this.selectSeverityerror2 = false;
      this.selectSeverityerror3 = false;
      this.selectSeverityerror4 = false;
      // this.loader = true;
      $('#exampleModal-100').modal('hide');
      //  for unassign 
      var unAssignedTicketsInputs = {
        "currentStatus": "Opened",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": "",
        "pageNumber": 1,

      }
      
      var tabName =  "unassigned"
      this. storingStateValue(unAssignedTicketsInputs, tabName);

      //Retrivingall unAssigned  tickets list
      this.ticketsAssignServ.allTicketsList(unAssignedTicketsInputs).subscribe(res => {

        // this.loader = false;
        this.noTicketsDiv = false;

        if (res.List.length <= 0) {
          this.unAssignedObject = [];
          this.unAssignedListLength = 0;
          this.noTicketsDiv = true;

        }
        else {
          this.noTicketsDiv = false;
          this.unAssignedObject = res.List;
          this.unAssignedListLength = res.Total;
        }
        this.retriveAllTicketsCount();

      }, error => {
        console.log(error);
        this.unAssignedObject = [];
        this.unAssignedListLength = 0;
        this.noTicketsDiv = false;
        this.loader = true;

      })

      // this.unAssigned();
      // this.assigned();
      // this.escalated();
    }, (error) => {
      console.log(error);
    })
 

  }
  // closed assinging to function  

  convertToLocalDate(date) {


    var newstr = date.replace(" ", "T");

    let d = new Date(newstr);


    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var reqFormat = monthNames[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " GMT-0500"

    var now = new Date(reqFormat);
    var localDateTime = new Date(now.toUTCString());



    return localDateTime;
  }


  //sending notifications 
  sendNotification(data, docData) {

    this.notification.getTokens(data).subscribe(res => {
      var listOfTokens = res.TokenList.AgentTokenList;
      //@apeddi has assigned a ticket(<Ticket ID>) to you on category(<category>)
      var notificationBody = '@ ' + docData.assignedBy + ' has assigned your ticket ' + this.tackingId + ' to you on category ' + this.subCatNotific.subCategory;
      //agent list of tokens
      if (listOfTokens.length > 0) {
        for (var i = 0; i < listOfTokens.length; i++) {
          this.listOftoken.push(listOfTokens[i].fcmToken);
        }
        //sending notification to user 
        this.sendNotifications(this.listOftoken, notificationBody);
      }
      //@apeddi has assigned your ticket(<Ticket ID>) to @skatta
      //user list of tokens
      var agentNotificationBody = '@ ' + docData.assignedBy + ' has assigned your ticket ' + this.tackingId + ' to ' + docData.assignedTo;
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


  //sending notification
  sendNotifications(listOfTokens, docData) {
    let inputs = {
      'listOfTokens': listOfTokens,
      'docData': docData,
      'route': '/admin/assign'
    }

    this.fcmNotifications.sendMessage(inputs);

  }


  //assigned reriving function
  assigned() {
    this.showAss = true;
    this.ticketsAssignServ.tabName = "Assigned";
    this.stateCtrl.setValue('');
    this.stateCtrl1.setValue('');
    this.stateCtrl2.setValue('');
    this.stateCtrl3.setValue('');
    this.stateCtrl4.setValue('');
    this.assignedToName5 = '';
    this.assignedToName4 = '';
    this.assignedToName3 = '';
    this.assignedToName2 = '';
    this.assignedToName1 = '';
    this.stateCtrl1.enable()
    this.stateCtrl.enable()
    this.stateCtrl2.enable()
    this.stateCtrl3.enable()
    this.stateCtrl4.enable()
    this.disable1 = false;
    this.disable2 = false;
    this.disable3 = false;
    this.disable4 = false;
    this.disable5 = false;
    //retriving users list inputs
    var usersListInputs = {

      "Authorization": "YWRtaW46YWRtaW4=",
      "roleName": this.UserObject.RoleName,
      "teamName": this.UserObject.TeamName,
    }

    //Retrivingall unAssigned  tickets list
    this.ticketsAssignServ.agentNamesList(usersListInputs).subscribe(res => {
      this.states = res.UserList;
    }, error => {
      console.log(error);
    })

    this.escalatedObject = [];
    this.assignedObject = [];
    this.unAssignedObject = [];
    this.yourTasksObject = [];
    this.resolvedTasksObject = [];
    this.assignedListLength = 0;
    this.searchValueState = 'assigned';
    this.noTicketsDiv = false;
    this.loader = true;
    // alert(this.searchValue)
    //checking wether serach value is null or not if null  then executing if without serach value
    if (this.searchValue === '') {
      //retriving assigned tickets inputs
      var assignedTicketsInputs = {
        "currentStatus": "Assigned",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": "",
        "pageNumber": 1
      }

      
      var tabName =  "assigned"
      this. storingStateValue(assignedTicketsInputs, tabName);
      //Retrivingall assigned tickets list
      this.ticketsAssignServ.allTicketsList(assignedTicketsInputs).subscribe(res => {

        this.loader = false;
        // console.log("Assigned Tickets:",res);
        if (res.List.length <= 0) {
          this.assignedObject = [];
          this.assignedListLength = 0;
          this.noTicketsDiv = true;


        }
        else {
          this.noTicketsDiv = false;
          this.assignedObject = res.List;
          this.assignedListLength = res.Total;
        }
      }, error => {
        console.log(error);
        this.loader = true;
        this.noTicketsDiv = false;
        this.assignedObject = [];
        this.assignedListLength = 0;
      })


    } else {
      this.noTicketsDiv = false;
      this.loader = true;
      //retriving assigned tickets inputs
      var assignedTicketsInputs = {
        "currentStatus": "Assigned",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": this.searchValue,
        "pageNumber": 1

      }
      
      var tabName =  "assigned"
      this. storingStateValue(assignedTicketsInputs, tabName);
      //Retrivingall assigned tickets list
      this.ticketsAssignServ.allTicketsList(assignedTicketsInputs).subscribe(res => {

        this.loader = false;
        // console.log("Assigned Tickets:",res);
        if (res.List.length <= 0) {
          this.assignedObject = [];
          this.assignedListLength = 0;
          this.noTicketsDiv = true;
        }
        else {
          this.noTicketsDiv = false;
          this.assignedObject = res.List;
          this.assignedListLength = res.Total;
        }
      }, error => {
        console.log(error);
        this.loader = true;
        this.assignedObject = [];
        this.assignedListLength = 0;
      })


    }
  
    //closing of assigned 
  }


  //escalated reriving function
  escalated() {
    // alert("inside");
    this.ticketsAssignServ.tabName = "Escalated";
    this.stateCtrl.setValue('');
    this.stateCtrl1.setValue('');
    this.stateCtrl2.setValue('');
    this.stateCtrl3.setValue('');
    this.stateCtrl4.setValue('');
    this.assignedToName5 = '';
    this.assignedToName4 = '';
    this.assignedToName3 = '';
    this.assignedToName2 = '';
    this.assignedToName1 = '';
    this.stateCtrl1.enable()
    this.stateCtrl.enable()
    this.stateCtrl2.enable()
    this.stateCtrl3.enable()
    this.stateCtrl4.enable()
    this.disable1 = false;
    this.disable2 = false;
    this.disable3 = false;
    this.disable4 = false;
    this.disable5 = false;
    //retriving users list inputs
    var usersListInputs = {

      "Authorization": "YWRtaW46YWRtaW4=",
      "roleName": this.UserObject.RoleName,
      "teamName": this.UserObject.TeamName,
    }

    //Retrivingall unAssigned  tickets list
    this.ticketsAssignServ.agentNamesList(usersListInputs).subscribe(res => {
      this.states = res.UserList;
    }, error => {
      console.log(error);
    })

    this.escalatedObject = [];
    this.assignedObject = [];
    this.unAssignedObject = [];
    this.yourTasksObject = [];
    this.resolvedTasksObject = [];
    this.escalatedListLength = 0;
    this.noTicketsDiv = false;
    this.searchValueState = 'escalated';
    this.loader = true;
    //checking wether serach value is null or not if null  then executing if without serach value
    if (this.searchValue === "") {
      //retriving escalated tickets inputs
      var escalatedTicketsInputs = {
        "currentStatus": "Escalated",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": "",
        "pageNumber": 1
      }

      var tabName =  "escalated"
      this. storingStateValue(escalatedTicketsInputs, tabName);
      //Retrivingall escalated tickets list
      this.ticketsAssignServ.allTicketsList(escalatedTicketsInputs).subscribe(res => {
      
        this.loader = false;

        if (res.List.length <= 0) {
          this.escalatedObject = [];
          this.escalatedListLength = 0; // r
          this.noTicketsDiv = true;
        }
        else {

          this.noTicketsDiv = false;
          this.escalatedObject = res.List;
          this.escalatedListLength = res.Total;
          // console.log(this.escalatedObject);
          // alert("inside 2");
        }
      }, error => {
        this.loader = true;
        console.log(error);
        this.escalatedObject = [];
        this.escalatedListLength = 0; // r
      })

    } else {
      this.noTicketsDiv = false;
      this.loader = true;

      //retriving escalated tickets inputs
      var escalatedTicketsInputs = {
        "currentStatus": "Escalated",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": this.searchValue,
        "pageNumber": 1
      }

      var tabName =  "escalated"
      this. storingStateValue(escalatedTicketsInputs, tabName);
      //Retrivingall escalated tickets list
      this.ticketsAssignServ.allTicketsList(escalatedTicketsInputs).subscribe(res => {
        this.loader = false;

        if (res.List.length <= 0) {
          this.escalatedObject = [];
          this.escalatedListLength = 0;
          this.noTicketsDiv = true;
        }
        else {
          this.noTicketsDiv = false;
          this.escalatedObject = res.List;
          this.escalatedListLength = res.Total;
        }
      }, error => {
        console.log(error);
        this.loader = true;
        this.escalatedObject = [];
        this.escalatedListLength = 0;
      })

    }
  
    //closing of escalated 
  }


  //your tasks reriving function
  yourTaks() {

    this.ticketsAssignServ.tabName = "Your Tasks"
    this.escalatedObject = [];
    this.assignedObject = [];
    this.unAssignedObject = [];
    this.yourTasksObject = [];
    this.resolvedTasksObject = [];
    this.yourtaksListLength = 0;
    this.noTicketsDiv = false;
    this.searchValueState = 'yourTask';
    this.loader = true;
    //checking wether serach value is null or not if null  then executing if without serach value
    if (this.searchValue === "") {
      //retriving your tasks tickets inputs
      var yourTicketsInputs = {
        "currentStatus": "youTasks",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": true,
        "searchKey": "",
        "pageNumber": 1
      }
      var tabName =  "yourtasks"
      this. storingStateValue(yourTicketsInputs, tabName);

      //youtasks  tickets list
      this.ticketsAssignServ.allTicketsList(yourTicketsInputs).subscribe(res => {
        this.loader = false;

        if (res.List.length <= 0) {
          this.yourTasksObject = [];
          this.yourtaksListLength = 0;
          this.noTicketsDiv = true;

        }
        else {

          this.yourTasksObject = res.List;
          this.yourtaksListLength = res.Total;
          this.noTicketsDiv = false;
          // this.hide = false;

        }
      }, error => {
        console.log(error);
        this.loader = true;
        this.yourTasksObject = [];
        this.yourtaksListLength = 0;
      })


    } else{
      this.noTicketsDiv = false;

      //retriving your tasks tickets inputs
      this.loader = true;
      var yourTicketsInputs = {
        "currentStatus": "youTasks",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": true,
        "searchKey": this.searchValue,
        "pageNumber": 1
      }

      var tabName =  "yourtasks"
      this. storingStateValue(yourTicketsInputs, tabName);
      //youtasks  tickets list
      this.ticketsAssignServ.allTicketsList(yourTicketsInputs).subscribe(res => {

        this.loader = false;
        if (res.List.length <= 0) {
          this.yourTasksObject = [];
          this.yourtaksListLength = 0;
          this.noTicketsDiv = true;
        }
        else {
          this.noTicketsDiv = false;
          this.yourTasksObject = res.List;
          this.yourtaksListLength = res.Total;
        }
      }, error => {
        console.log(error);
        this.loader = true;
        this.yourTasksObject = [];
        this.yourtaksListLength = 0;
      })
    }
  
    //closing of your tasks  
  }


  //solved tasks reriving function
  solved() {
    // alert("inside");
    this.ticketsAssignServ.tabName = "Closed";
    this.noTicketsDiv = false;
    this.solvedTicketsLength = 0;
    this.escalatedObject = [];
    this.assignedObject = [];
    this.unAssignedObject = [];
    this.yourTasksObject = [];
    this.resolvedTasksObject = [];
    this.searchValueState = 'solved';
    this.loader = true;
    
    //checking wether serach value is null or not if null  then executing if without serach value
    if (this.searchValue === "") {
      //tickets solved tasks tickets inputs
      var yourTicketsInputs = {
        "currentStatus": "Solved",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": "",
        "pageNumber": 1
      }
      var tabName =  "solved"
      this. storingStateValue(yourTicketsInputs, tabName);
       //tickets solved tickets list
      this.ticketsAssignServ.allTicketsList(yourTicketsInputs).subscribe(res => {
        this.loader = false;
        if (res.List.length <= 0) {
          this.solvedTicketsLength = 0;
          this.resolvedTasksObject = [];
          this.noTicketsDiv = true;
        }
        else {
          this.noTicketsDiv = false;
          this.resolvedTasksObject = res.List;
          this.solvedTicketsLength = res.Total;
          // console.log("resolved:", this.resolvedTasksObject)

        }
      }, error => {
        console.log(error);
        this.loader = true;
        this.solvedTicketsLength = 0;
        this.resolvedTasksObject = [];
      })
      // console.log(this.resolvedTasksObject)
    } else {

      //tickets solved tasks tickets inputs
      this.noTicketsDiv = false;
      this.solvedTicketsLength = 0;
      this.resolvedTasksObject = [];
      this.loader = true;
      var yourTicketsInputs = {
        "currentStatus": "Solved",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": this.searchValue,
        "pageNumber": 1
      }
      var tabName =  "solved"
      this. storingStateValue(yourTicketsInputs, tabName);
      //tickets solved tickets list
      this.ticketsAssignServ.allTicketsList(yourTicketsInputs).subscribe(res => {
        this.loader = false;

        if (res.List.length <= 0) {
          this.resolvedTasksObject = [];
          this.solvedTicketsLength = 0;
          this.noTicketsDiv = true;
        }
        else {
          this.noTicketsDiv = false;
          this.resolvedTasksObject = res.List;
          this.solvedTicketsLength = res.Total;
        }
      }, error => {
        this.loader = true;
        console.log(error);
        this.resolvedTasksObject = [];
        this.solvedTicketsLength = 0;
      })

    }

    //solved tasks reriving ending function
  }


  // Full name substring function
  stringSubstring(response) {
    let Response: string = response;
    if (Response.length > 20) {
      return Response.substring(0, 20) + "...";
    } else {
      return Response;
    }
  }

  // Full name substring function
  idStringSubstring(response) {
    let Response: string = response;
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
      data = 'badge badge-warning';
    } else if (value == 'In progress') {
      data = 'badge badge-warning';
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


    //return badges css status
  ngClassForIcons1(value) {
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

  // function that returns full name of the    taskassigned to name
  assignedName(name) {

    for (let i = 0; i < this.states.length; i++) {
      if (name === this.states[i].LoginId) {
        return this.states[i].Name;
      }

    }
  }

  assignedToPerson(name) {
    for (let i = 0; i < this.states.length; i++) {
      if (name === this.states[i].LoginId) {
        return this.states[i];
      }

    }
  }

  splitTiming(timing,location){
    // timing = "4:00AM - 6:00PM";
    let finalTime='';
    if(timing != -1 && timing !="" ){
      let temp = timing.split("");
      temp.forEach(ele=>{
          if(ele === 'A' || ele === 'P'){
              finalTime += " " + ele;
          }
          else{
              finalTime += ele;
          }
      });
      // console.log(finalTime+" IST");
      if(location === "Atlanta" || location === "Bentonville" || location === "Cincinnati" || location === "US - Other" || location === "HQ(Novi)")  
        finalTime += ' EST';
      else  
        finalTime += ' IST';
        
      return finalTime;
    }else
      return timing;
  }

  //chips funcationality 
  selected(event: MatAutocompleteSelectedEvent, i): void {
    this.spinenable = false;
    if (i === 0) {

      this.stateCtrl.disable()
      this.stateCtrl1.setValue('');
      this.stateCtrl2.setValue('');
      this.stateCtrl3.setValue('');
      this.stateCtrl4.setValue('');
      this.assignedToName5 = '';
      this.assignedToName4 = '';
      this.assignedToName3 = '';
      this.assignedToName2 = '';
      this.stateCtrl1.enable()
      this.stateCtrl2.enable()
      this.stateCtrl3.enable()
      this.stateCtrl4.enable()
      this.option1 = event.option.value;
      this.disable1 = true;
      this.disable2 = false;
      this.disable3 = false;
      this.disable4 = false;
      this.disable5 = false;
      this.selectSeverityerror = false;
      this.selectSeverityerror1 = false;
      this.selectSeverityerror2 = false;
      this.selectSeverityerror3 = false;
      this.selectSeverityerror4 = false;
      this.assignedfullname = this.assignedName(this.option1);
      this.assignedToDetails = this.assignedToPerson(this.option1);
    } else if (i === 1) {
      this.stateCtrl1.disable()
      this.stateCtrl.enable()
      this.stateCtrl2.enable()
      this.stateCtrl3.enable()
      this.stateCtrl4.enable()
      this.stateCtrl.setValue('');
      this.stateCtrl2.setValue('');
      this.stateCtrl3.setValue('');
      this.stateCtrl4.setValue('');
      this.assignedToName5 = '';
      this.assignedToName4 = '';
      this.assignedToName3 = '';
      this.assignedToName1 = '';
      this.selectSeverityerror = false;
      this.selectSeverityerror1 = false;
      this.selectSeverityerror2 = false;
      this.selectSeverityerror3 = false;
      this.selectSeverityerror4 = false;
      this.option1 = event.option.value;

      this.disable1 = false;
      this.disable2 = true;
      this.disable3 = false;
      this.disable4 = false;
      this.disable5 = false;


      this.assignedfullname = this.assignedName(this.option1);
      this.assignedToDetails = this.assignedToPerson(this.option1);
    } else if (i === 2) {
      this.option1 = event.option.value;
      this.stateCtrl2.disable()
      this.stateCtrl1.enable()
      this.stateCtrl.enable()
      this.stateCtrl3.enable()
      this.stateCtrl4.enable()
      this.stateCtrl.setValue('');
      this.stateCtrl1.setValue('');
      this.stateCtrl3.setValue('');
      this.stateCtrl4.setValue('');
      this.assignedToName5 = '';
      this.assignedToName4 = '';
      this.assignedToName1 = '';
      this.assignedToName2 = '';
      this.disable1 = false;
      this.disable2 = false;
      this.disable3 = true;
      this.disable4 = false;
      this.disable5 = false;
      this.selectSeverityerror = false;
      this.selectSeverityerror1 = false;
      this.selectSeverityerror2 = false;
      this.selectSeverityerror3 = false;
      this.selectSeverityerror4 = false;
      this.assignedfullname = this.assignedName(this.option1);
      this.assignedToDetails = this.assignedToPerson(this.option1);
    } else if (i === 3) {
      this.option1 = event.option.value;
      this.stateCtrl3.disable()
      this.stateCtrl1.enable()
      this.stateCtrl2.enable()
      this.stateCtrl.enable()
      this.stateCtrl4.enable()
      this.stateCtrl.setValue('');
      this.stateCtrl2.setValue('');
      this.stateCtrl1.setValue('');
      this.stateCtrl4.setValue('');
      this.assignedToName5 = '';
      this.assignedToName1 = '';
      this.assignedToName3 = '';
      this.assignedToName2 = '';
      this.disable1 = false;
      this.disable2 = false;
      this.disable3 = false;
      this.disable4 = true;
      this.disable5 = false;
      this.selectSeverityerror = false;
      this.selectSeverityerror1 = false;
      this.selectSeverityerror2 = false;
      this.selectSeverityerror3 = false;
      this.selectSeverityerror4 = false;
      this.assignedfullname = this.assignedName(this.option1);
      this.assignedToDetails = this.assignedToPerson(this.option1);
    } else if (i === 4) {
      this.stateCtrl4.disable()
      this.stateCtrl1.enable()
      this.stateCtrl2.enable()
      this.stateCtrl3.enable()
      this.stateCtrl.enable()
      this.stateCtrl1.setValue('');
      this.stateCtrl2.setValue('');
      this.stateCtrl3.setValue('');
      this.stateCtrl.setValue('');
      this.assignedToName1 = '';
      this.assignedToName4 = '';
      this.assignedToName3 = '';
      this.assignedToName2 = '';
      this.option1 = event.option.value;
      this.disable1 = false;
      this.disable2 = false;
      this.disable3 = false;
      this.disable4 = false;
      this.disable5 = true;
      this.selectSeverityerror = false;
      this.selectSeverityerror1 = false;
      this.selectSeverityerror2 = false;
      this.selectSeverityerror3 = false;
      this.selectSeverityerror4 = false;
      this.assignedfullname = this.assignedName(this.option1);
      this.assignedToDetails = this.assignedToPerson(this.option1);
    }

    //closing of selected function
  }


  // cancle assign individual cross button functions --> start

  cancle1() {

    this.stateCtrl.enable()
    // this.stateCtrl.value = '';
    this.disable1 = false;
    this.stateCtrl.setValue('');
    this.stateCtrl1.setValue('');
    this.stateCtrl2.setValue('');
    this.stateCtrl3.setValue('');
    this.stateCtrl4.setValue('');
    this.assignedToName5 = '';
    this.assignedToName4 = '';
    this.assignedToName3 = '';
    this.assignedToName2 = '';
    this.assignedToName1 = '';
    this.selectSeverityerror = false;
    this.selectSeverityerror1 = false;
    this.selectSeverityerror2 = false;
    this.selectSeverityerror3 = false;
    this.selectSeverityerror4 = false;
  }
  cancle2() {
    this.stateCtrl1.enable()
    this.disable2 = false;
    this.stateCtrl.setValue('');
    this.stateCtrl1.setValue('');
    this.stateCtrl2.setValue('');
    this.stateCtrl3.setValue('');
    this.stateCtrl4.setValue('');
    this.assignedToName5 = '';
    this.assignedToName4 = '';
    this.assignedToName3 = '';
    this.assignedToName2 = '';
    this.assignedToName1 = '';
    this.selectSeverityerror = false;
    this.selectSeverityerror1 = false;
    this.selectSeverityerror2 = false;
    this.selectSeverityerror3 = false;
    this.selectSeverityerror4 = false;



  }
  cancle3() {
    this.stateCtrl2.enable()
    this.stateCtrl.setValue('');
    this.stateCtrl1.setValue('');
    this.stateCtrl2.setValue('');
    this.stateCtrl3.setValue('');
    this.stateCtrl4.setValue('');
    this.assignedToName5 = '';
    this.assignedToName4 = '';
    this.assignedToName3 = '';
    this.assignedToName2 = '';
    this.assignedToName1 = '';
    this.disable3 = false;
    this.selectSeverityerror = false;
    this.selectSeverityerror1 = false;
    this.selectSeverityerror2 = false;
    this.selectSeverityerror3 = false;
    this.selectSeverityerror4 = false;

  }
  cancle4() {
    this.stateCtrl3.enable()
    this.stateCtrl.setValue('');
    this.stateCtrl1.setValue('');
    this.stateCtrl2.setValue('');
    this.stateCtrl3.setValue('');
    this.stateCtrl4.setValue('');
    this.assignedToName5 = '';
    this.assignedToName4 = '';
    this.assignedToName3 = '';
    this.assignedToName2 = '';
    this.assignedToName1 = '';
    this.selectSeverityerror = false;
    this.selectSeverityerror1 = false;
    this.selectSeverityerror2 = false;
    this.selectSeverityerror3 = false;
    this.selectSeverityerror4 = false;

    this.disable4 = false;

  }
  cancle5() {
    this.stateCtrl4.enable()
    this.stateCtrl.setValue('');
    this.stateCtrl1.setValue('');
    this.stateCtrl2.setValue('');
    this.stateCtrl3.setValue('');
    this.stateCtrl4.setValue('');
    this.assignedToName5 = '';
    this.assignedToName4 = '';
    this.assignedToName3 = '';
    this.assignedToName2 = '';
    this.assignedToName1 = '';
    this.disable5 = false;
    this.selectSeverityerror = false;
    this.selectSeverityerror1 = false;
    this.selectSeverityerror2 = false;
    this.selectSeverityerror3 = false;
    this.selectSeverityerror4 = false;

  }

  // <-- end

  // select severity 
  selectSeverity(event, i) {
    if (i === 0) {
      this.severityValue = event.target.value;
    }
    else if (i === 1) {
      this.severityValue1 = event.target.value;

    }
    else if (i === 2) {
      this.severityValue2 = event.target.value;

    }
    else if (i === 3) {
      this.severityValue3 = event.target.value;

    }
    else if (i === 4) {
      this.severityValue4 = event.target.value;

    }

  }
  //search funcationality function
  filterItem(myInput) {

    // if (myInput.length > 2) {
      this.resolvedTasksObject = [];
      this.yourTasksObject = [];
      this.escalatedObject = [];
      this.assignedObject = [];
      this.unAssignedObject = [];
      // no tickets div hide
      this.noTicketsDiv = false;
      this.loader = true;

      //assign search value 
      this.searchValue = myInput;

      if (this.searchValueState === 'solved') {
        this.resolvedTasksObject = [];
        this.noTicketsDiv = false;
        this.loader = true;
        // no tickets div hide

        //tickets solved tasks tickets inputs
        var yourTicketsInputs = {
          "currentStatus": "Solved",
          "category": this.UserObject.TeamName,
          "assignedTo": this.UserObject.LoginId,
          "roleName": this.UserObject.RoleName,
          "yourTasks": false,
          "searchKey": myInput,
          "pageNumber": 1
        }
        //tickets solved tickets list
        this.ticketsAssignServ.allTicketsList(yourTicketsInputs).subscribe(res => {

          this.loader = false;
          // no tickets div show
          if (res.List.length <= 0) {
            this.resolvedTasksObject = [];
            this.solvedTicketsLength = 0;
            this.noTicketsDiv = true;
          }
          else {
            this.noTicketsDiv = false;
            this.resolvedTasksObject = res.List;
            this.solvedTicketsLength = res.Total;
          }

        }, error => {
          console.log(error);
          this.loader = true;
          this.noTicketsDiv = false;
          this.resolvedTasksObject = [];
          this.solvedTicketsLength = 0;
        })

      } else if (this.searchValueState === 'yourTask') {
        this.yourTasksObject = [];
        this.noTicketsDiv = false;
        this.loader = true;

        // if(this.disable === true && this.noTicketsDiv === false  ){
        //   this.hide = true;
        // }

        //retriving your tasks tickets inputs
        var yourTicketsInputs = {
          "currentStatus": "youTasks",
          "category": this.UserObject.TeamName,
          "assignedTo": this.UserObject.LoginId,
          "roleName": this.UserObject.RoleName,
          "yourTasks": true,
          "searchKey": myInput,
          "pageNumber": 1
        }

        //youtasks  tickets list
        this.ticketsAssignServ.allTicketsList(yourTicketsInputs).subscribe(res => {

          this.loader = false;
          if (res.List.length <= 0) {
            this.yourTasksObject = [];
            this.yourtaksListLength = 0;
            this.noTicketsDiv = true;
          }
          else {
            this.noTicketsDiv = false;
            this.yourTasksObject = res.List;
            this.yourtaksListLength = res.Total;
          }
        }, error => {
          this.loader = true;
          console.log(error);
          this.noTicketsDiv = false;
          this.yourTasksObject = [];
          this.yourtaksListLength = 0;
        })


      } else if (this.searchValueState === 'escalated') {
        this.escalatedObject = [];
        this.noTicketsDiv = false;
        this.loader = true;
        //retriving escalated tickets inputs
        var escalatedTicketsInputs = {
          "currentStatus": "Escalated",
          "category": this.UserObject.TeamName,
          "assignedTo": this.UserObject.LoginId,
          "roleName": this.UserObject.RoleName,
          "yourTasks": false,
          "searchKey": myInput,
          "pageNumber": 1
        }

        //Retrivingall escalated tickets list
        this.ticketsAssignServ.allTicketsList(escalatedTicketsInputs).subscribe(res => {

          this.loader = false;
          if (res.List.length <= 0) {
            this.escalatedObject = [];
            this.escalatedListLength = 0;
            this.noTicketsDiv = true;
          }
          else {
            this.noTicketsDiv = false;
            this.escalatedObject = res.List;
            this.escalatedListLength = res.Total;
          }
        }, error => {
          this.escalatedObject = [];
          this.loader = true;
          this.escalatedListLength = 0;
          console.log(error);
          this.noTicketsDiv = false;
        })

      } else if (this.searchValueState === 'assigned') {
        this.assignedObject = [];
        this.noTicketsDiv = false;
        this.loader = true;
        //retriving assigned tickets inputs
        var assignedTicketsInputs = {
          "currentStatus": "Assigned",
          "category": this.UserObject.TeamName,
          "assignedTo": this.UserObject.LoginId,
          "roleName": this.UserObject.RoleName,
          "yourTasks": false,
          "searchKey": myInput,
          "pageNumber": 1

        }
        //Retrivingall assigned tickets list
        this.ticketsAssignServ.allTicketsList(assignedTicketsInputs).subscribe(res => {

          this.loader = false;
          if (res.List.length <= 0) {
            this.assignedObject = [];
            this.assignedListLength = 0;
            this.noTicketsDiv = true;
          }
          else {
            this.noTicketsDiv = false;
            this.assignedObject = res.List;
            this.assignedListLength = res.Total;
          }
        }, error => {
          this.noTicketsDiv = false;
          this.assignedObject = [];
          this.assignedListLength = 0;
          console.log(error);
        })


      } else if (this.searchValueState === 'unAssigned') {
        this.unAssignedObject = [];
        this.noTicketsDiv = false;
        this.loader = true;
        //retriving unAssigned tickets inputs
        var unAssignedTicketsInputs = {
          "currentStatus": "Opened",
          "category": this.UserObject.TeamName,
          "assignedTo": this.UserObject.LoginId,
          "roleName": this.UserObject.RoleName,
          "yourTasks": false,
          "searchKey": myInput,
          "pageNumber": 1
        }

        //Retrivingall unAssigned  tickets list
        this.ticketsAssignServ.allTicketsList(unAssignedTicketsInputs).subscribe(res => {
          this.unAssignedObject = res.List;
          this.unAssignedListLength = res.Total;
          this.loader = false;
          // hide and show no tickets div 
          if (res.List.length <= 0) {
            this.unAssignedObject = [];
            this.unAssignedListLength = 0;
            this.noTicketsDiv = true;
            //this.loader = false
          }
          else {
            this.noTicketsDiv = false;
            this.unAssignedObject = res.List;
            this.unAssignedListLength = res.Total;
          }
        }, error => {
          this.unAssignedObject = [];
          this.unAssignedListLength = 0;
          this.noTicketsDiv = false;
          this.loader = true;
          console.log(error);
        })

      }

    // }
    //closing of search filter function
  }


  //pagination funtion for unAssigned
  getUnAssignedDocDet(event) {
    this.ticketsAssignServ.tabName = "Open";
    this.unAssignedObject = [];

    this.noTicketsDiv = false;
    this.loader = true;
    // clear assigned task feilds  --> start
    this.disable1 = false;
    this.disable2 = false;
    this.disable3 = false;
    this.disable4 = false;
    this.disable5 = false;
    this.stateCtrl4.enable()
    this.stateCtrl1.enable()
    this.stateCtrl2.enable()
    this.stateCtrl3.enable()
    this.stateCtrl.enable()
    this.stateCtrl4.setValue('');
    this.stateCtrl1.setValue('');
    this.stateCtrl2.setValue('');
    this.stateCtrl3.setValue('');
    this.stateCtrl.setValue('');
    this.assignedToName1 = '';
    this.assignedToName4 = '';
    this.assignedToName3 = '';
    this.assignedToName2 = '';
    this.assignedToName5 = '';
    // -->end



    //checking condition wether search value is null or not if not null going to else block
    if (this.searchValue === "") {

      //retriving unAssigned tickets inputs
      var unAssignedTicketsInputs = {
        "currentStatus": "Opened",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": "",
        "pageNumber": event.page + 1
      }

      var tabName =  "unassigned"
      this. storingStateValue(unAssignedTicketsInputs, tabName);
      //getting un assigned tickets from service
      this.ticketsAssignServ.allTicketsList(unAssignedTicketsInputs).subscribe(res => {
        this.loader = false;
        if (res.List.length === 0) {
          this.unAssignedObject = [];
          this.unAssignedListLength = 0;
          this.noTicketsDiv = true;
        } else {
          this.unAssignedObject = res.List;
          this.unAssignedListLength = res.Total;
          this.noTicketsDiv = false;
        }

      }, error => {
        this.loader = true;
        this.noTicketsDiv = false;
        this.unAssignedObject = [];
        this.unAssignedListLength = 0;
        console.log(error);
      })

    } else {
      //retriving unAssigned tickets inputs
      var unAssignedTicketsInputs = {
        "currentStatus": "Opened",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": this.searchValue,
        "pageNumber": event.page + 1
      }

      var tabName =  "unassigned"
      this. storingStateValue(unAssignedTicketsInputs, tabName);
      //getting un assigned tickets from service
      this.ticketsAssignServ.allTicketsList(unAssignedTicketsInputs).subscribe(res => {
        this.loader = false;
        if (res.List.length === 0) {
          this.unAssignedObject = [];
          this.unAssignedListLength = 0;
          this.noTicketsDiv = true;
        } else {
          this.noTicketsDiv = false;
          this.unAssignedObject = res.List;
          this.unAssignedListLength = res.Total;
        }
      }, error => {
        console.log(error);
        this.loader = true;
        this.unAssignedObject = [];
        this.unAssignedListLength = 0;
      })
      //else closing block
    }

    //clsoing of un assigned function  
  }


  //function for assigned function 
  getAssignedDocDetails(event) {
    this.ticketsAssignServ.tabName = "Assigned";
    this.assignedObject = [];
    //this.assignedListLength = 0;
    this.noTicketsDiv = false;
    this.loader = true;
    // clear assigned task feilds  --> start
    this.disable1 = false;
    this.disable2 = false;
    this.disable3 = false;
    this.disable4 = false;
    this.disable5 = false;
    this.stateCtrl4.enable()
    this.stateCtrl1.enable()
    this.stateCtrl2.enable()
    this.stateCtrl3.enable()
    this.stateCtrl.enable()
    this.stateCtrl4.setValue('');
    this.stateCtrl1.setValue('');
    this.stateCtrl2.setValue('');
    this.stateCtrl3.setValue('');
    this.stateCtrl.setValue('');
    this.assignedToName1 = '';
    this.assignedToName4 = '';
    this.assignedToName3 = '';
    this.assignedToName2 = '';
    this.assignedToName5 = '';
    // -->end

    //checking condition wether search value is null or not if not null going to else block
    if (this.searchValue === "") {

      //retriving Assigned tickets inputs
      var AssignedTicketsInputs = {
        "currentStatus": "Assigned",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": "",
        "pageNumber": event.page + 1
      }

      var tabName =  "assigned"
      this. storingStateValue(AssignedTicketsInputs, tabName);
      //getting un assigned tickets from service
      this.ticketsAssignServ.allTicketsList(AssignedTicketsInputs).subscribe(res => {
        this.loader = false;

        if (res.List.length === 0) {
          this.assignedObject = [];
          this.assignedListLength = 0;
          this.noTicketsDiv = true;
        } else {
          this.noTicketsDiv = false;
          this.assignedObject = res.List;
          this.assignedListLength = res.Total;
        }

      }, error => {
        console.log(error);
        this.assignedObject = [];
        this.assignedListLength = 0;
        this.loader = true;
      })

    } else {
      this.noTicketsDiv = false;
      this.loader = true;
      //retriving Assigned tickets inputs
      var AssignedTicketsInputs = {
        "currentStatus": "Assigned",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": this.searchValue,
        "pageNumber": event.page + 1
      }

      var tabName =  "assigned"
      this. storingStateValue(AssignedTicketsInputs, tabName);
      //getting  assigned tickets from service
      this.ticketsAssignServ.allTicketsList(AssignedTicketsInputs).subscribe(res => {
        this.loader = false;
        if (res.List.length === 0) {
          this.assignedObject = [];
          this.assignedListLength = 0;
          this.noTicketsDiv = true;

        } else {
          this.noTicketsDiv = false;
          this.assignedObject = res.List;
          this.assignedListLength = res.Total;
        }
      }, error => {
        console.log(error);
        this.assignedObject = [];
        this.assignedListLength = 0;
        this.noTicketsDiv = false;
        this.loader = true;

      })
      //else closing block
    }

    //clsoing of  assigned function 
  }



  //function for yourTask function 
  yourTaskDocDetails(event) {
    this.ticketsAssignServ.tabName = "Your Tasks";
    this.yourTasksObject = [];
    // this.yourtaksListLength = 0;
    this.noTicketsDiv = false;
    this.loader = true;

    //checking condition wether search value is null or not if not null going to else block
    if (this.searchValue === '') {

      //retriving yourTask tickets inputs
      var youTaskTicketsInputs = {
        "currentStatus": "youTasks",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": true,
        "searchKey": "",
        "pageNumber": event.page + 1
      }
      var tabname = "yourtasks";
      this.storingStateValue(youTaskTicketsInputs,tabname);
      //getting un yourTask tickets from service
      this.ticketsAssignServ.allTicketsList(youTaskTicketsInputs).subscribe(res => {

        this.loader = false;
        if (res.List.length === 0) {
          this.yourTasksObject = [];
          this.yourtaksListLength = 0;
          this.noTicketsDiv = true;


        } else {
          this.noTicketsDiv = false;
          this.yourTasksObject = res.List;
          this.yourtaksListLength = res.Total;

        }

      }, error => {
        this.yourTasksObject = [];
        this.yourtaksListLength = 0;
        this.noTicketsDiv = false;
        this.loader = true;

        console.log(error);
      })

    } else {
      this.noTicketsDiv = false;
      this.loader = true;
      //retriving Assigned tickets inputs
      var youTaskTicketsInputs = {
        "currentStatus": "youTasks",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": true,
        "searchKey": this.searchValue,
        "pageNumber": event.page + 1
      }
      var tabname = "yourtasks";
      this.storingStateValue(youTaskTicketsInputs,tabname);
      //getting  assigned tickets from service
      this.ticketsAssignServ.allTicketsList(youTaskTicketsInputs).subscribe(res => {
        this.loader = false;

        if (res.List.length === 0) {
          this.noTicketsDiv = true;
          this.yourTasksObject = [];
          this.yourtaksListLength = 0;
        } else {
          this.noTicketsDiv = false;
          this.yourTasksObject = res.List;
          this.yourtaksListLength = res.Total;
        }
      }, error => {
        this.yourTasksObject = [];
        this.yourtaksListLength = 0;
        this.loader = true;
        this.noTicketsDiv = false;
        console.log(error);
      })
      //else closing block
    }

    //clsoing of  assigned function 
  }


  //function for solved function 
  solvedDocDetails(event) {

    this.ticketsAssignServ.tabName = "Closed";
    this.resolvedTasksObject = [];

    this.noTicketsDiv = false;
    this.loader = true;
    // console.log("event.page + 1",event);
    //checking condition wether search value is null or not if not null going to else block
    if (this.searchValue === "") {

      //retriving solved tickets inputs
      var SolvedTicketsInputs = {
        "currentStatus": "Solved",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": "",
        "pageNumber": event.page + 1
      }
     
      var tabName =  "solved"
      this. storingStateValue(SolvedTicketsInputs, tabName);
      //getting un Solved tickets from service
      this.ticketsAssignServ.allTicketsList(SolvedTicketsInputs).subscribe(res => {
        this.loader = false;

        if (res.List.length === 0) {
          this.resolvedTasksObject = [];
          this.solvedTicketsLength = 0;
          this.noTicketsDiv = true;
        } else {
          this.noTicketsDiv = false;
          this.resolvedTasksObject = res.List;
          this.solvedTicketsLength = res.Total;
        }

      }, error => {
        this.resolvedTasksObject = [];
        this.solvedTicketsLength = 0;
        this.loader = true;
        this.noTicketsDiv = false;
        console.log(error);
      })

    } else {
      this.noTicketsDiv = false;
      this.loader = true;

      //retriving Solved tickets inputs
      var SolvedTicketsInputs = {
        "currentStatus": "Solved",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": this.searchValue,
        "pageNumber": event.page + 1
      }

      var tabName =  "solved"
      this. storingStateValue(SolvedTicketsInputs, tabName);
      //getting  solved tickets from service
      this.ticketsAssignServ.allTicketsList(SolvedTicketsInputs).subscribe(res => {
        this.loader = false;
        if (res.List.length === 0) {
          this.resolvedTasksObject = [];
          this.solvedTicketsLength = 0;
          this.noTicketsDiv = true;

        } else {
          this.noTicketsDiv = false;
          this.resolvedTasksObject = res.List;
          this.solvedTicketsLength = res.Total;
        }
      }, error => {
        this.resolvedTasksObject = [];
        this.solvedTicketsLength = 0;
        this.loader = true;
        console.log(error);
      })
      //else closing block
    }

    //clsoing of  Solved function 
  }


  //function for  escalated function 
  escalatedDocDetails(event) {
    this.ticketsAssignServ.tabName = "Escalated";
    this.escalatedObject = [];
    this.escalatedListLength = 0;
    this.noTicketsDiv = false;
    this.loader = true;
    // clear assigned task feilds  --> start
    this.disable1 = false;
    this.disable2 = false;
    this.disable3 = false;
    this.disable4 = false;
    this.disable5 = false;
    this.stateCtrl4.enable()
    this.stateCtrl1.enable()
    this.stateCtrl2.enable()
    this.stateCtrl3.enable()
    this.stateCtrl.enable()
    this.stateCtrl4.setValue('');
    this.stateCtrl1.setValue('');
    this.stateCtrl2.setValue('');
    this.stateCtrl3.setValue('');
    this.stateCtrl.setValue('');
    this.assignedToName1 = '';
    this.assignedToName4 = '';
    this.assignedToName3 = '';
    this.assignedToName2 = '';
    this.assignedToName5 = '';
    // -->end
    //checking condition wether search value is null or not if not null going to else block
    if (this.searchValue === "") {

      //retriving  escalated tickets inputs
      var escalatedTicketsInputs = {
        "currentStatus": "Escalated",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": "",
        "pageNumber": event.page + 1
      }

      var tabName =  "escalated"
      this. storingStateValue(escalatedTicketsInputs, tabName);
      //getting un  escalated tickets from service
      this.ticketsAssignServ.allTicketsList(escalatedTicketsInputs).subscribe(res => {
        this.loader = false;
        if (res.List.length === 0) {
          this.escalatedObject = [];
          this.escalatedListLength = 0;
          this.noTicketsDiv = true;
        } else {
          this.noTicketsDiv = false;
          this.escalatedObject = res.List;
          this.escalatedListLength = res.Total;
        }
      }, error => {
        this.escalatedObject = [];
        this.escalatedListLength = 0;
        this.loader = true;
        this.noTicketsDiv = false;
        console.log(error);
      })

    } else {
      this.escalatedObject = [];
      this.escalatedListLength = 0;
      this.noTicketsDiv = false;
      this.loader = true;

      //retriving  escalated tickets inputs
      var escalatedTicketsInputs = {
        "currentStatus": "Escalated",
        "category": this.UserObject.TeamName,
        "assignedTo": this.UserObject.LoginId,
        "roleName": this.UserObject.RoleName,
        "yourTasks": false,
        "searchKey": this.searchValue,
        "pageNumber": event.page + 1
      }

      var tabName =  "escalated"
      this. storingStateValue(escalatedTicketsInputs, tabName);
      //getting   escalated tickets from service
      this.ticketsAssignServ.allTicketsList(escalatedTicketsInputs).subscribe(res => {
        this.loader = false;

        if (res.List.length === 0) {
          this.noTicketsDiv = true;
          this.escalatedObject = [];
          this.escalatedListLength = 0;
        } else {
          this.noTicketsDiv = false;
          this.escalatedObject = res.List;
          this.escalatedListLength = res.Total;
        }
      }, error => {
        this.escalatedObject = [];
        this.escalatedListLength = 0;
        this.loader = true;
        this.noTicketsDiv = false;
        console.log(error);
      })
      //else closing block
    }
    //clsoing of   escalated function 
  }



  sendingDataToAgent(docDeatils) {
    this.currentStatus.apiData = ""

    this.ticketsAssignServ.replay.next(docDeatils);

  }



  //timer Function __> start


  timeSince(d): any {

    var date1: any = new Date();

    this.seconds = Math.floor((date1 - d) / 1000);

    //return this.seconds;

    var interval = Math.floor(this.seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(this.seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(this.seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(this.seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(this.seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    // return Math.floor(this.seconds) + " seconds";
  }


  // --> end


  changeCategory(event, data, index) {
    this.catgeoryDoc = data;
    this.docIndex = index;
    this.catValue = event.target.value;
    if (this.catValue == 'HR') {
      this.subcatvalue = 'Payroll';
    }
    if (this.catValue == 'IT') {
      this.subcatvalue = 'VOIP';
    }
    if (this.catValue == 'APPS') {
      this.subcatvalue = 'MINT';
    }
    $("#exampleModal-30").modal("show");

  }

  changeCateSubmit() {

    this.block = true;
    setTimeout(() => {
      this.block = false;
    }, 6000);

    let input = {
      "id": this.catgeoryDoc.id,
      "category": this.catValue,
      "modifiedBy": this.UserLoginId,
      "subCategory": this.subcatvalue
    }
    this.ticketsAssignServ.changeCatageryMethod(input).subscribe((res) => {

      this.unAssigned()
    }, error => {
      this.unAssigned()
      console.log(error)
    })
  }

  changeCateToDefault() {
    this.unAssigned()

  }

  checkValue(userTicket) {
    var today = new Date();
    var cyrrentDate = new Date(userTicket.createdDate);
    var timeDiff = Math.abs(cyrrentDate.getTime() - today.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 48));

    if (diffDays >= 2) {
      return userTicket = true;
    } else {
      return userTicket = false;
    }
  }

  singleDigit(length){
    // console.log(length);
    if(length<9 && length>0){
      var d =length
      return '0'+d;
    }
    else{
      // console.log(length);
      return length;
    }
       
  }
  //title concat
  titleConcat(response) {
    if (response.length > 60) {
      return response = response.substring(0, 60) + ".."
    } else {
      return response;
    }
  }

  //closing of main oninit function 
}