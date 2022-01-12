import StarRating from '@mui/material/Rating';
import styled from 'styled-components';
import Button from '@mui/material/Button';
const Container = styled.div`
display:block;
`

export function Rating({rating,filters,setFilters})
{

 const rate = [];
rate.push(rating)
 const handleClick = () => {
  setFilters({ ...filters, rating:rate })
  console.log(filters);
 }

 return (
  <Container>
   <Button style={{color:"black"}} onClick={handleClick}><StarRating name="size-small"  value={rating} size="small" precision={1} />& above</Button>
   </Container>
)



}