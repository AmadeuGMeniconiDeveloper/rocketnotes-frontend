import { useState } from "react";

import { api } from "../../service/api";

import { useAuth } from "../../hooks/auth";

import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Avatar, Container, Form } from "./styles";

import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from "react-icons/fi";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg";

export function Profile() {
  const { user, updateProfile } = useAuth();

  const [avatar, setAvatar] = useState(user.avatar);
  const [avatarFile, setAvatarFile] = useState(null);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  async function handleUpdate() {
    const updatedData = {
      name,
      email,
      password: newPassword,
      old_password: currentPassword,
    };

    // STUDY: Object.assign()
    const updatedUser = Object.assign(user, updatedData);

    await updateProfile({
      user: updatedUser,
      avatarFile,
    });
  }

  // FIXME: Avatar image is not being updated when choosing new file. Only when submiting the form (save button).
  function handleChangeAvatar(e) {
    const file = e.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file); // (?)
    setAvatar(imagePreview);
  }

  return (
    <Container>
      <header>
        <button onClick={handleNavigateBack}>
          <FiArrowLeft />
        </button>
      </header>
      <Form>
        <Avatar>
          <img
            src={
              user.avatar
                ? `${api.defaults.baseURL}/files/${user.avatar}`
                : avatarPlaceholder
            }
            alt="User photo"
          />
          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleChangeAvatar} />
          </label>
        </Avatar>
        <Input
          onChange={e => setName(e.target.value)}
          type="text"
          value={name}
          placeholder="Name"
          icon={FiUser}
        />
        <Input
          onChange={e => setEmail(e.target.value)}
          type="text"
          value={email}
          placeholder="Email"
          icon={FiMail}
        />
        <Input
          onChange={e => setCurrentPassword(e.target.value)}
          type="password"
          placeholder="Current Password"
          icon={FiLock}
        />
        <Input
          onChange={e => setNewPassword(e.target.value)}
          type="password"
          placeholder="New Password"
          icon={FiLock}
        />

        <Button onClick={handleUpdate} title="Save" />
      </Form>
    </Container>
  );
}
