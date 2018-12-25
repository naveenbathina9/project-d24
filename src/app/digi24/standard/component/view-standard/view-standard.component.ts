import { Component, OnInit } from '@angular/core';
import { StandardModel } from '../../model/standard-model';
import { StandardService } from '../../services/standard.service';
import { HttpResponseModel } from '../../model/http-response-model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SubjectModel } from '../../model/subject-model';
import { SubjectService } from '../../services/subject.service';
import { GlobalService } from '../../../../shared/services/global.service';
import { RootComponent } from '../../../../shared/roots/root.component';
import swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-standard',
  templateUrl: './view-standard.component.html',
  styleUrls: ['./view-standard.component.scss'],
  providers: [ StandardService, SubjectService ]
})
export class ViewStandardComponent extends RootComponent implements OnInit {
  standardmodel: StandardModel = new StandardModel();
  subjectList: SubjectModel[] = [];

  id: string;

  constructor(private _standardService: StandardService,
              private _subjectService: SubjectService,
              private route: ActivatedRoute,
              private location: Location,
              public _globalService: GlobalService) {
                super(_globalService);
               }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params) => {
        this.id = params['id'];
      }
    );

    this._standardService.getStandardById(this.id).subscribe(
      (data: HttpResponseModel<StandardModel>) => {
        if(data.isFaulted === false) {
          this.standardmodel = data.responseData;

          this._subjectService.getSubjectsByStandardId(this.id).subscribe(
            (subjectData: HttpResponseModel<SubjectModel[]>) => {
              this.subjectList = subjectData.responseData;
            },
            (error: HttpErrorResponse) => {
              swal({
                position: 'center',
                type: 'error',
                title: 'error occured in server',
                showConfirmButton: true
              }).then(() => {
                  this.location.back();
                }
              )
            });
        }
      },
      (error: HttpErrorResponse) => {
        swal({
          position: 'center',
          type: 'error',
          title: 'error occured in server',
          showConfirmButton: true
        }).then(() => {
            this.location.back();
          }
        )
      });
  }

  onCancel() {
    this.location.back();
  }
}
