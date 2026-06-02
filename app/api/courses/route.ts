import { NextRequest, NextResponse } from "next/server";
import { courses } from "@/lib/data";
import { Course } from "@/types/course";

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      total: courses.length,
      data: courses,
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { nombre, categoria, duracion } = body;

  if (!nombre || !categoria || duracion === undefined || duracion === null) {
    return NextResponse.json(
      {
        success: false,
        error: "Faltan campos requeridos: nombre, categoria, duracion",
      },
      { status: 400 }
    );
  }

  if (typeof duracion !== "number" || duracion <= 0 || !Number.isFinite(duracion)) {
    return NextResponse.json(
      {
        success: false,
        error: "El campo duracion debe ser un número positivo",
      },
      { status: 400 }
    );
  }

  const newId = courses.length + 1;

  const newCourse: Course = {
    id: newId,
    nombre,
    categoria,
    duracion,
    descripcion: "Curso registrado via API",
    imagen: `https://picsum.photos/seed/${newId}/400/250`,
    estado: "Activo",
  };

  return NextResponse.json(
    {
      success: true,
      message: "Curso registrado exitosamente",
      data: newCourse,
    },
    { status: 201 }
  );
}
