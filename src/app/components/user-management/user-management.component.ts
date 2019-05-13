import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragulaService } from 'ng2-dragula';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { UsermanagementService } from '../../services/usermanagement.service';
declare var $: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  insideText: string;
  showAdminPanel: boolean;
  Admin_Users = 'Admin_Users';
  SuperAdmin_List = 'SuperAdmin_List';
  positionAlertName = '';
  positionAlert: boolean = false;
  successPoup= "";
  roleUpdateObj = {};
  public hrAdmin = [];
  public hrAgents = [];
  public itAdmin = [];
  public itAgents = [];
  public appsAdmin = [];
  public appsAgents = [];
  public super_admin = [];
  public normalAdmin = [];
  public normalAgent = [];
  mainLoader: boolean = false;
  errorPoup = "";
  userInfo = localStorage.getItem('auth');
  UserObject = JSON.parse(this.userInfo);
  UserLoginId = this.UserObject.LoginId;
  subs = new Subscription();
  nextText: string;

  constructor(public router: Router, private dragulaService: DragulaService, public userMangmntService: UsermanagementService) {
    dragulaService.drag(this.Admin_Users)
      .subscribe(({ el, source, }) => {

      });

       //when user changing roles through the draging then this function will be triggering
    this.subs.add(dragulaService.dropModel(this.Admin_Users)
      .subscribe(({ el, target, source, sourceModel, targetModel, item }) => {

           if(target.id != source.id) {

            if (this.UserLoginId === item) {

              this.listLoading();
    
                $("#exampleModal-99").modal("show");
                  setTimeout(() => { $("#exampleModal-99").modal("hide"); }, 2000);
                this.errorPoup= "fail";
                this.successPoup = "fail"; 
                this.positionAlert = true;
                this.insideText = "Sorry, you don't have access to remove yourself";
                this.positionAlertName = "";
                //this.positionAlertName = res.loginId;
                setTimeout(() => { this.positionAlert = false }, 3000)
    
    
            } else {
    
    
              // } else {
    
                this.roleUpdateObj = {
                  "loginId": item,
                  "roleName": target.id,
                  "createdBy": this.UserObject.LoginId
                }

                //updating role for users like admin to agent and agent admin or super admin viceversa
                this.roleUpdating(this.roleUpdateObj);
    
              // }
              //else block
            }
            
           }
       

      }));

    this.subs.add(dragulaService.removeModel(this.Admin_Users)
      .subscribe(({ el, source, item, sourceModel }) => {

      })
    );
  }

  ngOnInit() {

    //user management panel showing conditions
    this.listLoading();

    //closing of onint
  }

    //return badges css status
    ngClassForIcons(value) {
      let data = '';
      if (value == 'success') {
        data = 'fa fa-check-circle text-success';
      } else if (value == 'fail') {
        data = 'fa fa-check-circle text-danger';
      } 
      return data;
    }

     //return badges css status
     ngClassForIcons1(value) {
      let data = '';
      if (value == 'success') {
        data = 'text-center text-success mt-3';
      } else if (value == 'fail') {
        data = 'text-center text-danger mt-3';
      } 
      return data;
    }
    

  listLoading() {
    //user management panel showing conditions
    if (this.UserObject.RoleName === 'Admin') {
      this.showAdminPanel = true;
      //based on team loading admin agent list
      if (this.UserObject.TeamName === 'APPS') {
        // alert("called")
        this.mAppsListLoading();
      } else if (this.UserObject.TeamName === 'HR') {
        this.hrListLoading();
      } else if (this.UserObject.TeamName === 'IT') {
        this.itListLoading();
      }
    } else if (this.UserObject.RoleName === 'Super-Admin') {
      this.showAdminPanel = false;
      this.hrListLoading();
      this.superAdminListLoading();
    } else {
      //is user is not an admin or super admin then we are navigating to dashboard
      this.router.navigateByUrl('admin/dashboard');
    }
  }
  
  //hr users list 
  hrListLoading() {
    this.hrAgents = [];
    this.hrAdmin = [];
    //calling api for hr admin users list
    this.userMangmntService.getHradminList().subscribe(res => {

      //loader
      this.mainLoader = true;


      this.hrAdmin = [];
      res.HrAdminDetails.forEach(element => {
        if (this.UserObject.RoleName === 'Admin') {
          this.normalAdmin.push(element.LoginId);
        } else {
          this.hrAdmin.push(element.LoginId);
        }
      });
    }, error => {
      console.log(error);
    })


    //calling api for hr agent list
    this.userMangmntService.getHraAgentList().subscribe(res => {

      //loader
      this.mainLoader = true;

      this.hrAgents = [];
      res.HrAgentDetails.forEach(element => {
        if (this.UserObject.RoleName === 'Admin') {

          this.normalAgent.push(element.LoginId);

        } else {
          this.hrAgents.push(element.LoginId);
        }

      });
    }, error => {
      console.log(error);
    })

    //closing of hr list function
  }


  //closing of it function
  itListLoading() {
    this.itAgents = [];
    this.itAdmin = [];
    //calling api for IT admin users list
    this.userMangmntService.getItadminList().subscribe(res => {

      //loader
      this.mainLoader = true;
      this.normalAdmin=[]
      this.itAdmin = [];
      res.ItTeamAdminDetails.forEach(element => {
        if (this.UserObject.RoleName === 'Admin') {

          this.normalAdmin.push(element.LoginId);

        } else {
          this.itAdmin.push(element.LoginId);
        }

      });
    }, error => {
      console.log(error);
    })

    //calling api for IT agent list
    this.userMangmntService.getItaAgentList().subscribe(res => {

      //loader
      this.mainLoader = true;
      this.itAgents = [];
      this.itAgents = [];
      res.ItTeamAgentDetails.forEach(element => {

        if (this.UserObject.RoleName === 'Admin') {

          this.normalAgent.push(element.LoginId);

        } else {

          this.itAgents.push(element.LoginId);
        }

      });
    }, error => {
      console.log(error);
    })
    //closing of it function
  }



  //closing of mapps function
  mAppsListLoading() {
    
    this.userMangmntService.getMappsadminList().subscribe(res => {

      //loader
      this.mainLoader = true;
      this.appsAdmin =[];
      this.normalAdmin = []
      res.ItTeamAdminDetails.forEach(element => {
        if (this.UserObject.RoleName === 'Admin') {
          this.normalAdmin.push(element.LoginId);
        } else {
          this.appsAdmin.push(element.LoginId);
        }
      });
    }, error => {
      console.log(error);
    })


    //calling api for Apps agent list
    this.userMangmntService.getMappsAgentList().subscribe(res => {

      //loader
      this.mainLoader = true;
      this.appsAgents= [];
      this.normalAgent=[];
      res.ItTeamAgentDetails.forEach(element => {

        if (this.UserObject.RoleName === 'Admin') {
          this.normalAgent.push(element.LoginId);
        } else {
          this.appsAgents.push(element.LoginId);

        }

      });
    }, error => {
      console.log(error);
    })
    //closing of mapps function
  }


  //super admin list 
  superAdminListLoading() {
    this.super_admin = [];
    //calling api for Super Admin agent list
    this.userMangmntService.getSuperAdminsList().subscribe(res => {
      //loader
      this.mainLoader = true;

      this.super_admin = [];
      res.superAdminDetails.forEach(element => {
        this.super_admin.push(element.LoginId);
      });
    }, error => {
      console.log(error);
    })
    //closing of super admin list 
  }


  //updaing roles to agent and admin
  roleUpdating(response) {

    //calling api for Super Admin agent list
    this.userMangmntService.roleUpdating(response).subscribe(res => {
      if(res.roleName === "Admin"){
        this.positionAlertName = "@" +res.loginId;
      this.insideText = 'You changed the role for ';
      this.nextText = ' to Admin from Agent';

      } else {

        this.positionAlertName = "@" +res.loginId;
        this.insideText = 'You changed the role for ';
        this.nextText = ' to Agent from Admin';
        
      }
      $("#exampleModal-99").modal("show");
        setTimeout(() => { $("#exampleModal-99").modal("hide"); }, 2000);
        this.successPoup = "success";
        this.positionAlert = true;
      setTimeout(() => { this.positionAlert = false 
        this.insideText = '';
        this.nextText = '';
      }, 3000);
      
    }, error => {
      console.log(error);
    })

    //closing roles assign panel 
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
