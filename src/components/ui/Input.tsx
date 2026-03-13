import { forwardRef, type InputHTMLAttributes } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className, ...props }, ref) => {
    const { isDark } = useTheme();

    return (
      <div className={cn("space-y-1", fullWidth && "w-full")}>
        {label && (
          <label
            className={`block text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={cn(
            "block w-full rounded-md border px-3 py-2 shadow-sm focus:ring-2 focus:ring-offset-2 disabled:opacity-60",
            isDark
              ? "border-gray-600 bg-gray-800 text-white placeholder-gray-500 focus:border-primary-400 focus:ring-primary-400"
              : "border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500",
            error &&
              (isDark
                ? "border-red-600 focus:border-red-500 focus:ring-red-500"
                : "border-red-500 focus:border-red-500 focus:ring-red-500"),
            className,
          )}
          {...props}
        />

        {error && (
          <p
            className={`mt-1 text-sm ${isDark ? "text-red-400" : "text-red-600"}`}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
