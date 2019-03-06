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
}