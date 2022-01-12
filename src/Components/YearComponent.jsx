
import styled from 'styled-components';
import Button from '@mui/material/Button';
const Container = styled.div`
display:block;
`

export function Year({year,filters,setFilters})
{

 const YearArr = [];
YearArr.push(year.toString())
 const handleClick = () => {
  setFilters({ ...filters,year:YearArr })
 }

 return (
  <Container>
   <Button style={{ color: "black" }} onClick={handleClick}>{year}</Button>
   </Container>
)



}