import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubjectModel } from '../model/subject-model';
import { HttpResponseModel } from '../model/http-response-model';

@Injectable()
export class SubjectService {
  private baseUrl: string = "http://52.66.11.57/Digi24/api/SubjectMaster/";

  constructor(private http: HttpClient) { }

  createSubject(subject: SubjectModel) {
    return this.http.post<HttpResponseModel<number>>(this.baseUrl + 'CreateSubject', subject);
  }

  getSubjectsByStandardId(id: string) {
    return this.http.get<HttpResponseModel<SubjectModel[]>>(this.baseUrl + 
          'GetSubjectsByStandardId?standardId=' + id);
  }

  deleteSubjectById(id: string) {
    return this.http.delete<HttpResponseModel<boolean>>(this.baseUrl + 
          'DeleteSubjectById?subjectId=' + id);
  }

  getAllSubjects() {
    return this.http.get<HttpResponseModel<SubjectModel[]>>(this.baseUrl + 
          'GetAllSubjects');
  }
}
