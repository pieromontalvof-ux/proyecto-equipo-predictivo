import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private apiUrl = 'https://proyecto-equipo-predictivo.onrender.com/api/clasificar';

  constructor(private http: HttpClient) {}

  clasificarImagen(formData: FormData) {
    return this.http.post(this.apiUrl, formData);
  }
}