import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) { 
  this.cargarProductos();
  }

  private cargarProductos() {
    //azincrono promesas: IPv6 ? 
    return new Promise( (resolve,reject) => {

      this.http.get<Producto[]>('https://test-angular-mec-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
         //console.log(resp);
         this.productos = resp;
         this.cargando = false;  
         resolve('Success');
        // prueba para que se demore 6 segundos en dar respuesta  y poder ver el cargando
        //  setTimeout(() => {
        //   this.cargando = false;
        //  }, 6000);  
      });

    });
  }


  getProductos(id: string){
    //template literales: insercciones de variables en una cadena de texto 
    // `(back tick) <- al lado del 1 
    return this.http.get<ProductoDescripcion>(`https://test-angular-mec-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  buscarPorductos(termino: string){

    if (this.productos.length === 0){

      this.cargarProductos().then(()=>{
        this.filtrarProductos(termino);
      });

    }else{
        this.filtrarProductos(termino);
    } 
  }


 private filtrarProductos(termino: string) {

  // console.log(this.productos);
  this.productosFiltrado = [];
  termino = termino.toLocaleLowerCase();

  this.productos.forEach( prod => {
    const tituloLower = prod.titulo.toLocaleLowerCase();
    if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ){
      this.productosFiltrado.push(prod);
    }
  });
  
 }
  
}
