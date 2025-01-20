import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable, Injector } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { ResponseProducto } from '../interfaces/ResponseProducto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http= inject(HttpClient);
  private baseUrl:string =appsettings.apiUrl;
  constructor() { }

  listaProducto():Observable<ResponseProducto>{
    return this.http.get<ResponseProducto>(`${this.baseUrl}Producto/ListaProductos`);
  }

}
