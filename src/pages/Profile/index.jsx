
import {useState} from "react";
import {FiArrowLeft, FiUser, FiMail, FiLock, FiCamera} from "react-icons/fi";
import {useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import {api} from "../../services/api";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form, Avatar } from "./styles";

export function Profile(){
  const {user, updateProfile} = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState(); // deixar vazio por questão de segurança, exige q digitem a senha
  const [passwordNew, setPasswordNew] = useState();


  const  avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarUrl); // se o usuário já tiver um avatar, será atribuído à variável avatar. avatar é o estado que exibe a imagem
  const [avatarFile, setAvatarFile] = useState(null); // null, ou seja, começa sem avatar. avtarFile carregará a nova imagem e avatar. avatarFile serve para guardar o arquivo

  const navigate = useNavigate();
  function handleBack(){
    navigate(-1);
  }
  
  async function handleUpdate(){
    const updated = {name, email, password: passwordNew, old_password: passwordOld,};
    const userUpdated = Object.assign(user, updated);
    await updateProfile({user: userUpdated, avatarFile});
  }

  function handleChangeAvatar(event){
    const file = event.target.files[0];// files[0] significa pegar a primeira posição
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return(
    <Container>
      <header>
        <button type="button" onClick={handleBack}>
          <FiArrowLeft size={24} />
        </button>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="Foto do usuário" />
          <label htmlFor="avatar">
            <FiCamera/>
            <input /*  não usarei componente input, pois esse input vai ficar invisivel, so vai ser vir pra eu abrir a janela de carregar a imagem.*/
              id="avatar"
              type="file"
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>
        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={event => setPasswordOld(event.target.value)}
        />

        <Input
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          onChange={event => setPasswordNew(event.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdate}/>
      </Form>
    </Container>
  )
}