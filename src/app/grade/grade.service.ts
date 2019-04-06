import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class GradeService {

    private readonly API = 'https://localhost:5001/api/Grade/';
    constructor(private http: HttpClient) { }

    getGrade(){
        return this.http.get(this.API);
    }

    postGrade(data) {
        return this.http.post(this.API, data);
    }
}