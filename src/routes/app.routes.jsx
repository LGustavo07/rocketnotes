import { Routes, Route, Navigate } from "react-router-dom"; /*"Routes" vai envolver todas as minhas "Route" */

import { New } from "../pages/New";
import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { Details } from "../pages/Details";

export function AppRoutes(){
  return(
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/details/:id" element={<Details />} />
      
      <Route path="*" element={<Navigate to="/"/>} />
    </Routes>
  )
}
/*
<Route path="/" significa qual o endereço
        element={<Home />} />   significa qual elemento quero renderizar, qual elemento quero exibir
*/ 