import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'  //Forma de Inyectar un servicio a toda la aplicacion
})
export class GifsService {

  private apiKey = 'FzsJcTXWfyb33olGHrAMNEk8UrnkXzZk';
  private url = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultados: Gif[] = JSON.parse(localStorage.getItem('resultados')!) || [];

  get historial(): string[] {
    return [... this._historial];
  }

  constructor(private http: HttpClient) { 
    /*   if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    } */
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  
  buscarGif(termino: string) { 

    termino = termino.trim().toLowerCase();
    
    if (!this._historial.includes(termino)) {//Que los elementos sean unicos
      this._historial.unshift(termino);   
      this._historial = this._historial.slice(0, 10); //Solo se puede tener un historial de 10 elementos

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    //Llamar a la API

    const params = new HttpParams().set('api_key', this.apiKey).set('q', termino).set('limit', '10');



    this.http.get<SearchGifsResponse>(`${this.url}/search`, { params })
    .subscribe( (resp) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    }
    );
    console.log(this._historial);
  }
}
