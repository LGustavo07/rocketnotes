import {useState} from "react";// hook para criar estados
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form, Background } from "./styles";

export function SignUp(){
  const [name, setName] = useState(""); //useState é o hook que cria o estado. Dentro dos parênteses vai o valor inicial. name é o estado e setName é a função que vai mudar o estado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //função para testar as modificações desta aula --------
  function handleSignUp(){
    if(!name || !email || !password){ // verificar se todos os campos estão preenchidos
      return alert("Preencha todos os campos!") // return serve para parar a aplicação caso algum dos campos não tenha sido preenchido
    }

    api.post("/users", {name, email, password})
    .then(() => {  //then para caso tenha dado tudo certo
      alert("Usuário cadastrado com sucesso!");
      navigate("/"); // levará para a tela inicial de login após o usuário ser cadastrado com sucesso
    })
    .catch( error => {// catch para caso tenha dado algum problema no processo de cadastro
      if(error.response){
        alert(error.response.data.message); // pego a msg de erro que criei em UsersController.js, dentro da função create
      }else{// se não for nenhuma msg específica, então mando uma msg mais genérica como mostrado a seguir
        alert("Não foi possível cadastrar.");
      } 
    }); 
  }
  // ---------

  return (
    <Container>
      <Background/>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>
        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={event => setName(event.target.value)} // pode-se usar event ou somente a letra e
        />
        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={event => setEmail(event.target.value)} 
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={event => setPassword(event.target.value)} 
        />

        <Button title="Cadastrar" onClick={handleSignUp}/>

        <Link to="/">
          Voltar para o login
        </Link>
      </Form>


    </Container>
  );
}