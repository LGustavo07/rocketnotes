//import { Fragment } from "react";
import { useState, useEffect } from "react";
import { Container, Links, Content } from "./styles";
import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { Tag } from "../../components/Tag";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
 
 /* a função deve ter o mesmo nome do arquivo; todo componente deve ter o nome inicado com letra Maiúscula*/
 export function Details() {
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  function handleBack(){
    navigate(-1);
  }

  async function handleRemove(){
    const confirm = window.confirm("Deseja realmente remover a nota?")

    if(confirm) {
      await api.delete(`/notes/ ${params.id}`);
      navigate(-1);
    }
  }

  useEffect(() => {
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }
    fetchNote();
  }, []);

  return(
    <Container>
      <Header/>
      

     { // coloco o main entre chaves porque só vai mostrá-lo se existir conteúdo
      data && // se tiver conteúdo, mostra o data. Se não tiver, não mostra o data
      <main>
        <Content>
          <ButtonText 
            title="Excluir nota"
            onClick={handleRemove}
          />

          <h1>
            {data.title}
          </h1>

          <p>
            {data.description}
          </p>

          {// chaves pq só vai renderizar essa secção se tiver link ( se tiver conteúdo)
            data.links &&          
            <Section title="Links úteis"> 
              <Links>
                {
                  data.links.map(link => (
                    <li key={String(link.id)}> 
                      <a href={link.url} target="blank"> 
                        {link.url}
                      </a> 
                    </li> // target="blank" faz o link abrir em outra aba
                  )) // preciso sempre colocar uma chave no item
                } 
                
              </Links>
            </Section>
          }

          {
            data.tags && // só vou renderizar o section, se existirem tags para serem renderizadas
            <Section title="Marcadores"> 
              {
                data.tags.map(tag => ( 
                  <Tag 
                    key={String(tag.id)} // preciso sempre colocar uma chave no item
                    title={tag.name} 
                  />
                ))
              }
            </Section>
          }

          <Button title="Voltar" onClick={handleBack} />      
        
        </Content>
      </main>
      }

    </Container>
  ); /*<Button title="Login" loading/>     mesma coisa que escrever loading={true}*/
    /* title é a propriedade comum. O childrem é o que estiver dentro do section. children não é passado como uma propriedade comum.*/
 }
 