import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import * as firebase from 'firebase';
import { TicketsAssignService } from '../../services/tickets-assign.service';
import { UsermoduleService } from '../../services/usermodule.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { error } from 'util';
import { FcmNotificationsService } from '../../services/fcm-notifications.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { MatAutocompleteSelectedEvent } from '@angular/material';

export interface State {

  LoginId: string;
  Name: string;
  TicketCount: string;
}

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  p1image: any;
  p2image: any;
  p3image: any;
  p4image: any;
  topPerform: any;
  lowPerform: any;
  stateCtrl = new FormControl();
  stateCtrl1 = new FormControl();
  stateCtrl2 = new FormControl();
  stateCtrl3 = new FormControl();

  filteredStates0: Observable<State[]>;
  filteredStates1: Observable<State[]>;
  filteredStates2: Observable<State[]>;
  filteredStates3: Observable<State[]>;

  noGraphsFound1: boolean = false;
  data4: any[];
  compareMatrics: string = '';
  toggle: boolean = true;
  compareAgentArray: any = [];
  person1: string = '';
  person2: string = '';
  person3: string = '';
  person4: string = '';
  agentName1: string = '';
  agentName2: string = '';
  agentName3: string = '';
  agentName4: string = '';
  highLightSelect1: boolean = false;
  departmentValue1: string = '';
  mydate1: string;
  hideDate: boolean = false;
  date: Date;
  startdate1: any;
  enddate1: any;
  loader: boolean = false;
  mydate: any = {};
  type: any;
  states: State[] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  lineChartLabels1: any = [];
  departmentValue: string = '';
  subcatValue1: string = '';
  subcatValue2: string = '';
  agentValueObject: any = [];
  locationObject: any = [
    { name: "Miracle City	" },
    { name: "Miracle Heights " },
    { name: "LB Colony " },
    { name: "  HQ(Novi)" },
    { name: "Onsite India	" },
    { name: "Atlanta	" },
    { name: "Bentonville	" },
    { name: " Cincinnati	" },
    { name: " US - Other	" },
    { name: "Work From Home	" },
    { name: "Miracle Valley	" },

  ];
  compareEnable: boolean = false;
  subCategoryNames: any = [];
  itLowPerformLoginId: any;
  itBasedOnLowClosedServicetime: any;
  itBasedOnBestClosedServicetime: any;
  itBestPerformLoginId: any;
  hrBasedOnLowClosedServicetime: any;
  hrLowPLoginId: any;
  hrBasedOnBestClosedServicetime: any;
  hrBestPerformLoginId: any;
  AppsBasedOnLowClosedServicetime: any;
  appsLowPLoginId: any;
  AppsBasedOnClosedServicetime: any;
  appsBestPLoginId: string;
  BasedOnClosedServicetime: any;
  openTicketUpdateTime: any;
  totalTicketsCount: any;
  totalDashBoardData: any;
  AppsPerformDetails: any;
  AppsBestPerByTicketsClosed: any;
  HRPerformerDetails: any;
  ITPerformerDetails: any;
  openticketDetsils: any;
  AvgServiceTimeCount: any;
  AvgServiceTimeByTick: any;
  openTicketsCount: any;
  showDiv = 'closeTicket';
  showLowDiv = 'closeTicket';
  mainLoader: boolean = false;
  message;
  data1: any = [];
  data2: any = [];
  data3: any = [];
  startdate: string = '';
  enddate: string = '';
  hideService: boolean = true;
  hideService1: boolean = true;
  private placeholder: string = 'Select a date';

  //date picker
  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '34px',
    width: '260px',
    inline: false,
    alignSelectorRight: false,
    indicateInvalidDateRange: true
  };
  // public lineChartData1: any = [{data:Array,labels:''},{data:Array,labels:''},{data:Array,labels:''},{data:Array,labels:''}];

  public lineChartData: any = [];
  public lineChartLabels: any = [];
  data: { labels: string[]; datasets: { label: string; data: number[] }, };
  Appsgraphdatapanel: any[];
  Appsgraphdatapanelinner: any[];
  Itgraphdatapanel: any[];
  ITgraphdatapanelinner: any[];

  // events




  public lineChartOptions: any = {
    responsive: true,
    options: {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Tickets '
          }
        }]
      }
    }

  };

  //clors for chhart
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(119,201,221,0)',
      borderColor: 'rgba(0,170,231,1)',
      pointBackgroundColor: 'rgba(0,170,231,1)',
      pointBorderColor: 'rgba(0,170,231,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,170,231,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(20,59,89,0)',
      borderColor: 'rgba(13,65,107,1)',
      pointBackgroundColor: 'rgba(13,65,107,1)',
      pointBorderColor: 'rgba(13,65,107,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(140,140,140,0)',
      borderColor: 'rgba(239,64,72,1)',
      pointBackgroundColor: 'rgba(239,64,72,1)',
      pointBorderColor: 'rgba(239,64,72,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // 
      backgroundColor: 'rgba(239,64,72,0)',
      borderColor: 'rgba(35,37,39,1)',
      pointBackgroundColor: 'rgba(35,37,39,1)',
      pointBorderColor: 'rgba(35,37,39,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  startdate2: Date;
  enddate2: Date;
  enddate3: string;
  startdate3: string;
  subcatValue22: any;
  highLightSelect: boolean = false;
  highLightSelect2: boolean = false;

  pieChartData: any = {

  };

  pieChartData1: any = {

  };
  pieChartData2: any = {

  };
  departmentGraphChartDataObject: any = {

  };
  barchatForCategory: any = {

    chartType: 'BarChart',
    dataTable: [["Category", '', { role: "style" }],
      // ["Copper", 8.94, "color:#00aae7"],
      // ["Silver", 10.49, "silver"],
      // ["Gold", 19.30, "gold"],
      // ["Platinum", 21.45, "color: #e5e4e2"]
    ]
  }
  dpartMentDatapanel: any = [];
  dpartMentDatapanelInner: any = [];
  HRgraphdatapanel: any = [];
  HRgraphdatapanelinner: any = [];
  disabled: boolean;
  disabled1: boolean;
  compareDatapanel: any = []
  compareDatapanelInner: any = [];
  topCategoryDatapanel: any = [];
  topCategoryDatapanelInner: any = [];
  person1Index: number;
  person2Index: number;
  person3Index: number;
  person4Index: number;
  person1Object: State;
  person2Object: State;
  person3Object: State;
  person4Object: State;
  conform1: boolean = false;
  conform2: boolean = false;
  conform3: boolean = false;
  conform4: boolean = false;
  noGraphsFound: boolean = false;
  checkGraphData: any = [];
  mydate3: any = {};
  loder1: boolean = false;
  highLightSelect3: boolean;
  UserObject;
  solvedTicketsLength:number;
  escalatedListLength:number;
  assignedListLength:number;
  unAssignedListLength:number;

  

  // events
  public chartClicked(e: any): void {
    //console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
  // Initialized to specific date (09.10.2018).
  // public model: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor(public dashBoardService: DashboardService, public ticketsAssignServ: TicketsAssignService, public userModulService: UsermoduleService, private fcmNotifications: FcmNotificationsService) {
    this.filteredStates0 = this.stateCtrl.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates(state) : this.states.slice()));

    this.filteredStates1 = this.stateCtrl1.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates1(state) : this.states.slice()));

    this.filteredStates2 = this.stateCtrl2.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates2(state) : this.states.slice()));

    this.filteredStates3 = this.stateCtrl3.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates3(state) : this.states.slice()));
  }


  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => { return state.LoginId.toLowerCase().indexOf(filterValue) === 0 || state.Name.toLowerCase().indexOf(filterValue) === 0 });

  }
  private _filterStates1(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => { return state.LoginId.toLowerCase().indexOf(filterValue) === 0 || state.Name.toLowerCase().indexOf(filterValue) === 0 });
  }
  private _filterStates2(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => { return state.LoginId.toLowerCase().indexOf(filterValue) === 0 || state.Name.toLowerCase().indexOf(filterValue) === 0 });
  }
  private _filterStates3(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => { return state.LoginId.toLowerCase().indexOf(filterValue) === 0 || state.Name.toLowerCase().indexOf(filterValue) === 0 });
  }


  ngOnInit() {

    this.topPerform = "Tickets Closed";
    this.lowPerform = "Tickets Closed";

    this.getAllTopServiceDocs();
    // this.getAllLowServiceDocs();

    setTimeout(() => {
      // console.log("hello");
      this.ticketTopCloseData();
      this.ticketLowCloseData();
    }, 4000);

    var userInfo = localStorage.getItem('auth');
    this.UserObject = JSON.parse(userInfo);

    

    

    // this.date = new Date();
    // var date1 = new Date(date.getFullYear(), 0, 1);

    // this.startdate1 = date1;
    // this.enddate1 = date;
    // this.startdate2 = date1;
    // this.enddate2 = date;
    let date = new Date();
    let month1 = date.getMonth() + 1;
    let sdates = new Date();
    sdates.setDate(sdates.getDate() - 6);
    let monthsstart = sdates.getMonth() + 1;
    this.startdate = sdates.getFullYear() + '-' + monthsstart + '-' + sdates.getDate();
    this.enddate = date.getFullYear() + '-' + month1 + '-' + date.getDate();
    this.startdate1 = sdates.getFullYear() + '-' + monthsstart + '-' + sdates.getDate();
    this.enddate1 = date.getFullYear() + '-' + month1 + '-' + date.getDate();
    this.mydate3 = {
      beginDate: { year: sdates.getFullYear(), month: sdates.getMonth() + 1, day: sdates.getDate() },
      endDate: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
    };
    this.mydate = {
      beginDate: { year: sdates.getFullYear(), month: sdates.getMonth() + 1, day: sdates.getDate() },
      endDate: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
    };

    let data =
      {
        "startdate": this.startdate,
        "enddate": this.enddate,
      }
    this.loader = true;
    // all teams total ticket count 
    this.dashBoardService.loadAllTeamTotal(data).subscribe(res => {
      if (res.length > 0) {
        //alert('called')
        this.loadgraphForAllDeparments(res);
        this.loader = false;

      }
      else {

        this.loader = true;
      }

    }, error => {
      this.loader = true;
    });

    let data12 = {
      "startdate": "",
      "enddate": "",
    }
    this.dashBoardService.getTopSubcategory(data12).subscribe(res => {
      if (res.Details.length > 0) {
        this.loadTopCategoryGraph(res)
        this.loader = false;
        this.noGraphsFound1 = false;
      }
      else {
        //this.loadTopCategoryGraph(res)
        this.loader = false;
        this.noGraphsFound1 = true;
      }



    }, error => {
      this.noGraphsFound1 = true;
      this.loader = true;
    }
    )
  }

  //return badges css status
  ngClassForIcons(value) {
    let data = '';
    if (this.topPerform === value) {
      data = 'fa fa-check text text-primary';
    } else if (this.topPerform === value) {
      data = 'fa fa-eye text text-primary';
    }
    return data;
  }

  //return badges css status
  ngClassForLowIcons(value) {
    let data1 = '';
   
    if (this.lowPerform === value) {
      data1 = 'fa fa-check text text-primary';
    } else if (this.lowPerform === value) {
      data1 = 'fa fa-eye text text-primary';
    }
    return data1;
  }

  loadTopCategoryGraph(res) {

    this.topCategoryDatapanel = [];
    this.topCategoryDatapanelInner = [];
    let array = res.Details;
    array.forEach((element, index) => {
      this.topCategoryDatapanelInner = [];
      this.topCategoryDatapanelInner.push(element.subCategory);
      this.topCategoryDatapanelInner.push(element.count);
      if (index === 0) {
        this.topCategoryDatapanelInner.push("color:#00aae7");
      }
      if (index === 1) {
        this.topCategoryDatapanelInner.push("color:#8c8c8c");
      }
      if (index === 2) {
        this.topCategoryDatapanelInner.push("color:#ef4048");
      }
      if (index === 3) {
        this.topCategoryDatapanelInner.push("color:#2368a0");
      }
      if (index === 4) {
        this.topCategoryDatapanelInner.push("color:#b7b2b3");
      } if (index === 5) {
        this.topCategoryDatapanelInner.push("color:#232527");
      }
      if (index === 6) {
        this.topCategoryDatapanelInner.push("color:#0d416b");
      }
      if (index === 7) {
        this.topCategoryDatapanelInner.push("color:#008000");
      }
      if (index === 8) {
        this.topCategoryDatapanelInner.push("rgba(239,64,72,0.7)");
      }
      if (index === 9) {
        this.topCategoryDatapanelInner.push("color:#7d8471");
      }


      this.topCategoryDatapanel.push(this.topCategoryDatapanelInner);

    });

    this.barchatForCategory = {

      chartType: 'BarChart',
      dataTable: [["Category", '', { role: "style" }],
      ...this.topCategoryDatapanel
      ],
      options: {
        height: 500, width: 'auto',

        hAxis: {
          textStyle: {
            fontName: 'Montserrat-regular , sans-serif',

          },
          title: 'Tickets',


        },
        legend: { position: 'none' }

      }
    }


  }


  loadgraphForAllDeparments(res) {
    this.dpartMentDatapanel = [];
    this.dpartMentDatapanelInner = [];
    let array = res;
    array.forEach(element => {
      this.dpartMentDatapanelInner = [];
      this.dpartMentDatapanelInner.push(element.Date);
      this.dpartMentDatapanelInner.push(element.Details[0].Total);
      this.dpartMentDatapanelInner.push(element.Details[1].Total);
      this.dpartMentDatapanelInner.push(element.Details[2].Total);
      this.dpartMentDatapanel.push(this.dpartMentDatapanelInner);
      this.checkGraphData.push(element.Details[0].Total)
      this.checkGraphData.push(element.Details[1].Total)
      this.checkGraphData.push(element.Details[2].Total)

    });
    let length = this.checkGraphData.length;
    let count = 0;
    this.checkGraphData.forEach(element => {
      if (element === 0) {
        count++;
      }
    });
    this.checkGraphData = [];
    if (count === length) {
      this.noGraphsFound = true;
    }
    else {
      this.noGraphsFound = false;
      this.departmentGraphChartDataObject = {
        chartType: 'LineChart',
        dataTable: [
          ['Time', 'APPS', 'HR', 'IT'],
          ...this.dpartMentDatapanel
        ],
        options: {
          'title': '', height: 400, width: 'auto',
          series: {
            0: { color: '#ef4048' },
            1: { color: '#2368a0' },
            2: { color: '#00aae7' },

          },
          is3D: true,
          allowHtml: true,
          vAxis: {
            title: 'Tickets',
            textStyle: {
              fontName: 'Montserrat-regular , sans-serif'

            }
          }
        },

      }
    }

  }


  callHrGraphData() {
    this.loader = true;
    let data11 =
      {
        "startdate": this.startdate,
        "enddate": this.enddate,
        "teamName": 'HR',
      }

    // all teams total ticket count 
    this.dashBoardService.loadAllTeamTotal(data11).subscribe(res => {
      if (res.length > 0) {
        this.loadgraphforHR(res);
        this.loader = false;
      }
      else {
        this.loader = true;
      }

    }, error => {
      this.loader = true;
    });

  }


  callItGraphData() {
    this.loader = true;
    let data13 =
      {
        "startdate": this.startdate,
        "enddate": this.enddate,
        "teamName": 'IT',
      }
    // all teams total ticket count 
    this.dashBoardService.loadAllTeamTotal(data13).subscribe(res => {
      if (res.length > 0) {
        this.loadgraphforIt(res);
        this.loader = false;
      }
      else {
        this.loader = true;
      }

    }, error => {
      this.loader = true;
    });
  }

  callAppsGraphData() {
    this.loader = true;
    let data12 =
      {
        "startdate": this.startdate,
        "enddate": this.enddate,
        "teamName": 'APPS',
      }
    // all teams total ticket count 
    this.dashBoardService.loadAllTeamTotal(data12).subscribe(res => {
      if (res.length > 0) {
        this.loadgraphforApps(res);
        this.loader = false;
      }
      else {
        this.loader = true;
      }

    }, error => {
      this.loader = true;
    });
  }


  loadgraphforHR(res) {
    this.HRgraphdatapanel = [];
    this.HRgraphdatapanelinner = [];
    this.checkGraphData = [];
    res.forEach((element) => {
      this.HRgraphdatapanelinner = [];
      this.HRgraphdatapanelinner.push(element.Date);
      this.HRgraphdatapanelinner.push(element.Details[0].Total);
      this.HRgraphdatapanelinner.push(element.Details[3].Total);
      this.HRgraphdatapanelinner.push(element.Details[6].Total);
      this.HRgraphdatapanelinner.push(element.Details[5].Total);
      this.checkGraphData.push(element.Details[0].Total)
      this.checkGraphData.push(element.Details[3].Total)
      this.checkGraphData.push(element.Details[6].Total)
      this.checkGraphData.push(element.Details[5].Total) 
      this.HRgraphdatapanel.push(this.HRgraphdatapanelinner)

    });



    let length = this.checkGraphData.length;
    let count = 0;
    this.checkGraphData.forEach(element => {
      if (element === 0) {
        count++;
      }
    });
    this.checkGraphData = [];
    if (count === length) {
      this.noGraphsFound = true;
    }
    else {
      this.noGraphsFound = false;
      this.departmentGraphChartDataObject = {
        chartType: 'LineChart',
        dataTable: [
          ['Time', 'Opened', 'Escalated', 'Completed', 'Solved'],
          ...this.HRgraphdatapanel
        ],
        options: {
          'title': '', height: 400, width: 'auto',
          series: {
            0: { color: '#b7b23b' },
            1: { color: '#2368a0' },
            2: { color: '#00aae7' },
            3: { color: '#ef4048' },
          },
          is3D: true,
          allowHtml: true,
          vAxis: {
            title: 'Tickets',
            textStyle: {
              fontName: 'Montserrat-regular , sans-serif',


            }
          }
        },

      };
    }
  }

  loadgraphforApps(res) {
    this.Appsgraphdatapanel = [];
    this.Appsgraphdatapanelinner = [];
    this.checkGraphData = [];

    res.forEach((element) => {
      this.Appsgraphdatapanelinner = [];
      this.Appsgraphdatapanelinner.push(element.Date);
      this.Appsgraphdatapanelinner.push(element.Details[0].Total);
      this.Appsgraphdatapanelinner.push(element.Details[3].Total);
      this.Appsgraphdatapanelinner.push(element.Details[6].Total);
      this.Appsgraphdatapanelinner.push(element.Details[5].Total);
      this.checkGraphData.push(element.Details[0].Total)
      this.checkGraphData.push(element.Details[3].Total)
      this.checkGraphData.push(element.Details[6].Total)
      this.checkGraphData.push(element.Details[5].Total)
      this.Appsgraphdatapanel.push(this.Appsgraphdatapanelinner)
      // this.HRgraphdatapanel[i] = [element.Date,element.Details[0],element.Details[3],element.Details[3],element.Details[1]]

      // this.HRgraphdatapanel[index] =new Array(4)
      // this.HRgraphdatapanel[index].push(element.Date)





    });


    let length = this.checkGraphData.length;
    let count = 0;
    this.checkGraphData.forEach(element => {
      if (element === 0) {
        count++;
      }
    });
    this.checkGraphData = [];
    if (count === length) {
      this.noGraphsFound = true;
    }
    else {
      this.noGraphsFound = false;
      this.departmentGraphChartDataObject = {
        chartType: 'LineChart',
        dataTable: [
          ['Time', 'Opened', 'Escalated', 'Completed', 'Solved'],
          ...this.Appsgraphdatapanel
        ],
        options: {
          'title': '', height: 400, width: 'auto', vAxis: {
            title: 'Tickets',
            textStyle: {
              fontName: 'Montserrat-regular , sans-serif',

            }
          },
          series: {
            0: { color: '#b7b23b' },
            1: { color: '#2368a0' },
            2: { color: '#00aae7' },
            3: { color: '#ef4048' },
          }
        },

      };
    }

  }


  loadgraphforIt(res) {
    this.Itgraphdatapanel = [];
    this.ITgraphdatapanelinner = [];
    this.checkGraphData = [];  

    res.forEach((element) => {
      this.ITgraphdatapanelinner = [];
      this.ITgraphdatapanelinner.push(element.Date);
      this.ITgraphdatapanelinner.push(element.Details[0].Total);
      this.ITgraphdatapanelinner.push(element.Details[3].Total);
      this.ITgraphdatapanelinner.push(element.Details[6].Total);
      this.ITgraphdatapanelinner.push(element.Details[5].Total);
      this.checkGraphData.push(element.Details[0].Total)
      this.checkGraphData.push(element.Details[3].Total)
      this.checkGraphData.push(element.Details[6].Total)
      this.checkGraphData.push(element.Details[5].Total)
      this.Itgraphdatapanel.push(this.ITgraphdatapanelinner)

    });
    let length = this.checkGraphData.length;
    let count = 0;
    this.checkGraphData.forEach(element => {
      if (element === 0) {
        count++;
      }
    });
    this.checkGraphData = [];
    if (count === length) {
      this.noGraphsFound = true;
    }
    else {
      this.noGraphsFound = false;
      this.departmentGraphChartDataObject = {
        chartType: 'LineChart',
        dataTable: [
          ['Time', 'Opened', 'Escalated', 'Completed', 'Solved'],
          ...this.Itgraphdatapanel
        ],
        options: {
          'title': '', height: 400, width: 'auto', vAxis: {
            title: 'Tickets',
            textStyle: {
              fontName: 'Montserrat-regular , sans-serif',

            }
          },
          series: {
            0: { color: '#b7b23b' },
            1: { color: '#2368a0' },
            2: { color: '#00aae7' },
            3: { color: '#ef4048' },
          }
        },

      };
    }

  }


  // graph data starting 
  loadgraph(res) {

    this.lineChartData = []
    this.lineChartLabels.length = 0;
    this.lineChartLabels1 = [];
    this.lineChartLabels = [];
    this.data1 = [];
    this.data2 = [];
    this.data3 = [];
    if (this.chart !== undefined) {
      this.chart.ngOnDestroy();
      this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
    }

    for (let i = 0; i < res.length; i++) {

      if (res[i].Details[0].Name === 'Apps') {
        this.data1.push(res[i].Details[0].Total);
      }
      if (res[i].Details[1].Name === 'HR') {
        this.data2.push(res[i].Details[1].Total);
      }
      if (res[i].Details[2].Name === 'IT') {
        this.data3.push(res[i].Details[2].Total);
      }
      //this.lineChartData.push(res[i].Details);
      this.lineChartLabels1.push(res[i].Date);
      if (i === res.length - 1) {

        let d1 = {
          "data": this.data1,
          "label": res[i].Details[0].Name

        };
        let d2 = {
          "data": this.data2,
          "label": res[i].Details[1].Name
        };
        let d3 = {
          "data": this.data3,
          "label": res[i].Details[2].Name
        };
        this.lineChartData.push(d1);
        this.lineChartData.push(d2);
        this.lineChartData.push(d3);
        this.lineChartLabels = this.lineChartLabels1;
        setTimeout(() => {
          if (this.chart && this.chart.chart) {
            this.chart.chart.config.data.labels = this.lineChartLabels;
            //this.chart.chart.config.data.datasets = this.lineChartData;
            this.chart.chart.update();
          }
        }, 0);

      }


    }

  }

  nameString(name) {

    if (name.length > 9) {
      return name.substr(0, 9) + ' ...';
    }
    else {
      return name;
    }


  }

  getAllTopServiceDocs() {
    this.topPerform = "Service Time";
    this.hideService = false;
    this.showDiv = 'serviceTime';
    this.dashBoardService.getSeriveTimeDocs().subscribe(res => {
      //loader
      // alert("alert");
      this.mainLoader = true;
      // console.log("service time",res);
      this.totalDashBoardData = res;

      //apps team top performance object access  
      this.AppsPerformDetails = res.AppsPerformerDetails[0];
      this.appsBestPLoginId = res.AppsPerformerDetails[0].AppsBestPerformer.LoginId;

      this.AppsBasedOnClosedServicetime = res.AppsPerformerDetails[0].AppsBestPerformer.Servicetime;


      //hr team top performance object access 
      this.HRPerformerDetails = res.HRPerformerDetails[0];
      this.hrBestPerformLoginId = res.HRPerformerDetails[0].HrBestPerformerByServiceTime.LoginId;
      this.hrBasedOnBestClosedServicetime = res.HRPerformerDetails[0].HrBestPerformerByServiceTime.Servicetime;


      //it top performance
      this.ITPerformerDetails = res.ITPerformerDetails[0];
      this.itBestPerformLoginId = res.ITPerformerDetails[0].ItBestPerformerByServiceTime.LoginId;
      this.itBasedOnBestClosedServicetime = res.ITPerformerDetails[0].ItBestPerformerByServiceTime.Servicetime;



      //average service time
      this.AppsBestPerByTicketsClosed = res.AverageServiceTimeByTotalTickets[0];
      this.AvgServiceTimeCount = res.AverageServiceTimeByTotalTickets[0].AvgServiceTime;
      this.AvgServiceTimeByTick = res.AverageServiceTimeByTotalTickets[0].totalTicketsforAvgServiceTime;


      //for open tickets function
      this.openticketDetsils = res.openticketDetails[0];
      this.openTicketsCount = res.openticketDetails[0].TotalTickets;
      this.openTicketUpdateTime = res.openticketDetails[0].updatedTime

      //low service docs
      this.ticketLowCloseData();
      // this.ticketTopCloseData();



    }, error => {
      console.log(error);
    })

  }


  ticketTopCloseData() {
    this.topPerform = "Tickets Closed"
    this.hideService = true;
    this.showDiv = 'closeTicket';
    let res = this.totalDashBoardData;
    //apps team top performance object access  
    // console.log("top ",res)
    this.AppsPerformDetails = res.AppsPerformerDetails[0];
    this.appsBestPLoginId = res.AppsPerformerDetails[0].AppsBestPerformerByTicketsClosed.LoginId;
    this.AppsBasedOnClosedServicetime = res.AppsPerformerDetails[0].AppsBestPerformerByTicketsClosed.TotalTicketsClosed;

    //hr team top performance object access 
    this.HRPerformerDetails = res.HRPerformerDetails[0];
    this.hrBestPerformLoginId = res.HRPerformerDetails[0].HrBestPerformerByTicketCount.LoginId;
    this.hrBasedOnBestClosedServicetime = res.HRPerformerDetails[0].HrBestPerformerByTicketCount.TotalTicketsClosed;


    //it top performance
    this.ITPerformerDetails = res.ITPerformerDetails[0];
    this.itBestPerformLoginId = res.ITPerformerDetails[0].ItBestPerformerByTicketCount.LoginId;
    this.itBasedOnBestClosedServicetime = res.ITPerformerDetails[0].ItBestPerformerByTicketCount.TotalTicketsClosed;

    // low closed 
    //this.ticketLowCloseData()
  }

  getAllLowServiceDocs() {
    this.lowPerform = "Service Time";
    this.hideService1 = false;
    this.showLowDiv = 'serviceTime';

    let res = this.totalDashBoardData;
    // console.log("inside all docs",res)
    //apps team low performance object access  
    this.appsLowPLoginId = res.AppsPerformerDetails[0].AppsLowPerformer.LoginId;
    this.AppsBasedOnLowClosedServicetime = res.AppsPerformerDetails[0].AppsLowPerformer.Servicetime;

    //hr team low performance object access 
    this.hrLowPLoginId = res.HRPerformerDetails[0].HrLowPerformerByServiceTime.LoginId;
    this.hrBasedOnLowClosedServicetime = res.HRPerformerDetails[0].HrLowPerformerByServiceTime.Servicetime;

    //it low performance
    this.itLowPerformLoginId = res.ITPerformerDetails[0].ItLowPerformerByServiceTime.LoginId;
    this.itBasedOnLowClosedServicetime = res.ITPerformerDetails[0].ItLowPerformerByServiceTime.Servicetime;

  }


  ticketLowCloseData() {
    this.lowPerform = "Tickets Closed";
    this.hideService1 = true;
    this.showLowDiv = 'closeTicket';

    let res = this.totalDashBoardData;

    //apps team low performance object access  
    this.appsLowPLoginId = res.AppsPerformerDetails[0].AppsLowPerformerByTicketsClosed.LoginId;
    this.AppsBasedOnLowClosedServicetime = res.AppsPerformerDetails[0].AppsLowPerformerByTicketsClosed.TotalTicketsClosed;

    //hr team low performance object access 
    this.hrLowPLoginId = res.HRPerformerDetails[0].HrLowPerformerByTicketCount.LoginId;
    this.hrBasedOnLowClosedServicetime = res.HRPerformerDetails[0].HrLowPerformerByTicketCount.TotalTicketsClosed;

    //it low performance
    this.itLowPerformLoginId = res.ITPerformerDetails[0].ItLowPerformerByTicketCount.LoginId;
    this.itBasedOnLowClosedServicetime = res.ITPerformerDetails[0].ItLowPerformerByTicketCount.TotalTicketsClosed;

  }

  genrateGraph1() {
    this.loder1 = true;
    this.barchatForCategory = {};
    let data12 = {
      "startdate": this.startdate1,
      "enddate": this.enddate1,
    }
    this.dashBoardService.getTopSubcategory(data12).subscribe(res => {

      if (res.Details.length > 0) {
        this.loadTopCategoryGraph(res)
        this.loder1 = false;
        this.noGraphsFound1 = false;
      }
      else {
        this.loder1 = false;
        this.noGraphsFound1 = true;

      }

    }, error => {
      this.loder1 = true;
      this.noGraphsFound1 = true;
    }
    )
  }

  onDateRangeChangedForTop(event: IMyDateRangeModel) {
    this.startdate1 = new Date(event.beginDate.year, event.beginDate.month - 1, event.beginDate.day);
    this.enddate1 = new Date(event.endDate.year, event.endDate.month - 1, event.endDate.day)
    // this.startdate1 = event.beginDate.day + '-' + event.beginDate.month + '-' + event.beginDate.year;
    //this.enddate1 = event.endDate.day + '-' + event.endDate.month + '-' + event.endDate.year;

    this.startdate1 = event.beginDate.year + '-' + event.beginDate.month + '-' + event.beginDate.day;
    this.enddate1 = event.endDate.year + '-' + event.endDate.month + '-' + event.endDate.day;

    if (this.startdate === '0-0-0' && this.enddate === '0-0-0' && this.departmentValue === "" && this.subcatValue2 === '') {
      //this.loader = true;
      let date = new Date();
      let month1 = date.getMonth() + 1;
      let sdates = new Date();
      sdates.setDate(sdates.getDate() - 6);
      let monthsstart = sdates.getMonth() + 1;
      this.startdate1 = sdates.getFullYear() + '-' + monthsstart + '-' + sdates.getDate();
      this.enddate1 = date.getFullYear() + '-' + month1 + '-' + date.getDate();
      this.mydate3 = {
        beginDate: { year: sdates.getFullYear(), month: sdates.getMonth(), day: sdates.getDate() },
        endDate: { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() }
      };
    }



  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    this.startdate1 = new Date(event.beginDate.year, event.beginDate.month - 1, event.beginDate.day);
    this.enddate1 = new Date(event.endDate.year, event.endDate.month - 1, event.endDate.day)
    // this.startdate1 = event.beginDate.day + '-' + event.beginDate.month + '-' + event.beginDate.year;
    //this.enddate1 = event.endDate.day + '-' + event.endDate.month + '-' + event.endDate.year;

    this.startdate = event.beginDate.year + '-' + event.beginDate.month + '-' + event.beginDate.day;
    this.enddate = event.endDate.year + '-' + event.endDate.month + '-' + event.endDate.day;

    if (this.startdate === '0-0-0' && this.enddate === '0-0-0' && this.departmentValue === "" && this.subcatValue2 === '') {
      //this.loader = true;
      let date = new Date();
      let month1 = date.getMonth() + 1;
      let sdates = new Date();
      sdates.setDate(sdates.getDate() - 6);
      let monthsstart = sdates.getMonth() + 1;
      this.startdate = sdates.getFullYear() + '-' + monthsstart + '-' + sdates.getDate();
      this.enddate = date.getFullYear() + '-' + month1 + '-' + date.getDate();
   
    }
    else if (this.startdate === '0-0-0' && this.enddate === '0-0-0' && this.departmentValue !== "" && this.subcatValue2 !== '') {
      //this.loader = true;
      let date = new Date();
      let month1 = date.getMonth() + 1;
      let sdates = new Date();
      sdates.setDate(sdates.getDate() - 6);
      let monthsstart = sdates.getMonth() + 1;
      this.startdate = sdates.getFullYear() + '-' + monthsstart + '-' + sdates.getDate();
      this.enddate = date.getFullYear() + '-' + month1 + '-' + date.getDate();

    }
    else if (this.startdate !== '0-0-0' && this.enddate !== '0-0-0' && this.departmentValue !== "" && this.subcatValue2 !== '') {
    
    }
    else if (this.startdate === '0-0-0' && this.enddate === '0-0-0' && this.departmentValue !== "" && this.subcatValue2 === '') {
      //this.loader = true;
      let date = new Date();
      let month1 = date.getMonth() + 1;
      let sdates = new Date();
      sdates.setDate(sdates.getDate() - 6);
      let monthsstart = sdates.getMonth() + 1;
      this.startdate = sdates.getFullYear() + '-' + monthsstart + '-' + sdates.getDate();
      this.enddate = date.getFullYear() + '-' + month1 + '-' + date.getDate();
     
    }

    else if (this.departmentValue !== "") {
     
    }
    else if (this.departmentValue !== "" && this.subcatValue2 !== '') {

    }
    else {
     
    }

   
    // event properties are: event.beginDate, event.endDate, event.formatted,
    // event.beginEpoc and event.endEpoc
  }


  selected1(event: MatAutocompleteSelectedEvent) {
    this.conform1 = true;
    this.p1image = event.option.value;
    this.compareAgentArray.push(this.person1);

    this.stateCtrl.disable()
    this.person1Index = this.states.findIndex((element => element.LoginId === this.person1));
    
    this.person1Object = this.states[this.person1Index]

    this.states.splice(this.person1Index, 1);


    this.filteredStates0 = this.stateCtrl.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates(state) : this.states.slice()));

    this.filteredStates1 = this.stateCtrl1.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates1(state) : this.states.slice()));

    this.filteredStates2 = this.stateCtrl2.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates2(state) : this.states.slice()));

    this.filteredStates3 = this.stateCtrl3.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates3(state) : this.states.slice()));
    if (this.person1 != '' && this.person2 != '') {
      this.stateCtrl2.enable();
      this.stateCtrl3.enable();
    } else {
      this.stateCtrl2.disable();
      this.stateCtrl3.disable();
    }
    if (this.person1.length > 7) {
      this.person1 = this.person1.substring(0, 6) + '...';
    }

  }
  selected2(event: MatAutocompleteSelectedEvent) {

    this.p2image = event.option.value;
    this.person2 = event.option.value;
    this.conform2 = true;
    this.compareAgentArray.push(this.person2);
    // if(this.person1 === ''){
    //   this.compareAgentArray[0] = this.person2;
    // }else{

    //   this.compareAgentArray[1] = this.person2;


    // }
    this.stateCtrl1.disable()
    this.person2Index = this.states.findIndex((element => element.LoginId === this.person2));
    this.person2Object = this.states[this.person2Index]
    this.states.splice(this.person2Index, 1);

    this.filteredStates0 = this.stateCtrl.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates(state) : this.states.slice()));

    this.filteredStates1 = this.stateCtrl1.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates1(state) : this.states.slice()));

    this.filteredStates2 = this.stateCtrl2.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates2(state) : this.states.slice()));

    this.filteredStates3 = this.stateCtrl3.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates3(state) : this.states.slice()));
    if (this.person1 != '' && this.person2 != '') {
      this.stateCtrl2.enable();
      this.stateCtrl3.enable();
    } else {
      this.stateCtrl2.disable();
      this.stateCtrl3.disable();
    }
    if (this.person2.length > 7) {
      this.person2 = this.person2.substring(0, 6) + '...';
    }
  }

  selected3(event: MatAutocompleteSelectedEvent) {
    this.conform3 = true;
    this.p3image = event.option.value;
    this.person3 = event.option.value;


    this.compareAgentArray.push(this.person3);

    this.stateCtrl2.disable()
    this.person3Index = this.states.findIndex((element => element.LoginId === this.person3));
    this.person3Object = this.states[this.person3Index]
    this.states.splice(this.person3Index, 1);



    this.filteredStates0 = this.stateCtrl.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates(state) : this.states.slice()));

    this.filteredStates1 = this.stateCtrl1.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates1(state) : this.states.slice()));

    this.filteredStates2 = this.stateCtrl2.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates2(state) : this.states.slice()));

    this.filteredStates3 = this.stateCtrl3.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates3(state) : this.states.slice()));
    if (this.person3.length > 7) {
      this.person3 = this.person3.substring(0, 6) + '...';
    }

  }


  selected4(event: MatAutocompleteSelectedEvent) {
    this.conform4 = true;
    this.person4 = event.option.value;
    this.p4image = event.option.value;
    this.compareAgentArray.push(this.person4);
    this.stateCtrl3.disable()
    this.person4Index = this.states.findIndex((element => element.LoginId === this.person4));
    this.person4Object = this.states[this.person4Index]
    this.states.splice(this.person4Index, 1);

    this.filteredStates0 = this.stateCtrl.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates(state) : this.states.slice()));

    this.filteredStates1 = this.stateCtrl1.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates1(state) : this.states.slice()));

    this.filteredStates2 = this.stateCtrl2.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates2(state) : this.states.slice()));

    this.filteredStates3 = this.stateCtrl3.valueChanges
      .pipe(startWith(''), map(state => state ? this._filterStates3(state) : this.states.slice()));
    if (this.person4.length > 7) {
      this.person4 = this.person4.substring(0, 6) + '...';

    }


  }
  cancle1() {
    if (this.conform1 == true) {
      this.conform1 = false;

      this.compareAgentArray.splice(this.compareAgentArray.indexOf(this.p1image), 1);
      this.person1 = '';
      this.p1image = ''
      this.states.splice(this.person1Index, 0, this.person1Object);
      this.stateCtrl.enable()
      this.person1Index = -1;
      this.person1Object = null;
      this.filteredStates0 = this.stateCtrl.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates(state) : this.states.slice()));

      this.filteredStates1 = this.stateCtrl1.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates1(state) : this.states.slice()));

      this.filteredStates2 = this.stateCtrl2.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates2(state) : this.states.slice()));

      this.filteredStates3 = this.stateCtrl3.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates3(state) : this.states.slice()));
    } else {
      this.stateCtrl.setValue('');
      this.stateCtrl.enable()
    }




    if (this.person1 != '' && this.person2 != '') {
      this.stateCtrl2.enable();
      this.stateCtrl3.enable();
    } else {
      this.stateCtrl2.disable();
      this.stateCtrl3.disable();
    }
  }
  cancle2() {

    if (this.conform2 == true) {
      this.compareAgentArray.splice(this.compareAgentArray.indexOf(this.p2image), 1);
      // this.compareAgentArray.splice(1,1);
      this.person2 = '';
      this.p2image = '';
      this.states.splice(this.person2Index, 0, this.person2Object);
      this.stateCtrl1.enable()
      this.person2Index = -1;
      this.person2Object = null
      this.filteredStates0 = this.stateCtrl.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates(state) : this.states.slice()));

      this.filteredStates1 = this.stateCtrl1.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates1(state) : this.states.slice()));

      this.filteredStates2 = this.stateCtrl2.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates2(state) : this.states.slice()));

      this.filteredStates3 = this.stateCtrl3.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates3(state) : this.states.slice()));

    } else {
      this.stateCtrl1.setValue('');
      this.stateCtrl1.enable()
    }
    this.conform2 = false;



    if (this.person1 != '' && this.person2 != '') {
      this.stateCtrl2.enable();
      this.stateCtrl3.enable();
    } else {
      this.stateCtrl2.disable();
      this.stateCtrl3.disable();
    }
  }
  cancle3() {
    if (this.conform3 == true) {
      this.compareAgentArray.splice(this.compareAgentArray.indexOf(this.p3image), 1);
      this.person3 = '';
      this.p3image = '';
      this.states.splice(this.person3Index, 0, this.person3Object);
      this.stateCtrl2.enable()
      this.person3Index = -1;
      this.person3Object = null
      this.filteredStates0 = this.stateCtrl.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates(state) : this.states.slice()));

      this.filteredStates1 = this.stateCtrl1.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates1(state) : this.states.slice()));

      this.filteredStates2 = this.stateCtrl2.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates2(state) : this.states.slice()));

      this.filteredStates3 = this.stateCtrl3.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates3(state) : this.states.slice()));
    } else {
      this.stateCtrl2.setValue('');
      this.stateCtrl2.enable()
    }
    this.conform3 = false;


  }
  cancle4() {
    if (this.conform4 == true) {
      this.compareAgentArray.splice(this.compareAgentArray.indexOf(this.p4image), 1);
      // this.compareAgentArray.splice(3,1);
      this.person4 = '';
      this.p4image = '';
      this.states.splice(this.person4Index, 0, this.person4Object);
      this.stateCtrl3.enable()
      this.person4Index = -1;
      this.person4Object = null
      this.filteredStates0 = this.stateCtrl.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates(state) : this.states.slice()));

      this.filteredStates1 = this.stateCtrl1.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates1(state) : this.states.slice()));

      this.filteredStates2 = this.stateCtrl2.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates2(state) : this.states.slice()));

      this.filteredStates3 = this.stateCtrl3.valueChanges
        .pipe(startWith(''), map(state => state ? this._filterStates3(state) : this.states.slice()));
    } else {
      this.stateCtrl3.setValue('');
      this.stateCtrl3.enable()
    }
    this.conform4 = false;
  }

  // graphs dropdown selection methods  start here

  departmentSelect(event) {
    this.states = [];
    this.p1image = ''
    this.p2image = ''
    this.p3image = ''
    this.p4image = ''
    this.conform1 = false;
    this.conform2 = false;
    this.conform3 = false;
    this.conform4 = false;
    this.compareMatrics = '';
    this.compareAgentArray = [];
    this.subcatValue1 = '';
    this.subcatValue2 = '';
    this.person1 = '';
    this.person2 = '';
    this.person3 = '';
    this.person4 = '';
    this.stateCtrl.enable();
    this.stateCtrl1.enable();
    this.stateCtrl2.enable();
    this.stateCtrl3.enable();

    this.departmentValue = event.target.value || event.srcElement.value;
    if (this.departmentValue !== '') {
      this.disabled = false;
      this.highLightSelect2 = false;
      var usersListInputs = {

        "Authorization": "YWRtaW46YWRtaW4=",
        "roleName": 'Agent',
        "teamName": this.departmentValue
      }
      //Retrivingall agents list
      // this.retriveAgentList(usersListInputs);
      if (this.subcatValue1 === 'Agent' && this.departmentValue !== '') {

        var usersListInputs = {

          "Authorization": "YWRtaW46YWRtaW4=",
          "roleName": 'Agent',
          "teamName": this.departmentValue
        }
        //Retrivingall agents list
        this.retriveAgentList(usersListInputs);

      }

      if (this.subcatValue1 === 'Catageory' && this.departmentValue !== '') {
        this.selectCategory(this.departmentValue);
      }
      if (this.departmentValue !== "" && this.subcatValue2 === "") {

      }
      else if (this.departmentValue !== "" && this.subcatValue2 !== "") {
        
      }
    }
    else if (this.departmentValue === '') {
      this.disabled = true;
      this.highLightSelect2 = true;

    }




  }
  /// department selection ending ...





  loadGraph1(res) {
    //alert('called')
    this.lineChartData = [];
    this.lineChartLabels.length = 0;
    this.lineChartLabels1 = [];
    this.lineChartLabels = [];
    this.data1 = [];
    this.data2 = [];
    this.data3 = [];
    this.data4 = [];
    let array = res[0];
    let length = res[0].length;
    let innerArraylength = array[1].Details.length;
    for (let i = 0; i < length; i++) {
      let length1 = array[i].Details.length;
      for (let j = 0; j < length1; j++) {
        if (j === 0) {
          this.data1.push(array[i].Details[j].count)
        }
        if (j === 1) {
          this.data2.push(array[i].Details[j].count)
        }
        if (j === 2) {
          this.data3.push(array[i].Details[j].count)
        }
        if (j === 3) {
          this.data4.push(array[i].Details[j].count)
        }
      }

      this.lineChartLabels1.push(array[i].Date);



      if (i === length - 1) {




        if (innerArraylength === 2) {

          let d1 = {
            'data': this.data1,
            'label': array[i].Details[0].agent

          };
          let d2 = {
            'data': this.data2,
            'label': array[i].Details[1].agent
          };

          this.lineChartData.push(d1);
          this.lineChartData.push(d2);

        }
        else if (innerArraylength === 3) {
          let d1 = {
            'data': this.data1,
            'label': array[i].Details[0].agent

          };
          let d2 = {
            'data': this.data2,
            'label': array[i].Details[1].agent
          };
          let d3 = {
            'data': this.data3,
            'label': array[i].Details[2].agent
          };
          this.lineChartData.push(d1);
          this.lineChartData.push(d2);
          this.lineChartData.push(d3);
        } else if (innerArraylength === 4) {
          let d1 = {
            'data': this.data1,
            'label': array[i].Details[0].agent

          };
          let d2 = {
            'data': this.data2,
            'label': array[i].Details[1].agent
          };
          let d3 = {
            'data': this.data3,
            'label': array[i].Details[2].agent
          };
          let d4 = {
            'data': this.data4,
            'label': array[i].Details[3].agent
          };
          this.lineChartData.push(d1);
          this.lineChartData.push(d2);
          this.lineChartData.push(d3);
          this.lineChartData.push(d4);
        }

        this.lineChartLabels = this.lineChartLabels1;
        setTimeout(() => {
          if (this.chart && this.chart.chart) {
            this.chart.chart.config.data.labels = this.lineChartLabels;
            //this.chart.chart.config.data.datasets.labels = this.lineChartData;
            this.chart.chart.update();
            this.loader = false;
          }
        }, 0);

      }
    }
  }
  //load graph for compare 
  loadGraph(res) {
    this.lineChartData = [];
    this.lineChartLabels.length = 0;
    this.lineChartLabels1 = [];
    this.lineChartLabels = [];
    this.data1 = [];
    this.data2 = [];
    this.data3 = [];
    this.data4 = [];
    let array = res;
    let length = res.length;
    let innerArraylength = res[1].Details.length;
    for (let i = 0; i < length; i++) {
      let length1 = array[i].Details.length;
      for (let j = 0; j < length1; j++) {
        if (j === 0) {
          this.data1.push(array[i].Details[j].count)
        }
        if (j === 1) {
          this.data2.push(array[i].Details[j].count)
        }
        if (j === 2) {
          this.data3.push(array[i].Details[j].count)
        }
        if (j === 3) {
          this.data4.push(array[i].Details[j].count)
        }
      }

      this.lineChartLabels1.push(array[i].Date);



      if (i === length - 1) {




        if (innerArraylength === 2) {

          let d1 = {
            'data': this.data1,
            'label': res[i].Details[0].agent

          };
          let d2 = {
            'data': this.data2,
            'label': res[i].Details[1].agent
          };

          this.lineChartData.push(d1);
          this.lineChartData.push(d2);

        }
        else if (innerArraylength === 3) {
          let d1 = {
            'data': this.data1,
            'label': res[i].Details[0].agent

          };
          let d2 = {
            'data': this.data2,
            'label': res[i].Details[1].agent
          };
          let d3 = {
            'data': this.data3,
            'label': res[i].Details[2].agent
          };
          this.lineChartData.push(d1);
          this.lineChartData.push(d2);
          this.lineChartData.push(d3);
        } else if (innerArraylength === 4) {
          let d1 = {
            'data': this.data1,
            'label': res[i].Details[0].agent

          };
          let d2 = {
            'data': this.data2,
            'label': res[i].Details[1].agent
          };
          let d3 = {
            'data': this.data3,
            'label': res[i].Details[2].agent
          };
          let d4 = {
            'data': this.data4,
            'label': res[i].Details[3].agent
          };
          this.lineChartData.push(d1);
          this.lineChartData.push(d2);
          this.lineChartData.push(d3);
          this.lineChartData.push(d4);
        }

        this.lineChartLabels = this.lineChartLabels1;
        setTimeout(() => {
          if (this.chart && this.chart.chart) {
            this.chart.chart.config.data.labels = this.lineChartLabels;
            //this.chart.chart.config.data.datasets.labels = this.lineChartData;
            this.chart.chart.update();
            this.loader = false;
          }
        }, 0);

      }

    }


  }

  // individual status count based on team name
  loadgraph1(res) {
    this.lineChartData = []
    this.lineChartLabels.length = 0;
    this.lineChartLabels1 = [];
    this.lineChartLabels = [];
    this.data1 = [];
    this.data2 = [];
    this.data3 = [];
    if (this.chart !== undefined) {
      this.chart.ngOnDestroy();
      this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
    }
    for (let i = 0; i < res.length; i++) {

      if (res[i].Details[0].Name === 'Opened') {
        this.data1.push(res[i].Details[0].Total);
      }
      if (res[i].Details[3].Name === 'Escalated') {
        this.data2.push(res[i].Details[3].Total);
      }
      if (res[i].Details[6].Name === 'Completed') {
        this.data3.push(res[i].Details[6].Total);
      }
      // if (res[i].Details[6].Name === 'Completed') {
      //   this.data3.push(res[i].Details[6].Total);
      // }

      // this.lineChartData.push(res[i].Details);
      this.lineChartLabels1.push(res[i].Date);
      if (i === res.length - 1) {

        let d1 = {
          'data': this.data1,
          'label': res[i].Details[0].Name

        };
        let d2 = {
          'data': this.data2,
          'label': res[i].Details[3].Name
        };
        let d3 = {
          'data': this.data3,
          'label': res[i].Details[6].Name
        };
        this.lineChartData.push(d1);
        this.lineChartData.push(d2);
        this.lineChartData.push(d3);
        this.lineChartLabels = this.lineChartLabels1;
        setTimeout(() => {
          if (this.chart && this.chart.chart) {
            this.chart.chart.config.data.labels = this.lineChartLabels;
            this.chart.chart.update();
            this.loader = false;
          }
        }, 0);

      }


    }
  }

  // ending ....


  // for retriving all agent 
  retriveAgentList(usersListInputs) {
    this.ticketsAssignServ.agentNamesList(usersListInputs).subscribe(res => {
      this.loader = false;
      this.agentValueObject = res.UserList;

      this.states = this.agentValueObject;
    }, error => {
      console.log(error);
    })
  }
  /// ending


  /// sub category 
  selectCategory(teamName) {
    var subCategry = { "teamName": teamName };

    //Retriving sub Category list
    this.userModulService.retriveSubCategories(subCategry).subscribe(res => {
      this.subCategoryNames = res;
      this.loader = false;
    }, error => {
      console.log(error);
    })
  }
  /// ending


  // second dropdown 
  subSelect1(event) {

    this.conform1 = false;
    this.conform2 = false;
    this.conform3 = false;
    this.conform4 = false;
    this.compareMatrics = ''
    this.compareAgentArray = [];
    this.person1 = ''
    this.person2 = ''
    this.person3 = ''
    this.person4 = ''
    this.stateCtrl.enable();
    this.stateCtrl1.enable();
    this.stateCtrl2.disable();
    this.stateCtrl3.disable();
    if (this.departmentValue === '') {
      this.subcatValue1 = '';
      this.subcatValue2 = '';
      this.highLightSelect2 = true;

      this.disabled = true;
      //setTimeout(( )=>{this.highLightSelect2 = false;},1000)
    } else {
      this.highLightSelect2 = false;
      this.disabled = false;
      this.highLightSelect3 = false;
      this.disabled = false;
      this.subcatValue2 = '';
      this.subcatValue1 = event.target.value || event.srcElement.value;
      this.type = this.subcatValue1;

      //to get all agent values 
      if (this.subcatValue1 === 'Agent' && this.departmentValue !== '') {
        // this.loader = true;
        this.stateCtrl2.disable();
        this.stateCtrl3.disable();
        var usersListInputs = {

          "Authorization": "YWRtaW46YWRtaW4=",
          "roleName": 'Agent',
          "teamName": this.departmentValue
        }
        //Retrivingall unAssigned  tickets list
        this.retriveAgentList(usersListInputs);
      }

      // to get all categerys 
      else if (this.subcatValue1 === 'Catageory' && this.departmentValue !== '') {
        //this.loader = true;
        this.stateCtrl.enable();
        this.stateCtrl1.enable();
        this.selectCategory(this.departmentValue);
      }
      else if (this.subcatValue1 === 'Location' && this.departmentValue !== '') {

      }
    }


  }

  // closing 

  subSelect3(event) {
    this.compareMatrics = event.target.value || event.srcElement.value;
    if (this.compareMatrics != '') {
      this.highLightSelect = false;
    }
    else {
      this.highLightSelect = true;
    }
  }

  // third dropdown starting
  subSelect2(event) {
    //this.loader = true;
    this.subcatValue2 = event.target.value || event.srcElement.value;
    if (this.subcatValue2 != '') {
      this.highLightSelect1 = false;
    }
    else {
      this.highLightSelect1 = true;
    }

  }

  departmentSelect1(event) {
    this.person1 = '';
    this.person2 = ''
    this.person3 = ''
    this.person4 = ''
    this.departmentValue1 = event.target.value || event.srcElement.value;


    var usersListInputs = {

      "Authorization": "YWRtaW46YWRtaW4=",
      "roleName": 'Agent',
      "teamName": this.departmentValue1
    }
    //Retrivingall agents list
    this.retriveAgentList(usersListInputs);

  }
  subSelect22(event) {

    this.agentName1 = event.target.value || event.srcElement.value;


  }
  subSelect220(event) {
    this.person1 = event.target.value || event.srcElement.value;
    this.compareAgentArray[0] = this.person1;

  }
  subSelect221(event) {
    this.person2 = event.target.value || event.srcElement.value;
    this.compareAgentArray[1] = this.person2;

  }
  subSelect222(event) {
    this.person3 = event.target.value || event.srcElement.value;
    this.compareAgentArray[2] = this.person3;

  }
  subSelect223(event) {
    this.person4 = event.target.value || event.srcElement.value;
    this.compareAgentArray[3] = this.person4;

  }








  loadgraphforCompare(res) {

    this.compareDatapanel = [];
    this.compareDatapanelInner = [];
    this.checkGraphData = [];
    let agentName1 = ''
    let agentName2 = ''
    let agentName3 = ''
    let agentName4 = ''
    if (this.compareMatrics === 'Average Service Time') {
      this.checkGraphData = [];
      this.compareDatapanel = [];
      this.compareDatapanelInner = [];
      let array = res[0];
      let outerarrayLength = array.length;
      let innerArraylength = array[0].Details.length;
      if (innerArraylength === 2) {
        this.compareDatapanel = [];
        this.compareDatapanelInner = [];
        agentName1 = ''
        agentName2 = ''
        agentName3 = ''
        agentName4 = ''

        for (let i = 0; i < outerarrayLength; i++) {
          for (let j = 0; j < innerArraylength; j++) {
            if (j === 0) {
              this.compareDatapanelInner = [];
              this.compareDatapanelInner.push(array[i].Date);
              this.compareDatapanelInner.push(array[i].Details[j].count)
              this.checkGraphData.push(array[i].Details[j].count)
              // this.checkGraphData.push(array[i].Details[3].Total)
              agentName1 = array[i].Details[j].agent;


            }
            if (j === 1) {
              this.compareDatapanelInner.push(array[i].Details[j].count)
              this.checkGraphData.push(array[i].Details[j].count)
              agentName2 = array[i].Details[j].agent;
            }


          }
          this.compareDatapanel.push(this.compareDatapanelInner)
        }
        this.loader = false;
        let length = this.checkGraphData.length;
        let count = 0;
        this.checkGraphData.forEach(element => {
          if (element === 0) {
            count++;
          }

        });
        this.checkGraphData = [];

        if (count === length) {
          this.noGraphsFound = true;
        }
        else {

          this.noGraphsFound = false;
          this.departmentGraphChartDataObject = {
            chartType: 'LineChart',
            dataTable: [
              ['Time', agentName1, agentName2,],
              ...this.compareDatapanel
            ],
            options: {
              height: 400, width: 'auto',
              series: {
                0: { color: '#ef4048' },
                1: { color: '#2368a0' },

              },
              vAxis: {
                title: 'Average Service Time',
                textStyle: {
                  fontName: 'Montserrat-regular , sans-serif',


                }
              }
            },


          };
        }


      }
      if (innerArraylength === 3) {
        this.compareDatapanel = [];
        this.compareDatapanelInner = [];
        agentName1 = ''
        agentName2 = ''
        agentName3 = ''
        agentName4 = ''
        for (let i = 0; i < outerarrayLength; i++) {
          for (let j = 0; j < innerArraylength; j++) {
            if (j === 0) {
              this.compareDatapanelInner = [];
              this.compareDatapanelInner.push(array[i].Date);
              this.compareDatapanelInner.push(array[i].Details[j].count)
              this.checkGraphData.push(array[i].Details[j].count)
              agentName1 = array[i].Details[j].agent;


            }
            if (j === 1) {
              this.compareDatapanelInner.push(array[i].Details[j].count)
              agentName2 = array[i].Details[j].agent;
              this.checkGraphData.push(array[i].Details[j].count)
            }
            if (j === 2) {
              this.compareDatapanelInner.push(array[i].Details[j].count)
              agentName3 = array[i].Details[j].agent;
              this.checkGraphData.push(array[i].Details[j].count)
            }
          }
          this.compareDatapanel.push(this.compareDatapanelInner);
        }
        this.loader = false;

        let length = this.checkGraphData.length;
        let count = 0;
        this.checkGraphData.forEach(element => {
          if (element === 0) {
            count++;
          }
        });
        this.checkGraphData = [];
        if (count === length) {
          this.noGraphsFound = true;
        }
        else {

          this.noGraphsFound = false;
          this.departmentGraphChartDataObject = {
            chartType: 'LineChart',
            dataTable: [
              ['Time', agentName1, agentName2, agentName3,],
              ...this.compareDatapanel
            ],
            options: {
              height: 400, width: 'auto',
              series: {
                0: { color: '#ef4048' },
                1: { color: '#2368a0' },
                2: { color: '#00aae7' },

              },
              vAxis: {
                title: 'Average Service Time',
                textStyle: {
                  fontName: 'Montserrat-regular , sans-serif',


                }
              }
            },

          };
        }


      }
      if (innerArraylength === 4) {
        this.compareDatapanel = [];
        this.compareDatapanelInner = [];
        agentName1 = ''
        agentName2 = ''
        agentName3 = ''
        agentName4 = ''
        for (let i = 0; i < outerarrayLength; i++) {
          for (let j = 0; j < innerArraylength; j++) {
            if (j === 0) {
              this.compareDatapanelInner = [];
              this.compareDatapanelInner.push(array[i].Date);
              this.compareDatapanelInner.push(array[i].Details[j].count)
              this.checkGraphData.push(array[i].Details[j].count)
              agentName1 = array[i].Details[j].agent;


            }
            if (j === 1) {
              this.compareDatapanelInner.push(array[i].Details[j].count);
              this.checkGraphData.push(array[i].Details[j].count)
              agentName2 = array[i].Details[j].agent;
            }
            if (j === 2) {
              this.compareDatapanelInner.push(array[i].Details[j].count)
              this.checkGraphData.push(array[i].Details[j].count)

              agentName3 = array[i].Details[j].agent;
            }
            if (j === 3) {
              this.compareDatapanelInner.push(array[i].Details[j].count)
              this.checkGraphData.push(array[i].Details[j].count)
              agentName4 = array[i].Details[j].agent;
            }

          }
          this.compareDatapanel.push(this.compareDatapanelInner);
        }
        this.loader = false;


        let length = this.checkGraphData.length;
        let count = 0;
        this.checkGraphData.forEach(element => {
          if (element === 0) {
            count++;
          }
        });
        this.checkGraphData = [];
        if (count === length) {
          this.noGraphsFound = true;
        }
        else {

          this.noGraphsFound = false;
          this.departmentGraphChartDataObject = {
            chartType: 'LineChart',
            dataTable: [
              ['Time', agentName1, agentName2, agentName3, agentName4],
              ...this.compareDatapanel
            ],
            options: {
              height: 400, width: 'auto',
              series: {
                0: { color: '#ef4048' },
                1: { color: '#2368a0' },
                2: { color: '#00aae7' },
                3: { color: '#b7b23b' },
              },
              vAxis: {
                title: 'Average Service Time',
                textStyle: {
                  fontName: 'Montserrat-regular , sans-serif',

                }
              }
            },

          };
        }



      }
    }
    else {
      this.compareDatapanel = [];
      this.compareDatapanelInner = [];
      let array = res;
      let outerarrayLength = array.length;
      let innerArraylength = array[0].Details.length;
      if (innerArraylength === 2) {
        this.compareDatapanel = [];
        this.compareDatapanelInner = [];
        agentName1 = ''
        agentName2 = ''
        agentName3 = ''
        agentName4 = ''

        for (let i = 0; i < outerarrayLength; i++) {
          for (let j = 0; j < innerArraylength; j++) {
            if (j === 0) {
              this.compareDatapanelInner = [];
              this.compareDatapanelInner.push(array[i].Date);
              this.compareDatapanelInner.push(array[i].Details[j].count)
              this.checkGraphData.push(array[i].Details[j].count)

              agentName1 = array[i].Details[j].agent;


            }
            if (j === 1) {
              this.compareDatapanelInner.push(array[i].Details[j].count)
              this.checkGraphData.push(array[i].Details[j].count)
              agentName2 = array[i].Details[j].agent;
            }


          }
          this.compareDatapanel.push(this.compareDatapanelInner)
        }
        this.loader = false;

        let length = this.checkGraphData.length;
        let count = 0;
        this.checkGraphData.forEach(element => {
          if (element === 0) {
            count++;
          }
        });
        this.checkGraphData = [];
        if (count === length) {
          this.noGraphsFound = true;
        }
        else {

          this.noGraphsFound = false;
          this.departmentGraphChartDataObject = {
            chartType: 'LineChart',
            dataTable: [
              ['Time', agentName1, agentName2,],
              ...this.compareDatapanel
            ],
            options: {
              height: 400, width: 'auto',
              series: {
                0: { color: '#ef4048' },
                1: { color: '#2368a0' },

              },
              vAxis: {
                title: 'Tickets',
                textStyle: {
                  fontName: 'Montserrat-regular , sans-serif',

                }
              }
            },

          };

        }

      }
      if (innerArraylength === 3) {
        this.compareDatapanel = [];
        this.compareDatapanelInner = [];
        agentName1 = ''
        agentName2 = ''
        agentName3 = ''
        agentName4 = ''
        for (let i = 0; i < outerarrayLength; i++) {
          for (let j = 0; j < innerArraylength; j++) {
            if (j === 0) {
              this.compareDatapanelInner = [];
              this.compareDatapanelInner.push(array[i].Date);
              this.compareDatapanelInner.push(array[i].Details[j].count)
              this.checkGraphData.push(array[i].Details[j].count)
              agentName1 = array[i].Details[j].agent;


            }
            if (j === 1) {
              this.compareDatapanelInner.push(array[i].Details[j].count)
              agentName2 = array[i].Details[j].agent;
              this.checkGraphData.push(array[i].Details[j].count)
            }
            if (j === 2) {
              this.compareDatapanelInner.push(array[i].Details[j].count)
              agentName3 = array[i].Details[j].agent;
              this.checkGraphData.push(array[i].Details[j].count)
            }
          }
          this.compareDatapanel.push(this.compareDatapanelInner);
        }
        this.loader = false;

        let length = this.checkGraphData.length;
        let count = 0;
        this.checkGraphData.forEach(element => {
          if (element === 0) {
            count++;
          }
        });
        this.checkGraphData = [];
        if (count === length) {
          this.noGraphsFound = true;
        }
        else {

          this.noGraphsFound = false;
          this.departmentGraphChartDataObject = {
            chartType: 'LineChart',
            dataTable: [
              ['Time', agentName1, agentName2, agentName3,],
              ...this.compareDatapanel
            ],
            options: {
              height: 400, width: 'auto',
              series: {
                0: { color: '#ef4048' },
                1: { color: '#2368a0' },
                2: { color: '#00aae7' },

              },
              vAxis: {
                title: 'Tickets',
                textStyle: {
                  fontName: 'Montserrat-regular , sans-serif',
                }
              }
            },

          };
        }



      }
      if (innerArraylength === 4) {
        this.compareDatapanel = [];
        this.compareDatapanelInner = [];
        agentName1 = ''
        agentName2 = ''
        agentName3 = ''
        agentName4 = ''
        for (let i = 0; i < outerarrayLength; i++) {
          for (let j = 0; j < innerArraylength; j++) {
            if (j === 0) {
              this.compareDatapanelInner = [];
              this.compareDatapanelInner.push(array[i].Date);
              this.compareDatapanelInner.push(array[i].Details[j].count)
              this.checkGraphData.push(array[i].Details[j].count)
              agentName1 = array[i].Details[j].agent;


            }
            if (j === 1) {
              this.compareDatapanelInner.push(array[i].Details[j].count)
              agentName2 = array[i].Details[j].agent;
              this.checkGraphData.push(array[i].Details[j].count)
            }
            if (j === 2) {
              this.compareDatapanelInner.push(array[i].Details[j].count)
              agentName3 = array[i].Details[j].agent;
              this.checkGraphData.push(array[i].Details[j].count)
            }
            if (j === 3) {
              this.compareDatapanelInner.push(array[i].Details[j].count)
              agentName4 = array[i].Details[j].agent;
              this.checkGraphData.push(array[i].Details[j].count)
            }

          }
          this.compareDatapanel.push(this.compareDatapanelInner);
        }
        this.loader = false;

        let length = this.checkGraphData.length;
        let count = 0;
        this.checkGraphData.forEach(element => {
          if (element === 0) {
            count++;
          }
        });
        this.checkGraphData = [];
        if (count === length) {
          this.noGraphsFound = true;
        }
        else {
          this.noGraphsFound = false;
          this.departmentGraphChartDataObject = {
            chartType: 'LineChart',
            dataTable: [
              ['Time', agentName1, agentName2, agentName3, agentName4,],
              ...this.compareDatapanel
            ],
            options: {
              height: 400, width: 'auto',
              series: {
                0: { color: '#ef4048' },
                1: { color: '#2368a0' },
                2: { color: '#00aae7' },
                3: { color: '#b7b23b' },
              },
              vAxis: {
                title: 'Tickets',
                textStyle: {
                  fontName: 'Montserrat-regular , sans-serif',

                }
              },

            },

          };
        }

      }

    }

  }
  genrateGraphForCompare() {
    if (this.compareMatrics != '') {

      this.disabled1 = false;
      this.highLightSelect = false;
      if (this.departmentValue != '' && this.type != '' && this.subcatValue2 != 'Agent' && this.startdate != '' && this.enddate != '') {
        this.loader = true;
        let data =
          {
            "startdate": this.startdate,
            "enddate": this.enddate,
            "category": this.departmentValue,
            "ticketCategory": this.compareMatrics,
            "agentIds": this.compareAgentArray
          }

        this.dashBoardService.compareAgents(data).subscribe(res => {

          if (res.length > 0) {
            this.loadgraphforCompare(res);
            this.loader = false;
          }
          else {
            this.loader = true;
          }

        }, error => {
          this.loader = true;
        }
        );


      }
    }
    else {
      this.disabled1 = true;
      this.highLightSelect = true;
      //setTimeout(( )=>{this.highLightSelect = false;},1000)

    }


  }


  genrateGraph() {

    if (this.subcatValue2 === '' && this.departmentValue != '' && this.subcatValue1 != '') {
      //alert('called1')
      this.highLightSelect1 = true;

    }
    else if (this.departmentValue != '' && this.type != '' && this.subcatValue2 != '' && this.startdate != '' && this.enddate != '') {
      this.loader = true;
      // alert('called2')
      this.highLightSelect1 = false;
      let data = {

        "startdate": this.startdate,
        "enddate": this.enddate,
        "teamName": this.departmentValue,
        "type": this.type,
        "typeValue": this.subcatValue2

      }
      this.dashBoardService.loadAllTeamTotal(data).subscribe(res => {

        if (res.length > 0) {
          //  this.loadgraph1(res);
          if (this.departmentValue === 'APPS') {
            this.loadgraphforApps(res);
          } else if (this.departmentValue === 'HR') {
            this.loadgraphforHR(res)
          } else if (this.departmentValue === 'IT') {
            this.loadgraphforIt(res);
          }
          this.loader = false;
        }
        else {
          this.loader = true;
        }

      }, error => {
        this.loader = true;
      }
      );
    } else if (this.departmentValue != '' && this.startdate != '' && this.enddate != '') {
      // alert('called3')
      this.highLightSelect1 = false;
      this.loader = true;
      if (this.departmentValue === 'APPS') {
        this.callAppsGraphData();
      } else if (this.departmentValue === 'HR') {
        this.callHrGraphData();
      } else if (this.departmentValue === 'IT') {
        this.callItGraphData();
      }
      
    } else if (this.startdate != '' && this.enddate != '') {
      //alert('called4')
      this.highLightSelect1 = false;
      this.loader = true;
      let data = {

        "startdate": this.startdate,
        "enddate": this.enddate,



      }
      this.dashBoardService.loadAllTeamTotal(data).subscribe(res => {

        if (res.length > 0) {
          //this.loadgraph(res);
          this.loadgraphForAllDeparments(res);
          this.loader = false;
        }
        else {
          this.loader = true;
        }

      }, error => {
        this.loader = true;
      }
      );
    }

  }



  dropdownValidate() {
    if (this.departmentValue === '') {
      this.subcatValue1 = '';
      this.subcatValue2 = '';
      this.highLightSelect2 = true;
      this.disabled = true;

      //setTimeout(( )=>{this.highLightSelect2 = false;},1000)
    }
    else {
      this.disabled = false;
      this.highLightSelect2 = false;
    }
  }


  dropdownValidate1($event) {
    if (this.departmentValue === '') {
      this.subcatValue1 = '';
      this.subcatValue2 = '';
      this.highLightSelect2 = true;
      this.highLightSelect3 = true;
      this.disabled = true;

      //setTimeout(( )=>{this.highLightSelect2 = false;},1000)
    }
    else if (this.departmentValue === '' && this.subcatValue1 === '') {
      this.subcatValue1 = '';
      this.subcatValue2 = '';
      this.highLightSelect2 = true;
      this.highLightSelect3 = true;
      this.disabled = true;

    }
    else if (this.departmentValue != '' && this.subcatValue1 === '') {

      this.subcatValue2 = '';
      // this.highLightSelect2 = true;
      this.highLightSelect3 = true;


    }
    else {
      this.disabled = false;
      this.highLightSelect1 = false;
    }

  }










}
