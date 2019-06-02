import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly API = 'https://localhost:5001/api/Payment/';
  constructor(private http: HttpClient) { }

  getPaymentOfPerson(id){
      return this.http.get(this.API+'getNextPayments/'+id);
  }

  postPayment(data) {
    const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(this.API+'makePayment/', data, httpOptions);
  }
}
