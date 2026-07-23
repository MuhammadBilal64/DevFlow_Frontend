import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register as registerUser } from "../../services/authService";

import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import AuthFooter from "../../components/auth/AuthFooter";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMsg("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (name.trim().length < 3) {
      setErrorMsg("Name must be at least 3 characters.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setErrorMsg("Enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      navigate("/auth/login", {
        state: {
          message: "Account created successfully. Please sign in.",
        },
      });
    } catch (err) {
      console.error(err);

      const serverMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Unable to create account.";

      setErrorMsg(serverMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Create your DevFlow account"
        subtitle="Start managing projects and workflows in one place."
      />

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
          label="Full Name"
          placeholder="Muhammad Bilal"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrorMsg("");
          }}
          required
          autoComplete="name"
          disabled={isLoading}
        />

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
          autoComplete="new-password"
          disabled={isLoading}
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="••••••••••••"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrorMsg("");
          }}
          required
          autoComplete="new-password"
          disabled={isLoading}
        />

        <AuthButton type="submit" loading={isLoading}  loadingText="Creating account..."
>
          Create Account
        </AuthButton>
      </form>

      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        to="/auth/login"
      />
    </AuthCard>
  );
}

export default Register;