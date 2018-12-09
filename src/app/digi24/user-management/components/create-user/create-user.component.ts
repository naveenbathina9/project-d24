import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from '../../services/user-management.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers:[ UserManagementService ]
})

export class CreateUserComponent implements OnInit {
  formData:FormGroup;
  submitted = false;
  loading = false;

  constructor(private formBuilder: FormBuilder, private userManagementService:UserManagementService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.formData = this.formBuilder.group({
      employeeId: 0,
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      designation: ['',[Validators.required]],
      userName: ['', [Validators.required, Validators.email]],
      password: ['default#123', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.formData.controls; }

  onSubmit() {
    this.loading = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.formData.invalid) {
        this.loading = false;
        return;
    }
    //console.log(this.createUserForm.value);
    this.userManagementService.createUser(this.formData.value);
    alert('SUCCESS!! :-)')
    this.loading = false;
  }
}