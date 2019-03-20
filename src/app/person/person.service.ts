import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    private readonly API = 'https://localhost:5001/api/Person/';
    constructor(private http: HttpClient) { }

    getPersons(){
        return this.http.get(this.API);
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
}