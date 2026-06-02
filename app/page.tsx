import Link from "next/link";

const HomePage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center text-white px-6 relative"
      style={{
        backgroundImage: "url('/techsolutionsdesweb.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">TechSolutions</h1>
        <p className="text-blue-100 text-lg mb-8">
          Sistema de gestión de cursos tecnológicos. Aprende, avanza y crece con
          nuestra plataforma de formación profesional.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/courses"
            className="bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Ver Cursos
          </Link>
          <Link
            href="/dashboard"
            className="border border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
