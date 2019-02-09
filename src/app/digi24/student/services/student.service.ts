import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpResponseModel } from '../models/http-response-model';
import { StudentBasicData } from '../models/student-basic-data';
import { StudentModule } from '../student.module';

@Injectable()
export class StudentService {
baseUrl: string = 'http://52.66.11.57/Digi24/api/Student/';

  constructor(private http: HttpClient) { }

  getStudentsByStandardId(id: string) : any {
    return this.http.get<HttpResponseModel<StudentBasicData>>(this.baseUrl + 'GetStudentByStandard/' + id);
  }

  getStudentById(id: string): any {
    return this.http.get<StudentBasicData>(this.baseUrl + 'GetStudentById/' + id);
  }

  createStudent(student: StudentModule): any {
    return this.http.post<HttpResponseModel<number>>(this.baseUrl + 'CreateStudent', student);
  }
}
