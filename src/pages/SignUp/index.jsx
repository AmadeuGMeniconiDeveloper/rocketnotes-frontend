import { useState } from "react";

import { api } from "../../service/api";

import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Background, Container, Form } from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Please, fill in all fields!");
    }

    try {
      await api.post("/users", { name, email, password });
      navigate("/");
    } catch (error) {
      alert(error.response.data.message); // Display API server error response message
    }
  }

  return (
    <Container>
      <Background />
      <Form>
        <h1>Rocket Notes</h1>
        <p>App to save and manage your links</p>
        <h2>Create Account</h2>
        <Input
          onChange={e => setName(e.target.value)}
          type="text"
          placeholder="Name"
          icon={FiUser}
        />
        <Input
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="E-mail"
          icon={FiMail}
        />
        <Input
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          icon={FiLock}
        />
        <Button onClick={handleSignUp} title="Sign up" />
        <Link to={"/"}>Go to Login</Link>
      </Form>
    </Container>
  );
}
