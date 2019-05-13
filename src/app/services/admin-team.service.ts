import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs';
import { map } from 'rxjs/operators';
import{BehaviorSubject}from 'rxjs';
import { environment } from '../../environments/environment.prod';



@Injectable()

export class AdminTeamService {
  
  replay = new BehaviorSubject('0');

  constructor(@Inject(Http) public http: Http) {

  }


    //api's for retriving data
    //rootUrl = "http://192.168.1.230:8080/HubbleServices/hubbleresources/generalServices/user-team";
    //allDocsRetrive = "http://192.168.1.230:8080/v3/ticket/ticket-list-by-loginid";
    rootUrl = `${environment.rootHubble_Url}/user-team`;
    allDocsRetrive = `${environment.rootUrl}/ticket/ticket-list-by-loginid`;
    

  //retrving assigned Tickets List api
  allTicketsList(userDetails) {
    // console.log(userDetails);
    var request= {
      "Authorization":"YWRtaW46YWRtaW4=",
      "roleName": userDetails.team,
      "teamName": userDetails.deptartment
    }
    return this.http.post(
      this.rootUrl,
      request).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }

     //retrving assigned Tickets List api
     getUserTickets(userDetails) {
      return this.http.post(
        this.allDocsRetrive,
        userDetails).map((uresponse: Response) => {
          // this.userData=uresponse.json();
          return uresponse.json();
        }, error => {
          console.log(error);
        });
    }



}
