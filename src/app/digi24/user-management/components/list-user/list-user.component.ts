import { Component, OnInit } from '@angular/core';
import { EmployeeModel} from '../../models/employee-model';
import { UserManagementService } from '../../services/user-management.service';
import { HttpResponseModel } from '../../models/http-response-model';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { RootComponent } from '../../../../shared/roots/root.component';
import { GlobalService } from '../../../../shared/services/global.service';
import swal from 'sweetalert2';
// import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers:[UserManagementService ]
})
export class ListUserComponent extends RootComponent implements OnInit {
  
  private componentName:string = "ListUserComponent";

  employeeList:EmployeeModel[];
  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;

  constructor( 
    private manageUserService:UserManagementService, 
    private router:Router, private route:ActivatedRoute,
    public _globalService: GlobalService) {
    // private _logger: Logger ) {
    super(_globalService);
  }

  ngOnInit() {
    this.loadData();    
  }

  createUser(){
    //this.router.navigate(['create']);
    this.router.navigate(['../create'], { relativeTo: this.route });
  }

  viewUser(id:string){
    console.log(id);
    this.router.navigate(['../detail'],{ relativeTo: this.route });
  }

  deleteUser(id:string){
    console.log(id);
    this.alertConfirm(id);
  }

  editUser(id:string){
    this.manageUserService.getEmployeeById(id).subscribe((data:HttpResponseModel<EmployeeModel>)=>{
      if(data.isFaulted == false){
         //data.ResponseData
        console.log(data.responseData);
        this.router.navigate(['../update/' +id], { relativeTo: this.route });
      }
    });
  }

  loadData() {
    // this._logger.info("Begin " +this.componentName+"#loadData()");
    this.manageUserService.getAllEmployees().subscribe((data:HttpResponseModel<EmployeeModel[]>)=>{
      if(data.isFaulted == false){
        this.employeeList = data.responseData
        //console.log(this.employeeList);
      }
    });
    // this._logger.info("End " +this.componentName+"#loadData()");
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }


  alertConfirm(id:string) {
    swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        var msg = this.manageUserService.deleteEmployee(id);
        swal(
          'Deleted!',
          // 'Your file has been deleted.',
          msg,
          'success'
        );
      }
    });
  }

}
