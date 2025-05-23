import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { loginUser } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      alert("✅ Login exitoso");
     
    } catch (err) {
      console.error(err);
      setError("Login fallido. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {loading && <Loader />}
      {!loading && (
        <>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
            />
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
            <Button text="Ingresar" type="submit" isLoading={loading} />
          </form>
        </>
      )}
    </div>
  );
}
