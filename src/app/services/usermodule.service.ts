import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class UsermoduleService {

  sendData = new BehaviorSubject('0');
  reqData = new BehaviorSubject('0');


  //rootUrl = "http://192.168.1.230:8080/v3";"https://helpdesk-api.miraclesoft.com/v3";;

  rootUrl = environment.rootUrl;
  singleDoc =  this.rootUrl + '/ticket/details-by-id/';
  categoriesUrl = this.rootUrl + '/ticket/categories';
  subCategoriesUrl = this.rootUrl + '/ticket/subcategories';
  insertUrl = this.rootUrl + '/ticket/add-ticket';
  retriveUserTicketsUrl = this.rootUrl + '/ticket/ticket-list';
  ticketsCountByUserUrl = this.rootUrl + '/ticket/raised-ticket-count'; 
  serachTicketsUrl = this.rootUrl + '/ticket/ticket-list'; 
  commentUrl =  this.rootUrl + '/comment/add-comment'; 
  replayCommentUrl =  this.rootUrl + '/comment/add-replycomment'; 
  updateTicket = this.rootUrl +'/ticket/update-ticket';
  addingRating = this.rootUrl +'/ticket/ticket-rating';
 
  constructor(@Inject(Http) public http: Http) { }

   //retrving categories api
   retriveCategories() {
    return this.http.get(this.categoriesUrl).map((uresponse: Response) => {
      return uresponse.json();
    });
  }

 //retrving categories api
 retriveAllTicketsCount(response) {
  return this.http.get(this.ticketsCountByUserUrl+'/'+response).map((uresponse: Response) => {
    return uresponse.json();
  });
}


//retrving categories api
searchTickets(userDetails) {
  return this.http.post(
    this.serachTicketsUrl,
    userDetails).map((uresponse: Response) => {
      // this.userData=uresponse.json();
      return uresponse.json();
    }, error => {
      console.log(error);
    });
}


//adding comment api
addingComment(userDetails) {
  return this.http.post(
    this.commentUrl,
    userDetails).map((uresponse: Response) => {
      // this.userData=uresponse.json();
      return uresponse.json();
    }, error => {
      console.log(error);
    });
}

//adding replay comment api
addingReplayComment(userDetails) {
  // console.log('replayComment',userDetails);
  return this.http.post(
    this.replayCommentUrl,
    userDetails).map((uresponse: Response) => {
      // this.userData=uresponse.json();
      return uresponse.json();
    }, error => {
      console.log(error);
    });
}

//retrving categories api
retriveAllUserTickets(userDetails) {
  return this.http.post(
    this.retriveUserTicketsUrl,
    userDetails).map((uresponse: Response) => {
      // this.userData=uresponse.json();
      return uresponse.json();
    }, error => {
      console.log(error);
    });
}

//retrving single doc  api
retriveSingleTicket(docId) {
  return this.http.get(this.singleDoc+'/'+docId).map((uresponse: Response) => {
    return uresponse.json();
  });
}

  //retrving Sub categories api
  retriveSubCategories(subCategory) {
    return this.http.post(
      this.subCategoriesUrl,
      subCategory).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }

//inserting document
insertDocument(data) {
  // console.log('insad',data);
    return this.http.post(
      this.insertUrl,
      data).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }

  //updating document
  updateDocument(data) {
    return this.http.post(
      this.updateTicket,
      data).map((uresponse: Response) => {
        // this.userData=uresponse.json();
        return uresponse.json();
      }, error => {
        console.log(error);
      });
  }

  //updating rating
    updateRating(data) {
      return this.http.post(
        this.addingRating,
        data).map((uresponse: Response) => {
          // this.userData=uresponse.json();
          return uresponse.json();
        }, error => {
          console.log(error);
        });
    }

}
