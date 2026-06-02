interface StatusBadgeProps {
  status: "Activo" | "En Progreso" | "Finalizado" | string;
  variant?: "status" | "category";
}

const StatusBadge = ({ status, variant = "status" }: StatusBadgeProps) => {
  const getClasses = () => {
    if (variant === "category") {
      return "bg-blue-100 text-blue-800";
    }
    switch (status) {
      case "Activo":
        return "bg-green-100 text-green-800";
      case "En Progreso":
        return "bg-yellow-100 text-yellow-800";
      case "Finalizado":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getClasses()}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
