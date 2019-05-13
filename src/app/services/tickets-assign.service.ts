import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class TicketsAssignService {

  replay = new BehaviorSubject('0');
  userReplay = new BehaviorSubject('0');

  constructor(@Inject(Http) public http: Http) {

  }


  loadDoc;
  tabName:string;

  //api's for retriving data
  
  // rootUrl = "http://192.168.1.230:8080/v3";
  rootUrl = environment.rootUrl;
  allDocsRetrive = this.rootUrl + '/ticket/tickets-by-department';
  agentNamesUrl = this.rootUrl + "/user/user-list-by-team";
  ticketAssignUrl = this.rootUrl + '/ticket/assign-ticket';
  changeCatagery = this.rootUrl + '/ticket/change-category';
  changeSeverityEndpoint = this.rootUrl + '/ticket/update-admin-severity';
  //userDetailsApi = 'http://192.168.1.230:8080/v3/ticket/user-list-by-loginid';
  //userDetailsApi = 'http://192.168.1.230:8080/v3/ticket/user-details-by-loginid';
  userDetailsApi = this.rootUrl + '/ticket/user-details-by-loginid';
  //assignUserDetailsApi = 'http://192.168.1.230:8080/HubbleServices/hubbleresources/generalServices/user-list-by-team-name'
  assignUserDetailsApi = `${environment.rootHubble_Url}/user-list-by-team-name`
  //ticketStatusUpdateApi = 'http://192.168.1.230:8080/v3/ticket/update-ticket-status';
  ticketStatusUpdateApi = this.rootUrl + '/ticket/update-ticket-status';
  userResolveTicket = this.rootUrl+'ticket/do-mark-as-resolved';
  reriveAllTickCount = this.rootUrl+'ticket/status-wise-count';
 
 
  //retrving assigned Tickets List api
  allTicketsList(userDetails) {
    return this.http.post(
      this.allDocsRetrive,
      userDetails).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }

    //retrving assigned Tickets List api
    retriveAllCount(userDetails) {
      return this.http.post(
        this.reriveAllTickCount,
        userDetails).map((uresponse: Response) => {
          // this.userData=uresponse.json();
          return uresponse.json();
        }, error => {
          console.log(error);
        });
    }
  

  //ticket status update api
  ticketsStatusUpdate(userDetails) {
    return this.http.post(
      this.ticketStatusUpdateApi,
      userDetails).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }

    //ticket status update api
    userResolve(userDetails) {

      return this.http.post(
        this.userResolveTicket,
        userDetails).map((uresponse: Response) => {
          // this.userData=uresponse.json();
          return uresponse.json();
        }, error => {
          console.log(error);
        });
    }

  //retrving escalated Tickets List api
  agentNamesList(agentNames) {
    return this.http.post(
      this.assignUserDetailsApi,
      agentNames).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }


  //assign task api
  assigntask(agentNames) {
    return this.http.post(
      this.ticketAssignUrl,
      agentNames).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        // console.log("user responce:",uresponse);
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }


  //retrving escalated Tickets List api
  getUserList(agentNames) {
    return this.http.post(
      this.userDetailsApi,
      agentNames).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }


  changeCatageryMethod(agentNames) {
    return this.http.post(
      this.changeCatagery,
      agentNames).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });


  }


  changeSeverity(agentNames) {
    return this.http.post(
      this.changeSeverityEndpoint,
      agentNames).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });


  }
}
