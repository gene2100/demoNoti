import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, retry, throwError } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class notificationService{

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  url = 'http://localhost:8080'

  constructor(private http: HttpClient) {}

  public subscibeToDB(jsonBody: any){
    return this.http.post(this.url + '/api/v1/subscribe-token', jsonBody).subscribe(
      (data) => {
        console.log(data)
      }
    )
  }
}
