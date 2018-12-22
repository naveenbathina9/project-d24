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
  console.log(standardModel);
  return this.http.post<HttpResponseModel<boolean>>(this.baseUrl + 'UpdateStandard', standardModel);
}

getStandardById(id: string) {
  return this.http.get<HttpResponseModel<StandardModel>>(this.baseUrl + 
                            'GetStandardById?StandardId=' + id);
}

deleteStandard(id: string) {

}

//   DATA = [
//     {
//         id: 1,
//         firstName: 'Mark',
//         lastName: 'Otto',
//         username: '@mdo',
//         email: 'mdo@gmail.com',
//         age: '28'
//     },
//     {
//         id: 2,
//         firstName: 'Jacob',
//         lastName: 'Thornton',
//         username: '@fat',
//         email: 'fat@yandex.ru',
//         age: '45'
//     },
//     {
//         id: 3,
//         firstName: 'Larry',
//         lastName: 'Bird',
//         username: '@twitter',
//         email: 'twitter@outlook.com',
//         age: '18'
//     },
//     {
//         id: 4,
//         firstName: 'John',
//         lastName: 'Snow',
//         username: '@snow',
//         email: 'snow@gmail.com',
//         age: '20'
//     },
//     {
//         id: 5,
//         firstName: 'Jack',
//         lastName: 'Sparrow',
//         username: '@jack',
//         email: 'jack@yandex.ru',
//         age: '30'
//     },
//     {
//         id: 6,
//         firstName: 'Ann',
//         lastName: 'Smith',
//         username: '@ann',
//         email: 'ann@gmail.com',
//         age: '21'
//     },
//     {
//         id: 7,
//         firstName: 'Barbara',
//         lastName: 'Black',
//         username: '@barbara',
//         email: 'barbara@yandex.ru',
//         age: '43'
//     },
//     {
//         id: 8,
//         firstName: 'Sevan',
//         lastName: 'Bagrat',
//         username: '@sevan',
//         email: 'sevan@outlook.com',
//         age: '13'
//     },
//     {
//         id: 9,
//         firstName: 'Ruben',
//         lastName: 'Vardan',
//         username: '@ruben',
//         email: 'ruben@gmail.com',
//         age: '22'
//     },
//     {
//         id: 10,
//         firstName: 'Karen',
//         lastName: 'Sevan',
//         username: '@karen',
//         email: 'karen@yandex.ru',
//         age: '33'
//     },
//     {
//         id: 11,
//         firstName: 'Mark',
//         lastName: 'Otto',
//         username: '@mark',
//         email: 'mark@gmail.com',
//         age: '38'
//     },
//     {
//         id: 12,
//         firstName: 'Jacob',
//         lastName: 'Thornton',
//         username: '@jacob',
//         email: 'jacob@yandex.ru',
//         age: '48'
//     },
//     {
//         id: 13,
//         firstName: 'Haik',
//         lastName: 'Hakob',
//         username: '@haik',
//         email: 'haik@outlook.com',
//         age: '48'
//     },
//     {
//         id: 14,
//         firstName: 'Garegin',
//         lastName: 'Jirair',
//         username: '@garegin',
//         email: 'garegin@gmail.com',
//         age: '40'
//     },
//     {
//         id: 15,
//         firstName: 'Krikor',
//         lastName: 'Bedros',
//         username: '@krikor',
//         email: 'krikor@yandex.ru',
//         age: '32'
//     }
// ];

}
