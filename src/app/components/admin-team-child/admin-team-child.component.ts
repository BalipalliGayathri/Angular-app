import { Component, OnInit } from '@angular/core';
import { UsermoduleService } from '../../services/usermodule.service';
import { TicketsAssignService } from '../../services/tickets-assign.service';
import { AdminTeamService } from '../../services/admin-team.service';

@Component({
  selector: 'app-admin-team-child',
  templateUrl: './admin-team-child.component.html',
  styleUrls: ['./admin-team-child.component.scss']
})
export class AdminTeamChildComponent implements OnInit {
  serviceTime: any;
  totaLTicketCount: { "Active": any; "Escalated": any; "Closed": any; };
  pageSize = 5;
  length: number = 0;
  UserLoginId:string;
  tempSearchValue: any;
  ticketsList : any = [];
  userDetails={};
  userTicketsCount={
    "Active" :"", 
    "Escalated" : "", 
    "Closed" :""
  };
  profileLoginId;
  count=0;
  showLoader = false;
  alive = true;
  tempPaginationValue = 'Active';
  tempsearchValue='';
  noTicketsDiv= false;
  paginationShow = false;
  rating;
  email:string = '';
  first:number=0;
  ngOnDestroy() {
    this.alive = false;
    // this.adminTeamService.replay.next("0");
  }

  constructor(public getDocDetailsService : UsermoduleService, public ticketsAssignServ : TicketsAssignService, public adminTeamService: AdminTeamService) { }

  ngOnInit() {
    this.rating;
    var userInfo = localStorage.getItem('auth');
    var UserObject = JSON.parse(userInfo);
    this.UserLoginId = UserObject.LoginId;
    
    this.adminTeamService.replay.takeWhile(() => this.alive).subscribe(res =>{
    if(res != '0'){
      this.profileLoginId=res;
      this.getUserDetails(res);
      this.retriveDocs('Active');
    }
    
   })

  //closing of ng oninit 
  }


  //pagination documents retriving
  getDocumentDetails(event) {
  this.first = 0;
  if(this.tempsearchValue === ''){

    if(this.tempPaginationValue === 'Active'){

      var userSearchDetails = {
        "createdBy":this.profileLoginId,
        "currentStatus": this.tempPaginationValue,
        "searchKey":"",
        "pageNumber":event.page+1
      }
      // alert(event.page)
      this.first = event.page*this.pageSize;
      this.getAssignDocs(userSearchDetails) 
      // event.page +=1
    } else if (this.tempPaginationValue === 'Escalated') {
     
      var userSearchDetails = {
        "createdBy":this.profileLoginId,
        "currentStatus": this.tempPaginationValue,
        "searchKey":"",
        "pageNumber":event.page+1
      }
      this.first = event.page*this.pageSize;
      this.getEscalatedDocs(userSearchDetails) 
    } else {
      // alert(event.page)
      var userSearchDetails = {
        "createdBy":this.profileLoginId,
        "currentStatus": this.tempPaginationValue,
        "searchKey":"",
        "pageNumber":event.page+1
      }
      this.first = event.page*this.pageSize;
      this.getClosedDocs(userSearchDetails) 
      //main if close
    } 

  } else {

    if(this.tempPaginationValue === 'Active'){

      var userSearchDetails = {
        "createdBy":this.profileLoginId,
        "currentStatus": this.tempPaginationValue,
        "searchKey":this.tempsearchValue,
        "pageNumber":event.page+1
      }
      this.first = event.page*this.pageSize;
      this.getAssignDocs(userSearchDetails) 

    } else if (this.tempPaginationValue === 'Escalated') {
     
      var userSearchDetails = {
        "createdBy":this.profileLoginId,
        "currentStatus": this.tempPaginationValue,
        "searchKey":this.tempsearchValue,
        "pageNumber":event.page+1
      }
      this.first = event.page*this.pageSize;
      this.getEscalatedDocs(userSearchDetails) 
    } else {
      // alert(event.page)
      var userSearchDetails = {
        "createdBy":this.profileLoginId,
        "currentStatus": this.tempPaginationValue,
        "searchKey":this.tempsearchValue,
        "pageNumber":event.page+1
      }
      this.first = event.page*this.pageSize;
      this.getClosedDocs(userSearchDetails) 
      //main if close
    } 

//closinf of else 
  }
   
 //main function cose   
 } 

