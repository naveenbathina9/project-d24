import { Component, OnInit } from '@angular/core';
import { StandardService } from '../../services/standard.service';
import { HttpResponseModel } from '../../model/http-response-model';
import { StandardModel } from '../../model/standard-model';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../../../shared/services/global.service';
import { RootComponent } from '../../../../shared/roots/root.component';

@Component({
  selector: 'app-list-standard',
  templateUrl: './list-standard.component.html',
  styleUrls: ['./list-standard.component.scss'],
  providers: [StandardService]
})
export class ListStandardComponent implements OnInit {

  standardList: StandardModel[];

  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;

  constructor(private _standardService: StandardService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._standardService.getAllStandards().subscribe(
      (data: StandardModel[]) => {
          this.standardList = data;
          console.log(this.standardList);
        }
    )
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
}
