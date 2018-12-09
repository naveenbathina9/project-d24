import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel } from '../models/employee-model';
import { HttpResponseModel } from '../models/http-response-model';

@Injectable()
export class UserManagementService {
  private baseURL :string  = 'http://52.66.11.57/Digi24/api/Employee/';
  constructor(private http:HttpClient) { 
  }

  createUser(employee:any){
    return this.http.post(this.baseURL+'CreateEmployee',employee);
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

}
