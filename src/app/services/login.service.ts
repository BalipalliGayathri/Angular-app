import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment.prod';


@Injectable()
export class LoginService {
  //    "https://www.miraclesoft.com/HubbleServices/hubbleresources/helpdesk-service";
  //rootUrl = "http://192.168.1.230:8080/HubbleServices/hubbleresources/generalServices";
  rootUrl = environment.rootHubble_Url;
  insertDocumentUrl = this.rootUrl + '/helpdesk-login';

  constructor(@Inject(Http) public http: Http) {
  }

  //insert document service
  insertDocument(data) {
    return this.http.post(
      this.insertDocumentUrl,
      data).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }

}
