import { Component, OnInit } from '@angular/core';
import { AdminTeamService } from '../../services/admin-team.service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Sort } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

export interface Dessert {
  Assigned: number;
  Esacalated: number;
  Name: string;
  LoginId: string;
  RoleName: string;
  ServiceTime: string;
  Solved: number;
  TeamName: string;
}

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.scss']
})

@Pipe({
  name: 'AdminTeamComponent'
})

export class AdminTeamComponent implements OnInit {
  user(arg0: any, arg1: any): any {
    throw new Error("Method not implemented.");
  }
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  noDataDiv = false;
  viewMode = false;
  UserObject;
  allDocList;
  loader = false;
  name;
  searchDocs;
  desserts: Dessert[] = [];

  sortedData: Dessert[];

  constructor(public adminTeamService: AdminTeamService, public location: Location, public router: Router) {
    this.sortedData = this.desserts.slice();
  }

  ngOnInit() {

    var userInfo = localStorage.getItem('auth');
    this.UserObject = JSON.parse(userInfo);

    //retrving all doc details
    this.getListOfUsers()


  }

  showView() {

    this.viewMode = !this.viewMode;
  }

  //getting users list
  getListOfUsers() {

    var requestObject = {
      "team": this.UserObject.RoleName,
      "deptartment": this.UserObject.TeamName
    }

    this.adminTeamService.allTicketsList(requestObject).subscribe(res => {
      // console.log("All datta ashd ",res);
      this.noDataDiv = false;
      this.searchDocs = res.UserDetails;
      this.desserts = res.UserDetails;
      this.sortedData = res.UserDetails;
      this.allDocList = res.UserDetails;
      this.loader = true;
    }, error => {
      console.log(error);
    })

  }

  //passing data to another component
  fullAgentDetails(docDeatils) {
    // alert("routing calling");
    //  this.router.navigate(['team-member', docDeatils.LoginId]);
    this.adminTeamService.replay.next(docDeatils.LoginId);
  }


  //for data table filter
  sortData(sort: Sort) {
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Assigned': return compare(a.Assigned, b.Assigned, isAsc);
        case 'Esacalated': return compare(a.Esacalated, b.Esacalated, isAsc);
        case 'Name': return compare(a.Name, b.Name, isAsc);
        case 'LoginId': return compare(a.LoginId, b.LoginId, isAsc);
        case 'RoleName': return compare(a.RoleName, b.RoleName, isAsc);
        case 'ServiceTime': return compare(a.ServiceTime, b.ServiceTime, isAsc);
        case 'Solved': return compare(a.Solved, b.Solved, isAsc);
        case 'TeamName': return compare(a.TeamName, b.TeamName, isAsc);
        default: return 0;
      }
    });
    //sort data method
  }



  assignCopy() {
    this.allDocList = Object.assign([], this.searchDocs);
  }


  //search value
  filterItem(value) {

    this.noDataDiv = false;
    if (value === 'HR' || value === 'IT' || value === 'hr' || value === 'it' || value === 'APPS' || value === 'apps') {
      //checking this condition if filter dont have records with name then executing
      this.searchBasedonTeam(value);

    } else {

      //this is for main cards , Its searching based on Names
      if (!value) this.assignCopy(); //when nothing has typed
      this.allDocList = Object.assign([], this.searchDocs).filter(
        item => item.Name.toLowerCase().indexOf(value.toLowerCase()) > -1
      )

      //this is for table cards , Its searching based on Names
      if (!value) this.assignCopy(); //when nothing has typed
      this.sortedData = Object.assign([], this.searchDocs).filter(
        item => item.Name.toLowerCase().indexOf(value.toLowerCase()) > -1
      )

      //checking this condition if both are dont have list then passing the no tickets div
      if (this.allDocList.length <= 0 || this.sortedData.length <= 0) {

        //this is for main cards, Its searching based on login Id's
        if (!value) this.assignCopy(); //when nothing has typed
        this.allDocList = Object.assign([], this.searchDocs).filter(
          item => item.LoginId.toLowerCase().indexOf(value.toLowerCase()) > -1
        )

        //this is for table cards , Its searching based on login Id's
        if (!value) this.assignCopy(); //when nothing has typed
        this.sortedData = Object.assign([], this.searchDocs).filter(
          item => item.LoginId.toLowerCase().indexOf(value.toLowerCase()) > -1
        )

        if (this.allDocList.length <= 0 || this.sortedData.length <= 0) {
          this.noDataDiv = true;
        }

      }

    }

  }

  //searching based on team
  searchBasedonTeam(value) {
    //checking this condition for based on team 
    if (!value) this.assignCopy(); //when nothing has typed
    this.allDocList = Object.assign([], this.searchDocs).filter(
      item => item.TeamName.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
    //this is for table cards
    if (!value) this.assignCopy(); //when nothing has typed
    this.sortedData = Object.assign([], this.searchDocs).filter(
      item => item.TeamName.toLowerCase().indexOf(value.toLowerCase()) > -1
    )

    //checking this condition if both are dont have list then passing the no tickets div
    if (this.allDocList.length <= 0 || this.sortedData.length <= 0) {
      this.noDataDiv = true;
    }

  }


  //closing of main class
}


function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}