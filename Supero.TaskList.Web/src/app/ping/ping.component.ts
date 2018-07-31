import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './../services/auth.service';
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';

interface IApiResponse {
  message: string;
}

@Component({
  selector: 'app-ping',
  templateUrl: './ping.component.html',
  styleUrls: ['./ping.component.css']
})
export class PingComponent implements OnInit {

  API_URL = environment.API_URL;
  message: string;

  constructor(public auth: AuthService, private http: HttpClient) {}

  ngOnInit() {
  }

  public ping(): void {
    this.message = '';
    this.http.get(`${this.API_URL}/public`)
      .subscribe(
        data => this.message = (data as IApiResponse).message,
        error => this.message = error
      );
  }

  public securedPing(): void {
    this.message = '';
    this.http.get(`${this.API_URL}/private`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    })
      .subscribe(
        data => this.message = (data as IApiResponse).message,
        error => this.message = error
      );
  }
}
