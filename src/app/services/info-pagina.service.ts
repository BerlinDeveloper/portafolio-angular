import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina-interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];

  constructor(private http: HttpClient) { 
   this.cargarInfo();
   this.cargarEquipo();
  }

  private cargarInfo(){
    // leer archivo json y tomar sus propiedades en las demas paginas
    this.http.get('assets/data/data-pagina.json').subscribe(
      (resp:  InfoPagina)=> {
      //    console.log( resp['twitter']); investigar no me deja tomar la propiedad de este objeto
      this.info = resp;
      this.cargada = true;
       // console.log(resp); 
      });
  }

  private cargarEquipo() {
    this.http.get('https://test-angular-mec-default-rtdb.firebaseio.com/equipo.json').subscribe(
      (resp:  any)=> {
      this.equipo = resp;
        // console.log(resp); se comenta solo se usa para test 
      });
  }


}
