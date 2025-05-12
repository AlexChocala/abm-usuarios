import { Injectable } from '@angular/core';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private usuarios: Usuario[] = [];

  constructor() {
    const almacenados = localStorage.getItem('usuarios');
    this.usuarios = almacenados ? JSON.parse(almacenados) : [];
  }

  obtenerUsuarios(): Usuario[] {
    return this.usuarios;
  }

  agregarUsuario(usuario: Usuario): void {
    usuario.id = Date.now();
    this.usuarios.push(usuario);
    this.guardar();
  }

  eliminarUsuario(id: number): void {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
    this.guardar();
  }

  modificarUsuario(usuario: Usuario): void {
    const index = this.usuarios.findIndex(u => u.id === usuario.id);
    if (index > -1) {
      this.usuarios[index] = usuario;
      this.guardar();
    }
  }

  private guardar(): void {
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }
}