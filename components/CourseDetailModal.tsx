"use client";

import Modal from "@/components/Modal";
import StatusBadge from "@/components/StatusBadge";
import { Course } from "@/types/course";
import { X } from "lucide-react";

interface CourseDetailModalProps {
  course: Course;
  open: boolean;
  onClose: () => void;
}

const CourseDetailModal = ({ course, open, onClose }: CourseDetailModalProps) => {
  return (
    <Modal open={open} onClose={onClose} maxWidth="max-w-lg">
      <img
        src={course.imagen}
        alt={`Imagen del curso ${course.nombre}`}
        className="w-full h-52 object-cover"
      />
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900 leading-snug">
            {course.nombre}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 mt-0.5"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed">{course.descripcion}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Categoría
            </span>
            <StatusBadge status={course.categoria} variant="category" />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Estado
            </span>
            <StatusBadge status={course.estado} variant="status" />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Duración
            </span>
            <span className="text-gray-800 font-medium">{course.duracion} horas</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              ID del curso
            </span>
            <span className="text-gray-800 font-medium">#{course.id}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CourseDetailModal;
