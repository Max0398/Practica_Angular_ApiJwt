import { Component, inject, Injector } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModules } from '../MaterialModules';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule,MaterialModules,MatButtonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  private accesoService = inject (AccesoService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);

  public formRegistro:FormGroup=this.formBuild.group({
    nombre:["",Validators.required],
    correo:["",Validators.required],
    clave:["",Validators.required]
  })

  registro(){
    if(this.formRegistro.invalid){
      return;
    }
    const objeto:Usuario={
      nombreUsuario:this.formRegistro.value.nombre,
      correo:this.formRegistro.value.correo,
      clave:this.formRegistro.value.clave
    }
    this.accesoService.registrarse(objeto).subscribe({
      next:(data)=>{
        if(data.isSuccess){
          this.router.navigate([""])
        }
        else{
          alert("No se Pudo Registrar")
        }
      },
      error:(error)=>{
        console.log(error.message);
      }
    });
  }
  volver(){
    this.router.navigate([""])
  }
}
