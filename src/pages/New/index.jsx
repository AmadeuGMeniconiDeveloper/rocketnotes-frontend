import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { api } from "../../service/api";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";

import { Container, Form } from "./styles";
import { ButtonText } from "../../components/ButtonText";

export function New() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate(-1);
  };

  function handleAddLink() {
    // Check if link is empty
    if (!newLink) {
      return alert("Link must not be empty!");
    }

    // Check if link already exists in the list
    if (links.includes(newLink)) {
      return alert("Link already exists!");
    }

    setLinks(prevLinks => [...prevLinks, newLink]);
    setNewLink("");
  }

  function handleAddTag() {
    // Check if tag is empty
    if (!newTag) {
      return alert("Tag must not be empty!");
    }

    // Check if tag already exists in the list
    if (tags.includes(newTag)) {
      return alert("Tag already exists!");
    }

    setTags(prevTags => [...prevTags, newTag.toLowerCase()]);
    setNewTag("");
  }

  function handleRemoveLink(deleted) {
    setLinks(prevLinks => prevLinks.filter(link => link !== deleted));
  }

  function handleRemoveTag(deleted) {
    setTags(prevTags => prevTags.filter(tag => tag !== deleted));
  }

  async function handleSubmitNewNote() {
    // Check if title is empty
    if (!title || tags.length === 0) {
      return alert("Please, insert in the title and tags!");
    }

    // Check if handleAddLink was called after changing NoteItem input (newLink should go back to empty string)
    if (newLink) {
      return alert("Dont forget to add the last link!");
    }

    // Check if handleAddTag was called after changing NoteItem input (newTag should go back to empty string)
    if (newTag) {
      return alert("Dont forget to add the last tag!");
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    });

    alert("Note created successfully!");
    navigate(-1);
  }

  const renderLinks = links.map(link => {
    return (
      <NoteItem
        key={`${link}`}
        onClick={() => handleRemoveLink(link)}
        value={link}
      />
    );
  });

  const renderTags = tags.map(tag => {
    return (
      <NoteItem
        key={`${tag}`}
        onClick={() => handleRemoveTag(tag)}
        value={tag}
      />
    );
  });

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>New Note</h1>
            <ButtonText onClick={handleNavigateBack} title="Return" />
          </header>

          <Input onChange={e => setTitle(e.target.value)} placeholder="Title" />
          <TextArea
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
          />

          <Section title="Links">
            {renderLinks}
            <NoteItem
              isNew
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
              value={newLink}
              placeholder="New link"
            />
          </Section>

          <Section title="Tags">
            <div className="tags">
              {renderTags}
              <NoteItem
                isNew
                onChange={e => setNewTag(e.target.value)}
                onClick={handleAddTag}
                value={newTag}
                placeholder="New tag"
              />
            </div>
          </Section>

          <Button onClick={handleSubmitNewNote} title="Save" />
        </Form>
      </main>
    </Container>
  );
}
