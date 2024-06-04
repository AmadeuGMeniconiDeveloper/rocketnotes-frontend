import { useState } from "react";

import { useAuth } from "../../hooks/auth";

import { Link } from "react-router-dom";

import { FiMail, FiLock } from "react-icons/fi";
import { Background, Container, Form } from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  async function handleSignIn() {
    await signIn({ email, password });
  }

  return (
    <Container>
      <Form>
        <h1>Rocket Notes</h1>
        <p>App to save and manage your links</p>

        <h2>Login</h2>
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
        <Button title="Login" onClick={handleSignIn} />
        <Link to="/signup">Go to Sign up</Link>
      </Form>
      <Background />
    </Container>
  );
}
