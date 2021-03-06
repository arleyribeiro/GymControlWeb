import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentPlansService {

    private readonly API = environment.apiRoot + 'PaymentPlan/';
  constructor(private http: HttpClient) { }

  getPlans(){
      return this.http.get(this.API);
  }

  getPlansOfCourse(courseId, gradeId){
    return this.http.get(this.API+'getPlan?courseId='+courseId+'&gradeId='+gradeId);
  }

  getPersonsActive(){
      return this.http.get(this.API+"userActive/");
  }

  getUser(id){
      return this.http.get(this.API+id);
  }

  postPerson(data) {
      return this.http.post(this.API, data);
  }

  getCep(cep) {
      return this.http.get("https://viacep.com.br/ws/" + cep + "/json/");
  }

  updatePerson(id, data) {
      const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.put(this.API + id + '/', data, httpOptions);
  }

  postDisableUser(data) {
      return this.http.post(this.API + "disableUsers/", data);
  }
}
