import { Injectable } from '@angular/core';
import { StudentSubscriptionData } from '../models/student-subscription-data';

@Injectable()
export class SubscriptionService {
subscriptions: StudentSubscriptionData[] = [{
  SubscriptionId: '1',
  Status: 'Non-active',
  ExpiryDate: '10-1-2017'
},
{
  SubscriptionId: '2',
  Status: 'Non-active',
  ExpiryDate: '10-1-2018'
},
{
  SubscriptionId: '3',
  Status: 'active',
  ExpiryDate: '10-1-2019'
}]

  constructor() { }

  getSubscriptionsByStudentId(studentId: string) {
    return this.subscriptions;
  }

}
