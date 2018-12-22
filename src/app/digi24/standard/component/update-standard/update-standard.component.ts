import { Component, OnInit } from '@angular/core'
import { StandardService } from '../../services/standard.service';
import { StandardModel } from '../../model/standard-model';
import { ActivatedRoute } from '@angular/router';
import { HttpResponseModel } from '../../model/http-response-model';
import { Location } from '@angular/common';
import { RootComponent } from '../../../../shared/roots/root.component';
import { GlobalService } from '../../../../shared/services/global.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-standard',
  templateUrl: './update-standard.component.html',
  styleUrls: ['./update-standard.component.scss'],
  providers: [StandardService]
})
export class UpdateStandardComponent extends RootComponent implements OnInit {
standardModel: StandardModel = new StandardModel();
updated: boolean;
id: string;
loading: boolean = false;

  constructor(private standardService: StandardService,
              private route: ActivatedRoute,
              private location: Location,
              public globalService: GlobalService ) {
                super(globalService);
               }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params) => {
        this.id = params['Id'];
      }
    );

    this.standardService.getStandardById(this.id).subscribe(
      (data: HttpResponseModel<StandardModel>) => {
        if(data.isFaulted === false) {
          this.standardModel = data.responseData;
        }
      }
    )
  }

  onSubmit() {
    this.loading = true;

    this.standardService.updateStandard(this.standardModel).subscribe(
      (data: HttpResponseModel<boolean>) => {
        if(data.isFaulted === false) {
          swal({
            position: 'center',
            type: 'success',
            title: data.responseMessage,
            showConfirmButton: false,
            timer: 1500
          });

          //this.location.back();
        } else {
          swal({
            position: 'center',
            type: 'error',
            title: data.responseMessage,
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );

    this.loading = false;
  }

  onCancel() {
    this.location.back();
  }
}
