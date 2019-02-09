import { Component, OnInit } from '@angular/core';
import { StandardService } from '../../../standard/services/standard.service';
import { StandardModel } from '../../../standard/model/standard-model';
import { RootComponent } from '../../../../shared/roots/root.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalService } from '../../../../shared/services/global.service';
import { error } from 'protractor';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { StudentBasicData } from '../../models/student-basic-data';
import { StudentService } from '../../services/student.service';
import { HttpResponseModel } from '../../models/http-response-model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
  providers: [StandardService, StudentService]
})
export class CreateStudentComponent extends RootComponent implements OnInit {
standards: StandardModel[];
student: StudentBasicData = new StudentBasicData();

  constructor(private _standardService: StandardService,
              private _studentService: StudentService,
              private location: Location,
              private spinnerService: Ng4LoadingSpinnerService,
              private globalService: GlobalService) {
                super(globalService)
              }

  ngOnInit() {

    this.spinnerService.show();

    this._standardService.getAllStandards().subscribe(
      (result: StandardModel[]) => {
        this.spinnerService.hide();
        this.standards = result;
      },
      (error) => {
        this.spinnerService.hide();

        swal({
          type: 'error',
          title: 'Error occured in server',
          text: 'could not get standard details'
        });

        this.location.back();
      }
    );

    this.student.Gender = "-1";
    this.student.Standard = "-1";
  }

  get diagnostics() {
    return JSON.stringify(this.student);
  }

  onCancel() {
    this.location.back();
  }

  onSubmit(studentForm: NgForm) {
    console.log('creating student');
    this.spinnerService.show();

    this._studentService.createStudent(this.student).subscribe(
      (data: HttpResponseModel<number>) => {
        if(data.isFaulted === false) {

          this.spinnerService.hide();

          swal({
            position: 'center',
            type: 'success',
            title: data.responseMessage,
            showConfirmButton: false,
            timer: 1500
          });

          studentForm.reset();
        } else {
          this.spinnerService.hide();

          swal({
            position: 'center',
            type: 'error',
            title: data.responseMessage
          });
        }
    },
    (failure) => {
          
      this.spinnerService.hide();

      swal({
        position: 'center',
        type: 'error',
        title: "Failed to create student",
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
}