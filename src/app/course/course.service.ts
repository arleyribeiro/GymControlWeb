import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private readonly API = environment.apiRoot + 'Course/';
  constructor(private http: HttpClient) { }


  get(){
    return this.http.get(this.API+"listCourses");
  }

  getCourseWithGrades() {
    return this.http.get(this.API+"listCourseGrades");
  }

  getCourse(id){
      return this.http.get(this.API+id);
  }

  post(data) {
      return this.http.post(this.API, data);
  }

  update(id, data) {
      const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
      }
      return this.http.put(this.API + id + '/', data, httpOptions);
  }

  delete(data) {
      return this.http.post(this.API + "disabledCourse/", data);
  }
}
