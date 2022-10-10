import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  //propiedad // objeto vacio
  productoDesc!: ProductoDescripcion;
  id!: string;

  constructor( private route: ActivatedRoute,
               public productoService: ProductosService) {
                 }

  ngOnInit(): void {

    this.route.params.subscribe(parametros =>{
      // test console.log(parametros['id']);
      this.productoService.getProductos(parametros['id'])
      .subscribe((producto: ProductoDescripcion) =>{
        // console.log(producto);
        this.id = parametros['id'];
        this.productoDesc = producto;
      });
    });
  }

}
