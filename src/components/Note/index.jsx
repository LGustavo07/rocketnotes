import { Container } from "./styles";
import { Tag } from "../Tag";

export function Note({data, ...rest}){
  return(
    <Container {...rest}>
      <h1>{data.title}</h1> 

      {
        data.tags && 
        <footer>
          {
            data.tags.map(tag => <Tag key={tag.id} title={tag.name} />)
          }
        </footer>    
      }
    </Container>
  );
}

/*data.title serve para receber o título da nota */
/*quando tenho lista, preciso identificar que cada elemento é único, e farei isso usando 
as keys (chaves. No caso, chaves de id) */