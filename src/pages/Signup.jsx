import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import { signupUser } from "../services/authService";

export default function Signup() {
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (email, password) => {
    try {
      const token = await signupUser(email, password);
      login(token);
      navigate("/");
    } catch (error) {
      console.log(error)
      setError("Signup failed");
    }
  };

  return <AuthForm onSubmit={handleSignup} title="Signup" error={error} />;
}