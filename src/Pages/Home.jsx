import styled from 'styled-components';
import { ProductList } from '../Components/ProductList';
import { Input } from 'semantic-ui-react';
import { small } from '../responsive';
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Header } from '../Header';

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
const NavActions = styled.div`
margin-left:3rem;
`
export function Home() {

 const [search, setSearch] = useState("");
 return (

  <Container>
       <NavContainer>
      <SearchInput onChange={(e)=>setSearch(e.target.value)}
        icon={{ name: 'search', circular: true, link: true }}
             placeholder='Search...' />
          <NavActions>
             <IconButton><ShoppingCartIcon style={{color:"white"}}/></IconButton>
             <IconButton><ShoppingBagIcon style={{ color: "white" }} /></IconButton>
             <IconButton><AccountCircleIcon style={{ color: "white" }} /></IconButton>
             </NavActions>
       </NavContainer>
              <Header />
       <ProductList search={search} />

   </Container>


)
}