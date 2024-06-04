import { useAuth } from "../../hooks/auth";

import { api } from "../../service/api";

import { Container, Logout, Profile } from "./styles";

import { RiShutDownLine } from "react-icons/ri";

import avatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { signOut, user } = useAuth();

  const navigate = useNavigate();

  function handleSignOut() {
    navigate("/");
    signOut();
  }

  return (
    <Container>
      <Profile to="/profile">
        <img
          src={
            user.avatar
              ? `${api.defaults.baseURL}/files/${user.avatar}`
              : avatarPlaceholder
          }
          alt="Foto do usuario"
        />
        <div>
          <span>Welcome</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>
      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
}
