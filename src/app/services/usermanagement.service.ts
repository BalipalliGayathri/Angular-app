import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class UsermanagementService {
  authorizationKey = { "Authorization": "YWRtaW46YWRtaW4=" };

  constructor(@Inject(Http) public http: Http) { }
  //roleUpdatingUrl = 'http://192.168.1.230:8080/v3/user/update-user-role';
  // rootUrl = "http://192.168.1.230:8080/HubbleServices/hubbleresources/generalServices/" "https://www.miraclesoft.com/HubbleServices/hubbleresources/helpdesk-service/";;
  //rootUrl = "https://www.miraclesoft.com/HubbleServices/hubbleresources/generalServices/";
  rootUrl = environment.rootHubble_Url;
  getAdminHrList = this.rootUrl + '/hr-team-admin-list';
  getAgentList = this.rootUrl + '/hr-team-agent-list';
  getAdminItList = this.rootUrl + '/it-team-admin-list';
  getAdminMappsList = this.rootUrl + '/mapps-admin-list';
  getAgentMappsList = this.rootUrl + '/mapps-agent-list';
  getAgentItList = this.rootUrl + '/it-team-agent-list';
  getSuperAdminList = this.rootUrl + '/super-admin-list';

  roleUpdatingUrl = `${environment.rootUrl}/user/update-user-role`;

  //retrving Hr Admin Users api
  getHradminList() {
    return this.http.post(
      this.getAdminHrList, this.authorizationKey).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }


  //retrving hr agents api
  getHraAgentList() {
    return this.http.post(
      this.getAgentList, this.authorizationKey).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }


  //retrving It Admin Users api
  getItadminList() {
    return this.http.post(
      this.getAdminItList, this.authorizationKey).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }


  //retrving Mapps Admin Users api
  getMappsadminList() {
    // console.log('insode of subscribes');
    return this.http.post(
      this.getAdminMappsList, this.authorizationKey).map((uresponse: Response) => {
        let userData = uresponse.json();
        // console.log('data', userData);
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }


  //retrving It Agent Users api
  getMappsAgentList() {
    return this.http.post(
      this.getAgentMappsList, this.authorizationKey).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }

  //retrving IT agents api
  getItaAgentList() {
    return this.http.post(
      this.getAgentItList, this.authorizationKey).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }

  //retrving Super Admin agents api
  getSuperAdminsList() {
    return this.http.post(
      this.getSuperAdminList, this.authorizationKey).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }


  //updating Role
  roleUpdating(response) {
    return this.http.post(
      this.roleUpdatingUrl, response).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }


}
