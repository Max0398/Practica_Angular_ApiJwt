import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../MaterialModules';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-inicio',
  imports: [ReactiveFormsModule,MaterialModules,MatButtonModule,MatTableModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  private productoService=inject(ProductoService);
  public listaProducto:Producto[]=[];
  public displayedColumns:string[]=['nombre','marca','precio'];

  /**
   *
   */
  constructor() {
    this.productoService.listaProducto().subscribe({
      next:(data)=>{
        if(data.value.length>0){
          this.listaProducto=data.value
        }
      },
      error:(error)=>{
        console.log(error.message)
      }
    })
  }

}
