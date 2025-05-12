import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioUsuarioComponent } from './componentes/formulario-usuario/formulario-usuario.component';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormularioUsuarioComponent,
    ListadoUsuariosComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'mi-proyecto';
  
  @ViewChild(FormularioUsuarioComponent) formularioUsuario!: FormularioUsuarioComponent;
  @ViewChild(ListadoUsuariosComponent) listado!: ListadoUsuariosComponent;

  agregarUsuario() {
    if (this.formularioUsuario) {
      this.formularioUsuario.limpiarFormulario();
      
      setTimeout(() => {
        const formElement = document.querySelector('app-formulario-usuario');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }
}
