import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  constructor(private http: HttpClient) { 
    // console.log("Servicio infopagina listo");
    // leer archivo json y tomar sus propiedades en las demas paginas
    this.http.get('assets/data/data-pagina.json').subscribe(
      (resp:  InfoPagina)=> {
      //    console.log( resp['twitter']); investigar no me deja tomar la propiedad de este objeto
      this.info = resp;
      this.cargada = true;
        console.log(resp); 
      });
  }
}