 //search values
 filterItem(myInput) {
  this.noTicketsDiv=false;
  this.tempsearchValue = myInput;

  if(this.tempPaginationValue === 'Active'){

     var userSearchDetails = {
        "createdBy":this.profileLoginId,
        "currentStatus": this.tempPaginationValue,
        "searchKey": myInput,
        "pageNumber": 1
      }
      this.first = 0; 
      this.getAssignDocs(userSearchDetails) 

  } else if (this.tempPaginationValue === 'Escalated') {

    var userSearchDetails = {
      "createdBy":this.profileLoginId,
      "currentStatus": this.tempPaginationValue,
      "searchKey": myInput,
      "pageNumber": 1
    }
    this.first = 0;
    this.getAssignDocs(userSearchDetails)

  } else {

    var userSearchDetails = {
      "createdBy":this.profileLoginId,
      "currentStatus": this.tempPaginationValue,
      "searchKey": myInput,
      "pageNumber": 1
    }
    this.first = 0;
    this.getAssignDocs(userSearchDetails)
    
  }
//closing serach function
 }


//pagination documents retriving
getUserDetails(userId) {

   var inputDetails= {
      "loginId": userId
    }
  
    this.ticketsAssignServ.getUserList(inputDetails).subscribe(res =>{
      this.showLoader=true;
       this.userDetails = res;
      //  console.log(res);
       this.totaLTicketCount = res.count[0].Active+res.count[0].Escalated+res.count[0].Closed;
       this.userTicketsCount = {
        "Active" : res.count[0].Active, 
        "Escalated" : res.count[0].Escalated, 
        "Closed" : res.count[0].Closed
       }
       this.serviceTime =res.count[0].ServiceTime;
     this.email =  `${res.LoginId }@miraclesoft.com`
       this.rating = res.count[0].Rating;
      // if(this.rating === 0){
      //   this.rating = 3;
      // }
      
  })
}


//for active docs
retriveDocs(data){

  this.tempPaginationValue = data;
  
  if(data === 'Active'){

    var userSearchDetails = {
      "createdBy":this.profileLoginId,
      "currentStatus":"Active",
      "searchKey":"",
      "pageNumber":1
    }
    this.first = 0;
    this.getAssignDocs(userSearchDetails) 

  }else if(data === 'Escalated') {

    var userSearchDetails = {
      "createdBy":this.profileLoginId,
      "currentStatus":"Escalated",
      "searchKey":"",
      "pageNumber":1
    }
    this.first = 0;
    this.getEscalatedDocs(userSearchDetails) 

  } else {

    var userSearchDetails = {
      "createdBy":this.profileLoginId,
      "currentStatus":"Closed",
      "searchKey":"",
      "pageNumber":1
    }
    this.first = 0;
    this.getClosedDocs(userSearchDetails) 

 }
//closing of retrive function
}


//retrivng assign tickets from service
getAssignDocs(userSearchDetails) {
  // var counts = 0;
  this.ticketsList =[];
  // this.length = 0;
  this.noTicketsDiv=false;
  this.paginationShow = false;
  this.adminTeamService.getUserTickets(userSearchDetails).subscribe(res =>{
    this.showLoader = true;
    if(res.Total === 0){
      this.ticketsList =[];
      this.noTicketsDiv = true;

    }else {
   
      this.noTicketsDiv = false;
      this.ticketsList = res.List;
      this.length = res.Total;
      if(this.length > 5){
        this.paginationShow = true;
      }else{
        this.paginationShow = false;
      }
    }
  
   },error=>{
    this.noTicketsDiv=false;
       console.log(error);
   })
}


//retrivng assign tickets from service
getEscalatedDocs(userSearchDetails) {
  this.ticketsList =[];
  // this.length = 0;
  
  this.noTicketsDiv=false;
  this.paginationShow = false;
  // alert("in")
  this.adminTeamService.getUserTickets(userSearchDetails).subscribe(res =>{
    if(res.Total === 0){
      this.noTicketsDiv=true;
      this.ticketsList =[];
      this.showLoader=true;
    }else {
      //this.paginationShow = true;
      this.showLoader=true;
      this.noTicketsDiv=false;
      this.ticketsList = res.List;
      this.length = res.Total;

      if(this.length >5){
        this.paginationShow = true;
      }else{
        this.paginationShow = false;
      }
    }
  
   },error=>{
    this.noTicketsDiv=false;
       console.log(error);
   })
}


//retrivng assign tickets from service
getClosedDocs(userSearchDetails) {
  this.ticketsList =[];
  // this.length = 0;
  this.noTicketsDiv=false;
  this.paginationShow = false;
  this.adminTeamService.getUserTickets(userSearchDetails).subscribe(res =>{
    if(res.Total === 0){
      this.noTicketsDiv=true;
      this.ticketsList =[];
      this.showLoader=true;
    }else {
      this.showLoader=true;
      this.noTicketsDiv=false;
      this.ticketsList = res.List;
      // console.log(this.ticketsList);
      this.length = res.Total;
      if(this.length >5){
        this.paginationShow = true;
      }else{
        this.paginationShow = false;
      }
      
    }
  
   },error=>{
    this.noTicketsDiv=false;
       console.log(error);
   })

 }


 //sending data ticket full details page
sendingDataToAgent(docDeatils) {
  this.ticketsAssignServ.replay.next(docDeatils);
}



copyToClipboard(item ) {
  const event = (e: ClipboardEvent) => {
    e.clipboardData.setData('text/plain', item);
    e.preventDefault();
    document.removeEventListener('copy',event);
  }
  document.addEventListener('copy', event);
  document.execCommand('copy');
}




//closing of main class
}
