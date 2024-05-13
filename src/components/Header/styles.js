import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header `
  grid-area: header; /* quando rolar minha tela, quero que fique fixo, então trabalho com  a estratégia de grid area */

  height: 105px;
  width: 100%;

  border-bottom-width: 1px; /* borda abaixo */
  border-bottom-style: solid; /* linha sólida abaixo */
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  display: flex;
  justify-content: space-between; /* na horizontal, cada um fica em uma extremidade*/

  padding: 0 80px;

  /*background: orange;*/
`;

export const Profile = styled(Link)`
  display: flex;
  align-items: center;

  >  img { /* > garante que vou estilizar a imagem de ntro de Profilee não outras imagens*/
    width: 56px;
    height: 56px;
    border-radius: 50%; /* para a imagem ficar arredondada*/
  } 

  > div {
    display: flex;
    flex-direction: column; /*para colocar uma linha abaixo da outra */
    margin-left: 16px;
    line-height: 24px;

    span {
      font-size: 14px;
      color: ${({ theme }) => theme.COLORS.GRAY_100}
    }

    strong {
      font-size: 18px;
      color: ${({ theme }) => theme.COLORS.WHITE}
    }
  }
`;

export const Logout = styled.button`
  border: none;
  background: none;

  > svg{
    color: ${({theme}) => theme.COLORS.GRAY_100};
    font-size: 36px;
  }
`;