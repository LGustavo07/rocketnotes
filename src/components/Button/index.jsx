import { Container } from "./styles";

export function Button({title, loading = false, ...rest}) {
  return(
    <Container 
    type="button"
    disabled={loading}
    {...rest}
     
    >    
      {loading ? 'Carregando...' : title}     
    </Container>
  );
}

/* IF TERNÁRIO
  {loading ? 'Carregando...' : title} 
  é verdadeiro? se sim, aparece mensagem 'carregando', : se for falso*/

/*  disabled {loading}
se loading verdadeiro vai desabilitar, se for falso vai continuar habilitado.  */