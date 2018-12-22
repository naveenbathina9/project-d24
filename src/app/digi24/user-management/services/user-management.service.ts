import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EmployeeModel } from '../models/employee-model';
import { HttpResponseModel } from '../models/http-response-model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class UserManagementService {
  private baseURL :string  = 'http://52.66.11.57/Digi24/api/Employee/';
  constructor(private http:HttpClient) { 
  }

  extractData(res: Response) {
    let body = res;
    return body || {};
  }

  handleErrorPromise (error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

  createUser(employee:EmployeeModel):any{
    //console.log(employee);
    return this.http.post(this.baseURL+'CreateEmployee',employee, httpOptions)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  updateUser(employee:EmployeeModel):any{
    //console.log(employee);
    return this.http.post(this.baseURL+'UpdateEmployee',employee, httpOptions)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  getAllEmployees(){
    return this.http.get<HttpResponseModel<EmployeeModel[]>>(this.baseURL+'GetAllEmployees');
  }

  getEmployeeById(id:string){
    return this.http.get<HttpResponseModel<EmployeeModel>>(this.baseURL+'GetEmployeeById?id='+id);
  }

  deleteEmployee(id:string){
    return "User "+ id + " is deleted ...!";
  }


  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throw Error('Something bad happened; please try again later.');
  // };

}
