import { Container } from "./styles";

export function Input({ icon:Icon, ...rest}){
  return(
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest} />

    </Container>
  )
}

/* obs, o nome de todo componente tem que começar com letra maiúscula. então não posso
escrever icon com letra minúscula, por isso eu passo icon:Icon, que significa que vou 
receber o icon como sendo Icon. É, de certa froma, uma conversão de icon para Icon. */

/*Como nem todo input tem icon, eu uso {Icon && <Icon/>} que significa que só vai 
mostrar o ícone se ele de fato existir  */