import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/types/ButtonProps";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = "left",
      disabled,
      ...restProps
    },
    ref,
  ) => {
    // Estilos base comunes
    const baseStyles = cn(
      "inline-flex items-center justify-center rounded-md font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
      "disabled:opacity-60 disabled:cursor-not-allowed",
    );

    // Variantes
    const variantStyles = {
      //Light Theme
      primary: cn(
        "text-white",
        "bg-primary-800 hover:bg-primary-700 active:bg-primary-600",
      ),
      secondary: cn(
        "text-black",
        "bg-primary-800 hover:bg-primary-700 active:bg-primary-600",
      ),
      outline: cn(
        "text-primary-800",
        "border border-primary-800",
        "bg-transparent hover:bg-primary-50 active:bg-primary-100",
      ),
      ghost: cn(),
      destructive: cn(),
      // Dark Theme
      primaryDark: cn(
        "text-black",
        "bg-primary hover:bg-primary-50 active:bg-primary-100",
      ),
      secondaryDark: cn(
        "text-black",
        "bg-secondary hover:bg-secondary-50 active:bg-secondary-100",
      ),
      outlineDark: cn(
        "text-primary",
        "border border-primary hover:border-primary-50",
        "hover:bg-primary-700 active:bg-primary-600",
      ),
      ghostDark: cn("text-gray-900", "bg-transparent hover:bg-gray-100"),
      destructiveDark: cn(
        "text-white",
        "bg-red-600 hover:bg-red-700 active:bg-red-800",
      ),
    };

    // Tamaños
    const sizeStyles = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
      icon: "h-10 w-10 p-0",
    };

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          loading && "opacity-70 cursor-wait",
          className,
        )}
        {...restProps}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            {/* Poner un spinner aquí más adelante */}
            Cargando...
          </span>
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="mr-2">{icon}</span>
            )}
            {children}
            {icon && iconPosition === "right" && (
              <span className="ml-2">{icon}</span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
