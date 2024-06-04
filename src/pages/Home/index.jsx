import { useEffect, useState } from "react";

import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Note } from "../../components/Note";
import { Section } from "../../components/Section";

import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";

import { FiPlus, FiSearch } from "react-icons/fi";
import { api } from "../../service/api";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [search, setSearch] = useState("");

  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagSelection(tagName) {
    if (tagName === "all") {
      return setSelectedTags([]);
    }

    if (selectedTags.includes(tagName)) {
      const updatedSelectedTags = selectedTags.filter(tag => tag !== tagName);
      setSelectedTags(updatedSelectedTags);
    } else {
      setSelectedTags(prevState => [...prevState, tagName]);
    }
  }

  function handleNavigateDetails(id) {
    navigate(`/details/${id}`);
  }

  const renderTags = tags.map(tag => {
    return (
      <li key={tag.id}>
        <ButtonText
          isActive={selectedTags.includes(tag.name)}
          onClick={() => handleTagSelection(tag.name)}
          title={tag.name}
        />
      </li>
    );
  });

  const renderNotes = notes.map(note => {
    return (
      <Note
        onClick={() => handleNavigateDetails(note.id)}
        key={note.id}
        data={note}
      />
    );
  });

  useEffect(() => {
    async function fetchTags() {
      const { data } = await api.get("/tags");
      setTags(data);
    }

    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const { data } = await api.get(
        `/notes?title=${search}&tags=${selectedTags}`
      );

      setNotes(data);
    }

    fetchNotes();
  }, [search, selectedTags]);

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>
      <Header />
      <Menu>
        <li>
          <ButtonText
            onClick={() => handleTagSelection("all")}
            isActive={selectedTags.length === 0}
            title="All"
          />
        </li>
        {renderTags}
      </Menu>
      <Search>
        <Input
          onChange={e => setSearch(e.target.value)}
          placeholder="Search title"
          icon={FiSearch}
        />
      </Search>
      <Content>
        <Section title="My Notes">{renderNotes}</Section>
      </Content>
      <NewNote to="/new">
        <FiPlus />
        Create
      </NewNote>
    </Container>
  );
}
