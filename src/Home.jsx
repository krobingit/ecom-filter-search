import styled from 'styled-components';
import { ProductList } from './ProductList';
import { Input } from 'semantic-ui-react';
import { small } from './responsive';
import { useState } from 'react';

const Container = styled.div`
`
const SearchInput = styled(Input)`
border-radius:1rem;
${small({width:"10.8rem"})}
`
const NavContainer = styled.div`
background:#141e30;
color:white;
display:flex;
gap:0.5rem;
align-items:center;
justify-content:space-evenly;
font-family: 'Patua One', cursive;
flex-wrap:wrap;
padding: 5px 0;
position:sticky;
top:0;
z-index:1000;
`
export function Home() {

 const [search, setSearch] = useState("");
 return (

  <Container>
       <NavContainer>
      <SearchInput onChange={(e)=>setSearch(e.target.value)}
        icon={{ name: 'search', circular: true, link: true }}
     placeholder='Search...'  />

    </NavContainer>

   <ProductList search={search} />
   </Container>


)
}