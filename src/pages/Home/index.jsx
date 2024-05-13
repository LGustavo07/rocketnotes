import { useState, useEffect } from "react";
import {FiPlus} from "react-icons/fi";
import {Container, Brand, Menu, Search, Content, NewNote} from "./styles";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

import {Note} from "../../components/Note";
import {Input} from "../../components/Input";
import {Header} from "../../components/Header";
import {Section} from "../../components/Section";
import {ButtonText} from "../../components/ButtonText";

export function Home() {
  const [search, setSearch] = useState(""); // valor inicial será uma string vazia
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagSelected(tagName){ // função para lidar com a seleção da tag
    if(tagName === "all"){
      return setTagsSelected([]);
    }

    const alreadySelected = tagsSelected.includes(tagName);
    
    if(alreadySelected){
      const filteredTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filteredTags); // retorna todas as tags, menos aquela que eu acabei de desmarcar
    }else{
      setTagsSelected(prevState => [...prevState, tagName]); // vai retornar selecionadas todas as tags que foram clicadas
    }
  } 

  function handleDetails(id){
    navigate(`/details/${id}`);
  }


  useEffect(() => { // obs. useEffect não aceita função assíncrona, por isso devo criar uma função fora dele, que seja async e depois chamá-la dentro do useEffect
    
    async function fetchTags(){ // por isso posso criar essa função aqui dentro e em seguida, chamo a função aqui dentro do useEffect
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  }, []); // deixo o array vazio pois quero buscar as tags apenas 1 vez, e não ficar buscando essa info diversas vezes


  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`); // acesso o notes, e envio o title através de uma query ( por isso uso o "?"), passo o conteúdo de search para title e o conteúdo de tagsSelected para tags
      setNotes(response.data);
    }

    fetchNotes();
  }, [tagsSelected, search]); //há duas dependências nesse caso. Quando mudar o conteúdo ou do search ou do tagsSelected, o userEfect vai executar novamente

  return(
    
    <Container>
      <Brand>
      <h1>Rocketnotes</h1>      
      </Brand>

      <Header/>

      <Menu>
        <li><ButtonText 
          title="Todos" 
          onClick={() => handleTagSelected("all")}
          $isactive={tagsSelected.length === 0} // verifica o tamanho, e assim, se for zero, verifica que não tem nenhuma coisa dentro do array 
          />
        </li>
        {
          tags && tags.map(tag => ( // se existir tags, então o map vai percorrer elas 
            <li key={String(tag.id)}> 
              <ButtonText 
                title={tag.name} 
                onClick={() => handleTagSelected(tag.name)}
                $isactive={tagsSelected.includes(tag.name)} // se a tag existir la dentro, retorna verdadeiro

              />
            </li> 
          ))           
        }
      </Menu>


      <Search>
        <Input 
          placeholder="Pesquisar pelo título"
          onChange={(event) => setSearch(event.target.value)} // o conteúdo da caixa de texto sendo pesquisada pelo título, sendo armazenada pelo nosso estado
        />        
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
              <Note 
                key={String(note.id)}
                data={note} 
                onClick={() => handleDetails(note.id)}
              />
            ))
          }
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus/>
        Criar nota
      </NewNote>
    </Container>
  )
}