"use client";

import { useState } from "react";
import { courses as initialCourses } from "@/lib/data";
import { Course } from "@/types/course";
import CourseCard from "@/components/CourseCard";
import ActionButton from "@/components/ActionButton";
import CourseFormModal from "@/components/CourseFormModal";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCourseAdded = (newCourse: Course) => {
    setCourses((prev) => [...prev, newCourse]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cursos Disponibles</h1>
            <p className="text-gray-600 mt-1">
              Explora nuestra oferta de cursos tecnológicos
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Total de cursos:{" "}
              <span className="font-semibold text-gray-700">{courses.length}</span>
            </p>
          </div>
          <ActionButton
            label="Agregar Curso"
            variant="primary"
            onClick={() => setModalOpen(true)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      <CourseFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleCourseAdded}
      />
    </div>
  );
};

export default CoursesPage;
