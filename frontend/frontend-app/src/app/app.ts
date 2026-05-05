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
  imagenPreview: string = '';
  resultado: string = '';
  probs: any = null;
  graphUrl: string = '';

  constructor(private api: Api) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.resultado = '';
    this.probs = null;
    this.graphUrl = '';

    if (this.selectedFile) {
      this.imagenPreview = URL.createObjectURL(this.selectedFile);
    }
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
        this.probs = res.probs;
        this.graphUrl = `https://proyecto-equipo-predictivo.onrender.com/static/uploads/probabilidades.png?t=${new Date().getTime()}`;
      },
      error: () => {
        this.resultado = 'Error al conectar con Flask';
      }
    });
  }

  getProbabilidades(): [string, number][] {
    return this.probs ? Object.entries(this.probs) as [string, number][] : [];
  }
}