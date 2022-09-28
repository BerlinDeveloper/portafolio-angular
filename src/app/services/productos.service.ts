import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) { 
  this.cargarProductos();
  }

  private cargarProductos() {
    this.http.get<Producto[]>('https://test-angular-mec-default-rtdb.firebaseio.com/productos_idx.json')
    .subscribe( (resp: Producto[]) => {
      //  console.log(resp);
       this.productos = resp;
       this.cargando = false;

      // prueba para que se demore 6 segundos en dar respuesta  y poder ver el cargando
      //  setTimeout(() => {
      //   this.cargando = false;
      //  }, 6000);

    });
  }
}
