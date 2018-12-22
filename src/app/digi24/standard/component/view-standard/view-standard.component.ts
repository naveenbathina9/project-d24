import { Component, OnInit } from '@angular/core';
import { StandardModel } from '../../model/standard-model';
import { StandardService } from '../../services/standard.service';
import { HttpResponseModel } from '../../model/http-response-model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-standard',
  templateUrl: './view-standard.component.html',
  styleUrls: ['./view-standard.component.scss'],
  providers: [StandardService]
})
export class ViewStandardComponent implements OnInit {
  standardmodel: StandardModel = new StandardModel();
  id: string;

  constructor(private _standardService: StandardService, 
              private route: ActivatedRoute) { }

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
          console.log(data.responseData);
        }
      }
    );
  }
}