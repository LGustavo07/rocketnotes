import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height:100vh;

  display: grid; 
  grid-template-rows: 105px auto;
  grid-template-areas: 
    "header"
    "content";  

  > main { /*isso serve para eu ativar o scroll somente na parte abaixo do header. ou seja, o header fica fixo */
    grid-area: content;
    overflow-y: auto; /*auto não aparece sempre, apenas quando a página exceder o tamanho da tela. Mas se eu usar : scroll, vai aparecer a barra de rolagem, mesmo se a página não precisar*/ 
  }


    .tags {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
`;

export const Form = styled.form`
  max-width: 550px;
  margin: 38px auto;

  > header{
    display:flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 36px;

    button {
      font-size: 20px;
      color: ${({theme}) => theme.COLORS.GRAY_100};
    }
  }
`;