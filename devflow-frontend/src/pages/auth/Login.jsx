import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login as loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
        navigate("/dashboard");
      } else {
        login(response);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      const serverMsg = err?.response?.data?.message || err?.message || "Invalid email or password.";
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

      {errorMsg && (
        <div className="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-center gap-2">
          <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          onChange={(e) => setEmail(e.target.value)}
          required={true}
          autoComplete="email"
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between my-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200 select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 rounded border-[#30363D] bg-[#0D1117] text-sky-500 focus:ring-0 cursor-pointer"
            />
            <span>Remember me</span>
          </label>

          <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-white transition">
            Forgot password?
          </a>
        </div>

        <AuthButton type="submit" loading={isLoading}>
          Sign in
        </AuthButton>
      </form>

      <div className="mt-6 pt-5 border-t border-[#30363D] text-center">
        <p className="text-xs text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-white hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}

export default Login;