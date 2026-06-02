export interface Course {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  duracion: number;
  imagen: string;
  estado: "Activo" | "En Progreso" | "Finalizado";
}
