import { Component, OnInit } from '@angular/core'
import { StandardService } from '../../services/standard.service';
import { StandardModel } from '../../model/standard-model';
import { ActivatedRoute } from '@angular/router';
import { HttpResponseModel } from '../../model/http-response-model';
import { Location } from '@angular/common';
import { RootComponent } from '../../../../shared/roots/root.component';
import { GlobalService } from '../../../../shared/services/global.service';
import swal from 'sweetalert2';
import { SubjectService } from '../../services/subject.service';
import { SubjectModel } from '../../model/subject-model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-update-standard',
  templateUrl: './update-standard.component.html',
  styleUrls: ['./update-standard.component.scss'],
  providers: [StandardService, SubjectService]
})
export class UpdateStandardComponent extends RootComponent implements OnInit {
standardModel: StandardModel = new StandardModel();
subjectList: SubjectModel[] = [];
newSubjectList: SubjectModel[] = [];
updated: boolean;
id: string;
loading: boolean = false;
newSubject: string;
validSubject: boolean = false;
subjectPresentAlready: boolean = false;

  constructor(private standardService: StandardService,
              private route: ActivatedRoute,
              private location: Location,
              private subjectService: SubjectService,
              public globalService: GlobalService ) {
                super(globalService);
               }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.route.queryParams.subscribe(
      (params) => {
        this.id = params['Id'];
      }
    );

    this.standardService.getStandardById(this.id).subscribe(
      (data: HttpResponseModel<StandardModel>) => {
        if(data.isFaulted === false) {
          this.standardModel = data.responseData;

          this.subjectService.getSubjectsByStandardId(this.id).subscribe(
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

  onSubmit() {
    this.loading = true;

    this.standardService.updateStandard(this.standardModel).subscribe(
      (data: HttpResponseModel<boolean>) => {
        if(data.isFaulted === false) {

          let subjectsInserted: boolean = true;

          this.newSubjectList.forEach(newSubj => {
            this.subjectService.createSubject(newSubj).subscribe(
              result => {
                if(result.isFaulted === true) {
                  subjectsInserted = false;

                  swal({
                    position: 'center',
                    type: 'error',
                    title: 'One or more subject not inserted',
                    showConfirmButton: true
                  }).then(() => {
                    this.loadData();
                  })
                }
              }
            )
          });

          if(subjectsInserted === true) {
            this.newSubjectList = [];

            swal({
              position: 'center',
              type: 'success',
              title: data.responseMessage,
              showConfirmButton: false,
              timer: 1500
            });
          }

          //this.location.back();
        } else {
          swal({
            position: 'center',
            type: 'error',
            title: data.responseMessage,
            showConfirmButton: true
            // timer: 1500
          }).then(() => {
            this.loadData();
          });
        }
      }
    );

    this.loading = false;
  }

  onAddSubject() {
    this.validSubject = false;
    this.subjectPresentAlready = false;

    if(this.newSubject) {
      this.subjectList.forEach(subject => {
        if(subject['title'].toLowerCase() === this.newSubject.toLowerCase()) {
          this.subjectPresentAlready = true;
        }
      });

      if(this.subjectPresentAlready === false) {
        let subj: SubjectModel = new SubjectModel();
        subj['title'] = this.newSubject;
        subj['subjectId'] = "0";
        subj['standardId'] = this.id;

        this.newSubjectList.push(subj);

        this.subjectList.push(subj);

        this.subjectList.forEach(element => {
          console.log(element['title']);
        });

        this.newSubject = '';

      } else {
        swal({
          position: 'center',
          title: 'Subject already added',
          type: 'warning',
          showConfirmButton: true
        });
      }

      this.newSubject = '';
    }
  }

  onCancel() {
    this.location.back();
  }

  enableAddSubject() {
    if(this.newSubject) {
      this.validSubject = true;
    } else {
      this.validSubject = false;
    }
  }
}
