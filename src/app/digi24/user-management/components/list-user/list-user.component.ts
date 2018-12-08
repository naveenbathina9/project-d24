import { Component, OnInit } from '@angular/core';
import { EmployeeModel} from '../../models/employee-model';
import { UserManagementService } from '../../services/user-management.service';
import { HttpResponseModel } from '../../models/http-response-model';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { RootComponent } from '../../../../shared/roots/root.component';
import { GlobalService } from '../../../../shared/services/global.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers:[UserManagementService ]
})
export class ListUserComponent extends RootComponent implements OnInit {
  
  employeeList:EmployeeModel[];
  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;

  constructor( 
    private manageUserService:UserManagementService, 
    private router:Router, private route:ActivatedRoute,
    public _globalService: GlobalService) {
    super(_globalService);
  }

  ngOnInit() {
    this.loadData();    
  }

  viewUser(id:string){
    console.log(id);
    //this.router.navigate(['/detail']);
    this.router.navigate(['../detail'], { relativeTo: this.route });
  }

  deleteUser(id:string){
    console.log(id);
    this.alertConfirm(id);
  }

  editUser(id:string){
    this.manageUserService.getEmployeeById(id).subscribe((data:HttpResponseModel<EmployeeModel>)=>{
      if(data.IsFaulted == false){
         //data.ResponseData
        console.log(data.ResponseData);
        //this.router.navigate(['/update']);
        this.router.navigate(['../update'], { relativeTo: this.route });
      }
    });
  }

  loadData() {

    this.manageUserService.getAllEmployees().subscribe((data:HttpResponseModel<EmployeeModel[]>)=>{
      if(data.IsFaulted == false){
        this.employeeList = data.ResponseData
        console.log(this.employeeList);
      }
    });
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
