import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../services/authService";

export default function Login() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const token = await loginUser(email, password);
      login(token);
      navigate("/");
    } catch (error) {
      console.log(error)
      setError("Login failed");
    }
  };

  return <AuthForm onSubmit={handleLogin} title="Login" error={error} />;
}