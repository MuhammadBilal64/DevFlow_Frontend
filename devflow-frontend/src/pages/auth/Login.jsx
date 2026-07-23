import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { login as loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import AuthFooter from "../../components/auth/AuthFooter";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const location = useLocation();
  const successMsg = location.state?.message;

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser({
        email,
        password,
      });

      if (response?.data) {
        login(response.data);
      } else {
        login(response);
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);

      const serverMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid email or password.";

      setErrorMsg(serverMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Sign in to DevFlow"
        subtitle="Welcome back. Please enter your credentials."
      />

      {successMsg && (
        <div className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
          <svg
            className="h-4 w-4 shrink-0 text-rose-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMsg("");
          }}
          required
          autoComplete="email"
          disabled={isLoading}
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMsg("");
          }}
          required
          autoComplete="current-password"
          disabled={isLoading}
        />

        <div className="my-4 flex items-center justify-between text-xs">
          <label className="flex cursor-pointer select-none items-center gap-2 text-slate-400 hover:text-slate-200">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isLoading}
              className="h-3.5 w-3.5 cursor-pointer rounded border-[#30363D] bg-[#0D1117] text-sky-500 focus:ring-0"
            />

            <span>Remember me</span>
          </label>

          <a
            href="#forgot"
            onClick={(e) => e.preventDefault()}
            className="text-slate-400 transition hover:text-white"
          >
            Forgot password?
          </a>
        </div>

        <AuthButton type="submit" loading={isLoading}  loadingText="Signing in...">
          Sign in
        </AuthButton>
      </form>

      <AuthFooter
        text="Don't have an account?"
        linkText="Create one"
        to="/auth/register"
      />
    </AuthCard>
  );
}

export default Login;