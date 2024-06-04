import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { api } from "../../service/api.js";

import { Header } from "../../components/Header/index.jsx";
import { ButtonText } from "../../components/ButtonText/index.jsx";
import { Button } from "../../components/Button/index.jsx";
import { Section } from "../../components/Section/index.jsx";
import { Tag } from "../../components/Tag/index.jsx";

import { Container, Links, Content } from "./styles.js";

export function Details() {
  const [data, setData] = useState(null);

  const { id: noteId } = useParams();

  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (confirm) {
      await api.delete(`/notes/${noteId}`);
      navigate(-1);
    }
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const renderLinks = data?.links?.map(link => {
    return (
      <li key={link.id}>
        <a href={link.url} target="_blank">
          {link.url}
        </a>
      </li>
    );
  });

  const renderTags = data?.tags?.map(tag => {
    return <Tag key={tag.id} title={tag.name} />;
  });

  useEffect(() => {
    async function fetchNote() {
      const { data } = await api.get(`/notes/${noteId}`);
      setData(data);
    }

    fetchNote();
  }, [noteId]);

  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText onClick={handleDelete} title="Delete" />
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            {data.links?.length > 0 && (
              <Section title="Links">
                <Links>{renderLinks}</Links>
              </Section>
            )}
            {data.tags?.length > 0 && (
              <Section title="Tags">{renderTags}</Section>
            )}
            <Button onClick={handleNavigateBack} title="Back" />
          </Content>
        </main>
      )}
    </Container>
  );
}
