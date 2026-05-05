import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private apiUrl = 'http://127.0.0.1:5000/api/clasificar';

  constructor(private http: HttpClient) {}

  clasificarImagen(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }
}