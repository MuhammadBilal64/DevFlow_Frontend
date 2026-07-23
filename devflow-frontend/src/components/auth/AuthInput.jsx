import { useState } from "react";

function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
  error,
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="mb-4">
      <div className="mb-1.5 flex items-center justify-between">
        <label className="block text-xs font-medium text-slate-300">
          {label}
          {required && (
            <span className="ml-1 text-slate-400">*</span>
          )}
        </label>
      </div>

      <div className="relative flex items-center">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3.5 py-2.5 text-sm text-[#F0F6FC] placeholder:text-slate-500 outline-none transition
          focus:border-sky-500 focus:ring-1 focus:ring-sky-500
          disabled:cursor-not-allowed disabled:opacity-60
          ${isPassword ? "pr-10" : "pr-3.5"}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            className="absolute right-3 p-1 text-slate-400 transition hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
            tabIndex={-1}
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 013.682-.763c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default AuthInput;