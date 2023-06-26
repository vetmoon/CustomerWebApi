import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../Models/Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpclient: HttpClient) { }
  baseurl = "http://localhost:5168/api/Customer";

  GetCustomer(): Observable<Customer[]> {
    return this.httpclient.get<Customer[]>(this.baseurl);
  }
  

  CreateCustomer(cus: Customer): Observable<Customer> {
    cus.id = "00000000-0000-0000-0000-000000000000";
    return this.httpclient.post<Customer>(this.baseurl, cus);
  }

  UpdateCustomer(cus: Customer): Observable<Customer> {
    return this.httpclient.put<Customer>(this.baseurl + '/' + cus.id, cus);
  }

  DeleteCustomer(id: string): Observable<Customer> {
    return this.httpclient.delete<Customer>(this.baseurl + '/' + id);
  }
}
