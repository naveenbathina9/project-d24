import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from '../../services/user-management.service';
import { ActivatedRoute } from '@angular/router';
import { RootComponent } from '../../../../shared/roots/root.component';
import { GlobalService } from '../../../../shared/services/global.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  providers:[ UserManagementService ]
})
export class UpdateUserComponent  extends RootComponent  implements OnInit {
  id:string;
  formData:FormGroup;
  submitted = false;
  loading = false;
  errorMessage: any;

  constructor(private formBuilder: FormBuilder, 
    private userManagementService:UserManagementService, 
    private location:Location, 
    private avRoute: ActivatedRoute, 
    public _globalService: GlobalService) {
      super(_globalService);
    if(this.avRoute.snapshot.params["id"]){
      this.id = this.avRoute.snapshot.params["id"];
      console.log(this.id);
    }
  }

  ngOnInit() {
    this.createForm();
    this.userManagementService.getEmployeeById(this.id)
    .subscribe(resp => this.formData.patchValue(resp.responseData)
               , error => this.errorMessage = error);
  }

  createForm(){
    this.formData = this.formBuilder.group({
      employeeId: 0,
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      designation: ['',[Validators.required]],
      userName: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formData.controls; }

  onSubmit() {
    this.userManagementService.updateUser(this.formData.value)
    .subscribe(
      success => {
        // this.alertMessage(
        //   {
        //     type: 'success',
        //     title: 'Update Result!',
        //     value: success.responseMessage
        //   }
        // );

        swal({
          position: 'center',
          type: 'success',
          title: success.responseMessage,
          showConfirmButton: false,
          timer: 1500
        })
          console.log(success); 
        }, 
      error=> { 
        console.log(error);  
      }
    );
  }


}