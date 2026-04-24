/**
 * Button component
 */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const getStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
        };
      case "secondary":
        return {
          backgroundColor: "#9ca3af",
          color: "#111827",
          border: "none",
        };
      case "danger":
        return {
          backgroundColor: "#dc2626",
          color: "white",
          border: "none",
        };
      default:
        return {};
    }
  };

  const baseStyle = {
    padding: "12px 24px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    transition: "all 0.2s",
    fontSize: "16px",
    ...getStyles(),
  };

  return (
    <button
      style={baseStyle}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}


