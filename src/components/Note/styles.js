import styled from "styled-components";

export const Container = styled.button`
  width: 100%;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  border: none;
  border-radius: 10px;

  padding: 22px;
  margin-bottom: 16px;

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > h1 {
      flex: 1;
      text-align: left;
      font-size: 24px;
      font-weight: 700;
      color: ${({ theme }) => theme.COLORS.WHITE};
    }

    > button {
      border: none;
      border-radius: 5px;
      padding-block: 5px;
      padding-inline: 8px;
      background: ${({ theme }) => theme.COLORS.BACKGROUND_800};
      color: ${({ theme }) => theme.COLORS.RED};
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    }
  }

  > footer {
    display: flex;
    width: 100%;
    margin-top: 24px;
  }
`;
