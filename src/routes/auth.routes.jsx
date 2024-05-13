import { Routes, Route, Navigate } from "react-router-dom"; /*"Routes" vai envolver todas as minhas "Route" */

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";


export function AuthRoutes(){
  const user = localStorage.getItem("@rocketnotes:user");

  return(
    <Routes> 
      <Route path="/" element={<SignIn/>} />
      <Route path="/register" element={<SignUp />} />
      {!user && <Route path="*" element={<Navigate to="/"/>} />} 
    </Routes>
  )
}
/*
<Route path="/" significa qual o endereço
        element={<Home />} />   significa qual elemento quero renderizar, qual elemento quero exibir
*/ 

/* <Route path="*" element={<Navigate to="/"/>} />  é como se fosse um "else", em que se as duas rotas
anteriores não forem atendidas, vai car nessa rota "coringa", que no caso, vai me redirecionar para
a página inicial "/". Mas poderia seguir para uma página de erro 404, por exemplo. 
Isso impede usuários de acessarem páginas de dentro do app sem que estejam logados e sem ficar aparecendo 
uma página mal renderizada
*/


/* {!user && <Route path="*" element={<Navigate to="/"/>} />}  é um condicional. Se o usuário for nulo, 
vai renderizar o Route path="*"... Se o usuário estiver logado, vai fazer a navegação dentro
da aplicação.
*/