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
  standardmodel: StandardModel;
  id: string;

  constructor(private _standardService: StandardService, 
              private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParams.subscribe(
      (params) => {
        this.id = params['id'];
      }
    );
    
    console.log('params ' + this.id);

    this._standardService.getStandardById(this.id).subscribe(
      (data: HttpResponseModel<StandardModel>) => {
          this.standardmodel = data.ResponseData;
      }
    );
  }
}
