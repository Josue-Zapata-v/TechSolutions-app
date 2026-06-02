import { Loader2 } from "lucide-react";

interface ActionButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const ActionButton = ({
  label,
  variant = "primary",
  disabled = false,
  loading = false,
  onClick,
  type = "button",
}: ActionButtonProps) => {
  const isDisabled = disabled || loading;

  const baseClasses =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses =
    variant === "primary"
      ? "bg-blue-900 text-white hover:bg-blue-950 focus:ring-blue-900"
      : "border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-blue-600";

  const disabledClasses = isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses}`}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Cargando...
        </>
      ) : (
        label
      )}
    </button>
  );
};

export default ActionButton;
