import styled from "styled-components";
import SimpleImageSlider from "react-simple-image-slider";
import Rating from '@mui/material/Rating';
import { small } from "./responsive";

const ProductCard = styled.div`
  width: min-content;
  margin: 1rem;
  overflow: hidden;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.5);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
${small({margin:"0.5rem"})}
`;

const ProductDetails = styled.div`
  text-align: left;
  padding: 0.5rem;
`;
const MRP = styled.span`
text-decoration:line-through;
color:darkgrey;
`

const Discount = styled.span`
color:orange;
font-size:1rem;
font-weight:bold;
`


export function Product({
  id,
  name,
  brand,
  images,
  discount,
  mrp,
  price,
 rating,
ratingCount
}) {
  let imageArray = images.map((each) => each.src);
  let imageObj = imageArray.map((each) => {
    return { url: each };
  });

  return (
    <ProductCard key={id}>
      <div>
        <SimpleImageSlider
          width={180}
          height={180}
          images={imageObj}
          showBullets={true}
          showNavs={true}
      navSize={20}
      navStyle={2}
      navMargin={10}
        />
      </div>
      <ProductDetails>
        <p><b>{brand}</b></p>
     <p style={{ fontSize: "1.1rem", color: "black" }}> {name}</p>
     {rating ?
      <div style={{display:"flex",alignItems:"center"}}>
      <Rating name="size-small" value={rating} size="small" precision={0.1} />
       <span style={{ color: "grey" }}>({ratingCount} ratings)</span>
       </div>
: ''
     }
        <p style={{ fontSize: "1.2rem" }}>
      <b>₹{Math.round(price).toLocaleString()}</b>   <MRP>₹{mrp}</MRP>   <Discount>{discount}</Discount>
        </p>
      </ProductDetails>
    </ProductCard>
  );
}
