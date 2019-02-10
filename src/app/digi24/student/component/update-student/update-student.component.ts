import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { StandardService } from '../../../standard/services/standard.service';
import { StandardModel } from '../../../standard/model/standard-model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalService } from '../../../../shared/services/global.service';
import { RootComponent } from '../../../../shared/roots/root.component';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { StudentSubscriptionData } from '../../models/student-subscription-data';
import { StudentAcademicData } from '../../models/student-academic-data';
import { AcademicService } from '../../services/academic.service';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss'],
  providers: [StandardService,  AcademicService, SubscriptionService]
})
export class UpdateStudentComponent extends RootComponent implements OnInit {
  updateStudentForm: FormGroup;
  standards: StandardModel[];
  subscriptions: StudentSubscriptionData[];
  academics: StudentAcademicData[];

  constructor(private formBuilder: FormBuilder,
              private _location: Location,
              private _standardService: StandardService,
              private _spinnerService: Ng4LoadingSpinnerService,
              private _academicService: AcademicService,
              private _subscriptionService: SubscriptionService,
              private globalService: GlobalService) { 
                super(globalService)
            }

  ngOnInit() {
    this.subscriptions = this._subscriptionService.getSubscriptionsByStudentId('1');
    this.academics = this._academicService.getAcademicDataByStudentId('1');

    this._spinnerService.show();

    this._standardService.getAllStandards().subscribe(
      (result: StandardModel[]) => {
        this._spinnerService.hide();
        this.standards = result;
      },
      (error) => {
        this._spinnerService.hide();

        swal({
          type: 'error',
          title: 'Error occured in server',
          text: 'could not get standard details'
        });

        this._location.back();
      }
    );

    this.createForm();
  }

  createForm() {
    this.updateStudentForm = this.formBuilder.group({
      studentId: [''],
      firstName: ['', Validators.required],
      lastName: [''],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      fatherName: [''],
      motherName: [''],
      parentEmailAddress: [''],
      parentMobileNumber: ['', Validators.required],
      academicYear: [''],
      profilePicture: [''],
      standard: [''],
      subscriptionDetails: this.formBuilder.array([this.createSubscriptions()]),
      academicDetails: this.formBuilder.array([this.createAcademics()])
    });
  }

  createSubscriptions(): FormGroup {
    return this.formBuilder.group({
      SubscriptionId: [''],
      Status: [''],
      ExpiryDate: ['']
    });
  }

  createAcademics(): FormGroup {
    return this.formBuilder.group({
      Standard: [''],
      AcademicYear: [''],
      Result: ['']
    });
  }
}
