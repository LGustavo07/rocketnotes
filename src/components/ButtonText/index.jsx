import { Container} from './styles';

export function ButtonText({title, isActive = false, ...rest}){
  return (
    <Container 
      type="button" 
      $isactive={isActive.toString()}
      {...rest}
    >
      {title}
    </Container>
  );
}

/*isActive = false significa que como eu quero tratar essa propriedade (isActive)
como opcional, caso esse valor não seja informado quero que seja atribuido o valor padrão false */