import { Component, EventEmitter, Output } from '@angular/core';
import { Usuario, UsuarioService } from '../../servicios/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-usuario.component.html'
})
export class FormularioUsuarioComponent {
  nombre: string = '';
  apellido: string = '';
  dni: string = '';
  email: string = '';
  idModificar: number | null = null;
  modoEdicion: boolean = false;

  @Output() usuarioAgregado = new EventEmitter<void>();

  constructor(private usuarioService: UsuarioService) {}

  guardarUsuario(): void {
    const nuevoUsuario: Usuario = {
      id: this.idModificar ?? 0,
      nombre: this.nombre,
      apellido: this.apellido,
      dni: this.dni,
      email: this.email
    };

    if (this.idModificar !== null) {
      const confirmar = confirm('¿Desea guardar los cambios modificados?');
      if (!confirmar) return;
      this.usuarioService.modificarUsuario(nuevoUsuario);
    } else {
      this.usuarioService.agregarUsuario(nuevoUsuario);
    }

    this.limpiarFormulario();
    this.usuarioAgregado.emit();
  }

  limpiarFormulario(): void {
    this.nombre = '';
    this.apellido = '';
    this.dni = '';
    this.email = '';
    this.idModificar = null;
    this.modoEdicion = false;
  }

  cargarParaEditar(usuario: Usuario): void {
    this.nombre = usuario.nombre;
    this.apellido = usuario.apellido;
    this.dni = usuario.dni;
    this.email = usuario.email;
    this.idModificar = usuario.id;
    this.modoEdicion = true;
  }
}