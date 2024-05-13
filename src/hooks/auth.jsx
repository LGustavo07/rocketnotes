import {createContext, useContext, useState, useEffect} from "react";
import { api } from "../services/api";
export const AuthContext = createContext({}); // dentro de {} vai um valor default. mas com nao tenho nada para deixar como default, ele permanece vazio, apenas

function AuthProvider ({children}) { // children são todas as rotas da aplicação
  const[data, setData] = useState({});
  
  async function signIn({email, password}){// FUNÇÃO DE AUTENTICAÇÃO
    try { // tratamento de exceções. try para o caso de funcionar
      const response = await api.post("/sessions", {email, password});
      const {user, token} = response.data;

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user)); // usei a chave como sendo o nome @rocketnotes, já que é o nome da aplicação
      localStorage.setItem("@rocketnotes:token", token);
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setData({user, token});// atualiza o conteúdo do usuário

    }catch (error){ // catch para o caso de não dar certo
      if(error.response){
        alert(error.response.data.message);
      }else{
        alert("Não foi possível entrar.");
      }
    }
  }

  function signOut(){ // funcionalidade de logout
    //preciso remover do local storage as infos guardadas lá, e voltar o estado como objeto vazio

    localStorage.removeItem("@rocketnotes:token");
    localStorage.removeItem("@rocketnotes:user");

    setData({});
  }

  async function updateProfile({user, avatarFile}){
    try{
      if(avatarFile){
        const fileUploadForm = new FormData(); // preciso enviar como um arquivo e no backend o arquivo está esperando um campo chamado avatar
        fileUploadForm.append("avatar", avatarFile); //append para adicionar dentro do formulário um avatar

        const response = await api.patch("/users/avatar", fileUploadForm); // faço requisição para users/ avatar, e envio o formulário fileUploadForm
        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user)); // atualizar os dados do novo usuários no storage e no user. setItem já serve para substituir o conteúdo tb!!

      setData({user, token: data.token});
      alert("Perfil atualizado!");

    }catch(error){
      if(error.response){
        alert(error.response.data.message);
      }else{
        alert("Não foi possível atualizar o perfil.");
      }
    }
  }

  useEffect (() => {// vai buscar as infos no local Storage
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    if(token && user){
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({
        token, 
        user: JSON.parse(user), // pego os dados do usuário q estão armazenados no formato de texto e voltei para o formato JSON
      });
    }    
  }, []);


  return(
    <AuthContext.Provider value={{signIn, user: data.user, updateProfile, signOut}}> 
        {children}
      </AuthContext.Provider>
  )// estou compartilhando no contexto o usuário, que é o conteúdo do estado useState
}

function useAuth(){// useAuth é um hook
  const context = useContext(AuthContext);

  return context

}

export {AuthProvider, useAuth};