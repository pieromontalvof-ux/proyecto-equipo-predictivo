import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  selectedFile: File | null = null;
  resultado: string = '';

  constructor(private api: Api) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  subirImagen() {
    if (!this.selectedFile) {
      this.resultado = 'Selecciona una imagen primero';
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.api.clasificarImagen(formData).subscribe({
      next: (res: any) => {
        this.resultado = res.prediction;
      },
      error: () => {
        this.resultado = 'Error al conectar con Flask';
      }
    });
  }
}