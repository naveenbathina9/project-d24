import { Component, OnInit } from '@angular/core';
import { StandardModel } from '../../model/standard-model';
import { StandardService } from '../../services/standard.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../../shared/services/global.service';
import { Location } from '@angular/common';
import { RootComponent } from '../../../../shared/roots/root.component';
import { HttpResponseModel } from '../../model/http-response-model';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-create-standard',
  templateUrl: './create-standard.component.html',
  styleUrls: ['./create-standard.component.scss'],
  providers: [StandardService]
})
export class CreateStandardComponent extends RootComponent implements OnInit {
  standardModel: StandardModel = new StandardModel();
  updated: boolean;
  id: string;
  loading: boolean = false;
  
    constructor(private standardService: StandardService,
                private route: ActivatedRoute,
                private location: Location,
                private spinnerService: Ng4LoadingSpinnerService,
                public globalService: GlobalService ) {
                  super(globalService);
                 }
  
    ngOnInit() {
    }
  
    onSubmit(standardForm: NgForm) {
      this.loading = true;
  
      this.spinnerService.show();

      this.standardService.createStandard(this.standardModel).subscribe(
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
  
              standardForm.reset();              

            //this.location.back();
             } else {

            this.spinnerService.hide();

            swal({
              position: 'center',
              type: 'error',
              title: data.responseMessage,
              showConfirmButton: false,
              timer: 1500
            });
          }
        },
        (failure) => {
          
          this.spinnerService.hide();

          swal({
            position: 'center',
            type: 'error',
            title: "Failed to create standard",
            showConfirmButton: false,
            timer: 1500
          });
        }
      );
  
      this.loading = false;
    }
  
    onCancel() {
      this.location.back();
    }

}
