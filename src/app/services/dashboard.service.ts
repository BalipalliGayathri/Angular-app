
import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs';
import { map } from 'rxjs/operators';
import{BehaviorSubject}from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class DashboardService {

  constructor(@Inject(Http) public http: Http) { }

  //rootUrl = "http://192.168.1.230:8080/v3";
  rootUrl = environment.rootUrl
  getServiceTimeDeta = this.rootUrl + "/ticket/dashboard";
  loadAllTeamTicketCount = this.rootUrl +'/ticket/graphs';
  compareEndpoint = this.rootUrl +'/ticket/compare-agents-by-tickets';
  topSubcategory = this.rootUrl +'/ticket/team-wise-ticket-distribution';
  sample={};

  //insert document service
  getSeriveTimeDocs() {
    return this.http.post(
      this.getServiceTimeDeta,this.sample).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        // alert("in service");
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }
  //insert document service
  loadAllTeamTotal(data) {
    return this.http.post(this.loadAllTeamTicketCount,data).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }
  //insert document service
  loadIndTeamTotal(data) {
    return this.http.post(this.loadAllTeamTicketCount,data).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }

  compareAgents(data){
    return this.http.post(this.compareEndpoint,data).map((uresponse: Response) => {
      // this.userData=uresponse.json();
      return uresponse.json();
    }, error => {
      console.log(error);
    });
  }
  getTopSubcategory(data){
  //  console.log("data",data)
    return this.http.post(this.topSubcategory,data).map((uresponse: Response) => {
      // this.userData=uresponse.json();
      return uresponse.json();
    }, error => {
      console.log(error);
    });
  }



}