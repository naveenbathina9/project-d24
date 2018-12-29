import { Component, OnInit } from '@angular/core';
import { StandardService } from '../../../standard/services/standard.service';
import { StandardModel } from '../../../standard/model/standard-model';
import { HttpResponseModel } from '../../models/http-response-model';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss'],
  providers: [StandardService]
})
export class ListStudentComponent implements OnInit {
  pageSize = 10;
  pageNumber = 1;
  standards: StandardModel[];

  constructor(private standardService: StandardService,
              private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.standardService.getAllStandards().subscribe(
      (data: StandardModel[]) => {
        this.spinnerService.hide();
        this.standards = data;
      }
    )
  }

  createStudent() {

  }

  loadData() {
    
  }

}
