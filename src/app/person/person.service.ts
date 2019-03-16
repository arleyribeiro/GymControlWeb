import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonModel } from './person.model';

@Injectable()
export class PersonService {

    private readonly API = 'https://localhost:5001/api/Person/';
    constructor(private http: HttpClient) { }

    getPersons(){
        return this.http.get<PersonModel[]>(this.API);
    }

    postPerson(data) {
        return this.http.post(this.API, data);
    }

    getCep(cep) {
        return this.http.get("https://viacep.com.br/ws/" + cep + "/json/");
    }

    /*deleteInconsistency(id) {
    return this.http.delete(this.apiRoot.concat('inconsistency/' + id));
    }

    deleteSuggestion(id) {
    return this.http.delete(this.apiRoot.concat('suggestion/' + id));
    }

    updateInconsistency(id, data) {
    const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(this.apiRoot.concat('inconsistency/' + id + '/'), data, httpOptions);
    }*/
    
}