import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StandardModel } from '../model/standard-model';
import { HttpResponseModel } from '../model/http-response-model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StandardService {
private baseUrl: string = "http://52.66.11.57/Digi24/api/Standard/";

constructor(private http: HttpClient){ }

getAllStandards() {
  return this.http.get<StandardModel[]>(this.baseUrl + 'GetStandards');
 }

createStandard(standardModel: StandardModel) {
  return this.http.post<HttpResponseModel<number>>(this.baseUrl + 'CreateStandard', standardModel);
 }

updateStandard(standardModel: StandardModel) {
  return this.http.post<HttpResponseModel<boolean>>(this.baseUrl + 'UpdateStandard', standardModel);
 }

getStandardById(id: string) {
  return this.http.get<HttpResponseModel<StandardModel>>(this.baseUrl + 
                            'GetStandardById?StandardId=' + id);
 }

deleteStandard(id: string) {

 }

}
