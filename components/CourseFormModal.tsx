"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ActionButton from "@/components/ActionButton";
import { Course } from "@/types/course";
import { X } from "lucide-react";

const CATEGORIAS = ["Frontend", "Backend", "Mobile", "Cloud", "DevOps", "Data Science"];

interface CourseFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (course: Course) => void;
}

const CourseFormModal = ({ open, onClose, onSuccess }: CourseFormModalProps) => {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [duracion, setDuracion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setNombre("");
    setCategoria("");
    setDuracion("");
    setError("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const duracionNum = Number(duracion);
    if (!nombre.trim() || !categoria || !duracion) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (isNaN(duracionNum) || duracionNum <= 0) {
      setError("La duración debe ser un número positivo.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre.trim(), categoria, duracion: duracionNum }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Error al registrar el curso.");
        return;
      }

      onSuccess(json.data as Course);
      resetForm();
      onClose();
    } catch {
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} maxWidth="max-w-md">
      <div className="p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Nuevo Curso</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Completa los campos para registrar un curso.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="nombre">Nombre del curso</Label>
            <Input
              id="nombre"
              placeholder="Ej: React Avanzado"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="categoria">Categoría</Label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              disabled={loading}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="" disabled>Selecciona una categoría</option>
              {CATEGORIAS.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="duracion">Duración (horas)</Label>
            <Input
              id="duracion"
              type="number"
              min={1}
              placeholder="Ej: 40"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              disabled={loading}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-1">
            <ActionButton
              label="Cancelar"
              variant="secondary"
              onClick={handleClose}
              disabled={loading}
              type="button"
            />
            <ActionButton
              label="Registrar Curso"
              variant="primary"
              loading={loading}
              type="submit"
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CourseFormModal;
