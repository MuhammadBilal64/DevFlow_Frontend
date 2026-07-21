import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();


const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await loginUser({
      email,
      password,
    });

        login(response.data);
        navigate("/dashboard");
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Welcome Back
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block">Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block">Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;