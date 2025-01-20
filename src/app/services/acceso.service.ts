import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../interfaces/ResponseAcceso';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  //private http=inject(HttpClient)
  private baseUrl:string = appsettings.apiUrl;
  constructor(private http: HttpClient) { }
  //funcion para acceder al registro de nuevo usuario pasando objeto usuario al url de la api
  registrarse(objeto:Usuario):Observable<ResponseAcceso>{
    return this.http.post<ResponseAcceso>(`${this.baseUrl}Acceso/Registrarse`,objeto)
  }

  login(objeto:Login):Observable<ResponseAcceso>{
    return this.http.post<ResponseAcceso>(`${this.baseUrl}Acceso/Login`,objeto)
  }
//Validara el token y retornara una respuesta true o false
  validarToken(token:string):Observable<ResponseAcceso>{
    return this.http.get<ResponseAcceso>(`${this.baseUrl}Acceso/ValidarToken?token=${token}`)
  }

}
