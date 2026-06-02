"use client";

import { useState } from "react";
import { Course } from "@/types/course";
import StatusBadge from "@/components/StatusBadge";
import ActionButton from "@/components/ActionButton";
import CourseDetailModal from "@/components/CourseDetailModal";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] flex flex-col overflow-hidden">
        <img
          src={course.imagen}
          alt={`Imagen del curso ${course.nombre}`}
          className="w-full h-40 object-cover"
        />
        <div className="p-4 flex flex-col flex-1 gap-3">
          <h3 className="text-base font-semibold text-gray-900 leading-tight">
            {course.nombre}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{course.descripcion}</p>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={course.categoria} variant="category" />
            <StatusBadge status={course.estado} variant="status" />
          </div>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Duración:</span> {course.duracion} horas
          </p>
          <div className="mt-auto pt-2">
            <ActionButton
              label="Ver Detalles"
              variant="primary"
              onClick={() => setDetailOpen(true)}
            />
          </div>
        </div>
      </div>

      <CourseDetailModal
        course={course}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </>
  );
};

export default CourseCard;
