import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { registerUser } from "../services/authService";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser({ name, email, password });
      alert("✅ Registro exitoso");
      // Luego podrías redirigir automáticamente a /login
    } catch (err) {
      console.error(err);
      setError("Registro fallido. Verifica los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {loading && <Loader />}
      {!loading && (
        <>
          <h2 className="text-center mb-4">Registrarse</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleRegister}>
            <Input
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre completo"
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
            />
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña segura"
            />
            <Button text="Registrarse" type="submit" isLoading={loading} />
          </form>
        </>
      )}
    </div>
  );
}
