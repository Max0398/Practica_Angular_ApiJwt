import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/login';
import { MaterialModules } from '../MaterialModules';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [MaterialModules,ReactiveFormsModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private accesoService = inject(AccesoService);
  private router =inject(Router);
  private formBuild = inject(FormBuilder);

  //crear campos del formulario
  public formLogin:FormGroup=this.formBuild.group({
    correo:["",Validators.required],
    clave:["",Validators.required]
  })

  inicioSesion(){
    if(this.formLogin.invalid)
      {
        return;
      }
    const objeto:Login={
      correo:this.formLogin.value.correo,
      clave:this.formLogin.value.clave
    }
    //suscribe para obtener la repuesta
    this.accesoService.login(objeto).subscribe({
      next:(data)=>{
        if(data.isSuccess){
          localStorage.setItem("token",data.token)
          this.router.navigate(["inicio"])
        }else{
          alert("Credenciales Incorrectas")
        }

      },
      error:(error)=>{
        console.log(error.message);
      }
    })

  }

  registrarse(){
    this.router.navigate(["registro"])
  }


}
