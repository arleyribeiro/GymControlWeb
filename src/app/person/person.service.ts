import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    private readonly API = environment.apiRoot + 'Person/';
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json, application/text'})
    }

    getAuthenticate(user) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post(this.API + "authenticate", user, httpOptions);
    }

    getPersons(){
        return this.http.get(this.API);
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
        return this.http.get("https://viacep.com.br/ws/" + cep + "/json/", this.httpOptions);
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

    getBirthdaysOfMonth(month){
        return this.http.get(this.API + "dob/" + month);
    }

    checkCpf(cpf) {
        return this.http.get(this.API + "checkCpf/" + cpf);
    }
}