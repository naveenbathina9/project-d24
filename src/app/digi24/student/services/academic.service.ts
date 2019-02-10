import { Injectable } from '@angular/core';
import { StudentAcademicData } from '../models/student-academic-data';

@Injectable()
export class AcademicService {
academicDetails: StudentAcademicData[] = [{
  Standard: '1',
  AcademicYear: '2017',
  Result: 'Pass'
},
{
  Standard: '2',
  AcademicYear: '2018',
  Result: 'Pass'
},
{
  Standard: '3',
  AcademicYear: '2019',
  Result: 'Pass'
}
]

  constructor() { }

  getAcademicDataByStudentId(studentId: string) {
    return this.academicDetails;
  }
}
