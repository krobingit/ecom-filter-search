import styled,{keyframes} from 'styled-components'
const runningText =keyframes`
0% {transform:translateX(100%)}
100%{transform:translateX(-100%)}
`

const Container=styled.div`
height: 2.5rem;
font-weight: 700;
color: black;
background-color: wheat;
overflow: hidden;
&  p{
animation: ${runningText} 15s infinite linear;
width: 100%;
position: relative;
top: -5px;
}
`

export function Header()
{
 return (
<Container>
   <p style={{marginTop:"10px"}}>Developed by Robin.K </p>
</Container>
   )



}