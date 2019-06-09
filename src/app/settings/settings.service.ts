import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private readonly API = environment.apiRoot;
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Methods': '*'})
    }

    postUserAdmin(user) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.http.post(this.API + "User", user, httpOptions);
    }

}