import { Component, OnInit } from '@angular/core';
import { StandardService } from '../../../standard/services/standard.service';
import { StandardModel } from '../../../standard/model/standard-model';
import { HttpResponseModel } from '../../models/http-response-model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { RootComponent } from '../../../../shared/roots/root.component';
import { GlobalService } from '../../../../shared/services/global.service';
import swal from 'sweetalert2';
import { StudentService } from '../../services/student.service';
import { StudentBasicData } from '../../models/student-basic-data';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss'],
  providers: [
    StandardService,
    StudentService
  ]
})
export class ListStudentComponent extends RootComponent implements OnInit {
  pageSize = 10;
  pageNumber = 1;

  standards: StandardModel[] = [];
  students: StudentBasicData[] = [];

  constructor(private standardService: StandardService,
              private studentService: StudentService,
              private spinnerService: Ng4LoadingSpinnerService,
              private globalservice: GlobalService) { 
                super(globalservice);
              }

  ngOnInit() {
    this.loadData();
  }

  onSelectionChange(standardId: string) {
    this.spinnerService.show();
    this.studentService.getStudentsByStandardId(standardId).subscribe(
      data => {
        this.spinnerService.hide();
        this.students = data.responseData;
        console.log(this.students);
      },
      error => {
        this.spinnerService.hide();
        swal({
          position: 'center',
          type: 'error',
          title: 'Error occured in server',
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  createStudent() {

  }

  loadData() {
    this.spinnerService.show();
    this.standardService.getAllStandards().subscribe(
      (data: StandardModel[]) => {
        this.spinnerService.hide();
        this.standards = data;
        if(this.standards.length > 0) {
          this.onSelectionChange(this.standards[0]['standardId']);
        }
      },
      (error) => {
        this.spinnerService.hide();
        swal({
          position: 'center',
          type: 'error',
          title: 'Error occured in server',
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }

}
