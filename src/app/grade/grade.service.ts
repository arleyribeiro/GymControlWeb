import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GradeService {

    private readonly API = environment.apiRoot + 'Grade/';
    constructor(private http: HttpClient) { }

    addPerson(data){
        return this.http.post(this.API+'newPerson', data);
    }
    
    getGrade(){
        return this.http.get(this.API);
    }

    postGrade(data) {
        return this.http.post(this.API, data);
    }

    getGradesWithDaysWeek(){
        return this.http.get(this.API+'grades');
    }

    update(id, data) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.put(this.API + id + '/', data, httpOptions);
    }

    delete(data) {
        return this.http.post(this.API + "disabledGrades/", data);
    }
}