import styled from "styled-components";

import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: 105px 128px auto 64px;
  grid-template-areas:
    "brand    header"
    "menu     search"
    "menu     content"
    "newnote  content";

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
`;

export const Brand = styled.div`
  grid-area: brand;

  display: grid;
  place-content: center;

  z-index: 1;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

  > h1 {
    font-size: 24px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }
`;

export const Menu = styled.ul`
  grid-area: menu;

  display: flex;
  flex-direction: column;
  gap: 12px;

  padding-block: 64px;

  text-align: left;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  > li {
    list-style: none;
    margin-left: 18px;
  }
`;

export const Search = styled.div`
  grid-area: search;

  padding: 64px 64px 0;
`;

export const Content = styled.div`
  grid-area: content;

  padding: 0 64px;
  overflow-y: auto;
`;

export const NewNote = styled(Link)`
  grid-area: newnote;

  background-color: ${({ theme }) => theme.COLORS.ORANGE};
  color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    margin-right: 8px;
  }
`;
