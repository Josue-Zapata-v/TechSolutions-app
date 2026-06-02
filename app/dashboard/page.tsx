"use client";

import { useState } from "react";
import { courses as initialCourses } from "@/lib/data";
import { Course } from "@/types/course";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import CourseFormModal from "@/components/CourseFormModal";
import CourseDetailModal from "@/components/CourseDetailModal";
import {
  BookOpen,
  CheckCircle,
  Clock,
  GraduationCap,
  Download,
  PlusCircle,
  Eye,
  Timer,
} from "lucide-react";

const estadoStyles: Record<string, string> = {
  Activo: "bg-green-100 text-green-800 border border-green-200",
  "En Progreso": "bg-amber-100 text-amber-800 border border-amber-200",
  Finalizado: "bg-purple-100 text-purple-800 border border-purple-200",
};

const categoriaStyles: Record<string, string> = {
  Frontend:      "bg-blue-100 text-blue-700",
  Backend:       "bg-indigo-100 text-indigo-700",
  Mobile:        "bg-pink-100 text-pink-700",
  Cloud:         "bg-sky-100 text-sky-700",
  DevOps:        "bg-orange-100 text-orange-700",
  "Data Science": "bg-teal-100 text-teal-700",
};

const DashboardPage = () => {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const total      = courses.length;
  const activos    = courses.filter((c) => c.estado === "Activo").length;
  const enProgreso = courses.filter((c) => c.estado === "En Progreso").length;
  const finalizados = courses.filter((c) => c.estado === "Finalizado").length;

  const today = new Date().toLocaleDateString("es-PE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleCourseAdded = (newCourse: Course) => {
    setCourses((prev) => [...prev, newCourse]);
  };

  const handleExportar = () => {
    const json = JSON.stringify(courses, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `techsolutions-cursos-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const CourseTable = ({ data }: { data: Course[] }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      {data.length === 0 ? (
        <div className="py-12 text-center text-gray-400 text-sm">
          No hay cursos en esta categoría.
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="text-left py-3 px-4 font-semibold tracking-wide">#</th>
              <th className="text-left py-3 px-4 font-semibold tracking-wide">Nombre</th>
              <th className="text-left py-3 px-4 font-semibold tracking-wide">Categoría</th>
              <th className="text-left py-3 px-4 font-semibold tracking-wide">Estado</th>
              <th className="text-left py-3 px-4 font-semibold tracking-wide">Duración</th>
              <th className="text-center py-3 px-4 font-semibold tracking-wide">Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course, index) => (
              <tr
                key={course.id}
                className={`border-b border-gray-100 transition-colors hover:bg-blue-50/50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                }`}
              >
                <td className="py-3.5 px-4 text-gray-400 font-mono text-xs">{String(course.id).padStart(2, "0")}</td>
                <td className="py-3.5 px-4 font-semibold text-gray-800">{course.nombre}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      categoriaStyles[course.categoria] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {course.categoria}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      estadoStyles[course.estado] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {course.estado}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5 text-gray-400" />
                    {course.duracion}h
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCourse(course)}
                    className="flex items-center gap-1.5 text-blue-700 border-blue-200 hover:bg-blue-50 hover:border-blue-400 mx-auto"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Ver
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-0.5 capitalize text-sm">{today}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={handleExportar}
              className="flex items-center gap-2 border-gray-300 hover:border-gray-400"
            >
              <Download className="w-4 h-4" />
              Exportar
            </Button>
            <Button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800"
            >
              <PlusCircle className="w-4 h-4" />
              Nuevo Curso
            </Button>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Total */}
          <Card className="border-0 shadow-sm bg-slate-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total de Cursos</CardTitle>
              <div className="p-2 bg-white/10 rounded-lg">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-extrabold text-white">{total}</p>
              <p className="text-xs text-slate-400 mt-1">cursos registrados</p>
            </CardContent>
          </Card>

          {/* Activos */}
          <Card className="border-0 shadow-sm bg-emerald-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-emerald-200">Cursos Activos</CardTitle>
              <div className="p-2 bg-white/10 rounded-lg">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-extrabold text-white">{activos}</p>
              <p className="text-xs text-emerald-300 mt-1">disponibles ahora</p>
            </CardContent>
          </Card>

          {/* En Progreso */}
          <Card className="border-0 shadow-sm bg-amber-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-amber-200">En Progreso</CardTitle>
              <div className="p-2 bg-white/10 rounded-lg">
                <Clock className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-extrabold text-white">{enProgreso}</p>
              <p className="text-xs text-amber-300 mt-1">en desarrollo</p>
            </CardContent>
          </Card>

          {/* Finalizados */}
          <Card className="border-0 shadow-sm bg-violet-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-violet-200">Finalizados</CardTitle>
              <div className="p-2 bg-white/10 rounded-lg">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-extrabold text-white">{finalizados}</p>
              <p className="text-xs text-violet-300 mt-1">completados</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabla con Tabs */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-gray-800">Gestión de Cursos</CardTitle>
                <p className="text-xs text-gray-400 mt-0.5">Administra y visualiza todos los cursos del sistema</p>
              </div>
              <Badge variant="outline" className="text-xs text-gray-500 border-gray-300">
                {total} registros
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <Tabs defaultValue="todos">
              <TabsList className="mb-5 bg-gray-100 p-1 rounded-lg gap-1 flex-wrap h-auto">
                <TabsTrigger value="todos" className="rounded-md text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Todos <span className="ml-1.5 bg-gray-200 text-gray-700 text-xs px-1.5 py-0.5 rounded-full">{total}</span>
                </TabsTrigger>
                <TabsTrigger value="activos" className="rounded-md text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Activos <span className="ml-1.5 bg-green-100 text-green-700 text-xs px-1.5 py-0.5 rounded-full">{activos}</span>
                </TabsTrigger>
                <TabsTrigger value="progreso" className="rounded-md text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  En Progreso <span className="ml-1.5 bg-amber-100 text-amber-700 text-xs px-1.5 py-0.5 rounded-full">{enProgreso}</span>
                </TabsTrigger>
                <TabsTrigger value="finalizados" className="rounded-md text-xs font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Finalizados <span className="ml-1.5 bg-purple-100 text-purple-700 text-xs px-1.5 py-0.5 rounded-full">{finalizados}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="todos">
                <CourseTable data={courses} />
              </TabsContent>
              <TabsContent value="activos">
                <CourseTable data={courses.filter((c) => c.estado === "Activo")} />
              </TabsContent>
              <TabsContent value="progreso">
                <CourseTable data={courses.filter((c) => c.estado === "En Progreso")} />
              </TabsContent>
              <TabsContent value="finalizados">
                <CourseTable data={courses.filter((c) => c.estado === "Finalizado")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <CourseFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleCourseAdded}
      />

      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          open={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
