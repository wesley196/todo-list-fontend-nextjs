/**
 * Alert component for displaying error/success messages
 */

interface AlertProps {
  message: string;
  type?: "error" | "success" | "info";
  onDismiss?: () => void;
}

export function Alert({ message, type = "info", onDismiss }: AlertProps) {
  const typeClasses = {
    error: "bg-red-100 text-red-900 border-red-400",
    success: "bg-green-100 text-green-900 border-green-400",
    info: "bg-blue-100 text-blue-900 border-blue-400",
  };

  return (
    <div
      className={`p-4 rounded-lg border-2 ${typeClasses[type]} flex justify-between items-center shadow-md`}
    >
      <p className="text-sm font-medium">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-4 text-xl font-bold hover:opacity-70 transition-opacity"
        >
          ×
        </button>
      )}
    </div>
  );
}
