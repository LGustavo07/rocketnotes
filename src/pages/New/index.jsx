import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {Header} from "../../components/Header";
import {Input} from "../../components/Input";
import {Textarea} from "../../components/Textarea";
import {NoteItem} from "../../components/NoteItem";
import {Section} from "../../components/Section";
import {Button} from "../../components/Button";
import {ButtonText} from "../../components/ButtonText";

import {api} from "../../services/api";

import {Container, Form} from "./styles";

export function New(){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const[links, setLinks] = useState([]); // esse estado guarda todos os links
  const[newLink, setNewLink] = useState(""); // estado para guardar o link adicionado no momento

  const[tags, setTags] = useState([]); // esse estado guarda todas as tags
  const[newTag, setNewTag] = useState(""); // estado para guardar a tag adicionada no momento

  const navigate = useNavigate();

  function handleBack(){
    navigate(-1);
  }

  function handleAddLink(){
    setLinks(prevState=>[...prevState, newLink]); // acesso o conteúdo anterior ao estado, e monto um novo vetor com tudo o que tinha antes mais o novo link
    setNewLink(""); // "reseto" o estado
  }

  function handleRemoveLink (deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted)); //pega o link e verifica onde no link é diferente do que eu estou deletando. Isso vai remover o link deletado e devolverá uma lista nova sem esse link
  }

  function handleAddTag(){
    setTags(prevState => [...prevState, newTag]);
    setNewTag(""); // "reseto o campo". Depois que eu tiver adicionado a tag, o campo para escrever volta a ficar vazio para eu escrever outra info
  }

  function handleRemoveTag(deleted){
    setTags(prevState => prevState.filter(tag => tag !== deleted));
  }

  async function handleNewNote(){
    if(!title){ // se dentro do title estiver vazio
      return alert("Digite o título da nota");
    }

    if(newTag){ // se dentro do newTag estiver escrito alguma coisa sem ter sido adicionada
      return alert("Você deixou uma tag no campo para adicionar, mas não concluiu. Clique para adicionar ou deixe o campo vazio.");
    }

    if(newLink){ // se dentro do newLink estiver escrito alguma coisa sem ter sido adicionada
      return alert("Você deixou um link no campo para adicionar, mas não concluiu. Clique para adicionar ou deixe o campo vazio.");
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    });

    alert("Nota criada com sucesso!");
    navigate(-1); // depois da nota cadastrada, levo a navegação para a página inicial(home)
  }

  return(
    <Container>
      <Header/>

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText 
              title="Voltar"
              onClick={handleBack}
            />
          </header>

          <Input 
            placeholder="Título"
            onChange={event => setTitle(event.target.value)}
          />

          <Textarea 
            placeholder="Observações"
            onChange={event => setDescription(event.target.value)}
          />

          <Section title="Links úteis">
            {
              links.map((link, index) => ( // essa parte serve para que os links salvos fiquem VISÍVEIS assim que eu adicioná-los
                <NoteItem 
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)} // uso arrow function pq é uma função com parâmetro. Senão vai ficar tentando executar de forma automática sozinho.
                />
              ))
            }

            <NoteItem  //serve para adicionar os links efetivamente
              $isNew 
              placeholder="Novo link (começar com https://)" 
              value={newLink}
              onChange={event => setNewLink(event.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {// uso chaves porque estou usando uma lista para percorer o conteúdo da variável
                tags.map((tag, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />             

                ))

              }
              <NoteItem 
                $isNew 
                placeholder="Nova tag"
                onChange={event => setNewTag(event.target.value)}
                value={newTag}
                onClick= {handleAddTag}
              />

            </div>
          </Section>

          <Button 
            title="Salvar"
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  )
}

