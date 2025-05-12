import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Usuario, UsuarioService } from '../../servicios/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  @Output() usuarioParaEditar = new EventEmitter<Usuario>();
  @Output() agregarUsuarioClick = new EventEmitter<void>();

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id);
      this.cargarUsuarios();
    }
  }

  editar(usuario: Usuario): void {
     if (confirm(`¿Desea editar al usuario: ${usuario.nombre} ${usuario.apellido}?`)) {
      this.usuarioParaEditar.emit(usuario);
    }
  }

  solicitarAgregarUsuario(): void {
    this.agregarUsuarioClick.emit();
  }
}