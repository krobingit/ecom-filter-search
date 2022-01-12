import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Product } from './Product';
import { Gender } from './Components/GenderComponent';
import { Brand } from './Components/BrandComponent';
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { small } from "./responsive";
import { Category } from './Components/CategoryComponent';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Products=styled.div`
display:flex;
flex-wrap:wrap;
align-items:center;
width:75%;
`
const MainContainer = styled.div`
display:flex;
padding:0.5rem;
`
const LoaderContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
width:100%;
`

const FilterContainer = styled.div`
border:2px solid black;
overflow:hidden;
border-radius:1rem;
width:25%;
padding:0.5rem;
height:max-content;
${small({width:"10rem",padding:"0.1rem"})}
`
const GenderContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
margin:0.3rem;
`
const BrandContainer = styled.div`
display:flex;
flex-direction:column;
padding:0.5rem;
height:20rem;
overflow:scroll;
`
const Line = styled.div`
border:1px dashed darkgray;
width:100%;
`

function ProductList({search})
{
   const [showBrands, setshowBrands] = useState(false);
   const [showCategory, setshowCategory] = useState(false);
   const dispatch = useDispatch();
 const [loading, setLoading] = useState(false);
   const [products, setProducts] = useState(null);
   const [genderValues, setgenderValues] = useState(null);
   const [brandValues, setbrandValues] = useState(null);
     const [categoryValues, setcategoryValues] = useState(null);
   const [filters, setFilters] = useState({
      gender: [],
      category: [],
      brand: [],
      rating: [],
      price:[]
   })

 useEffect(() => {
  const getProducts =async () => {
setLoading(true)
   const res = await fetch("https://demo7303877.mockable.io/", {
   method:"GET"

   });
     const productsList = await res.json();
     //getting gender filter values in an array
     var genderValues = productsList.filters.primaryFilters[3].filterValues.map((gender) => gender.id);
     setgenderValues(genderValues);
      //getting brand filter values in an array
     var brandValues = productsList.filters.primaryFilters[2].filterValues.map((brand) => brand.id)
     setbrandValues(brandValues);
      //getting category filter values in an array
      var categoryValues = productsList.filters.primaryFilters[6].filterValues.map((category) => category.id)
     setcategoryValues(categoryValues);

   const { products } = productsList;
     console.log(productsList)


     var filteredProducts = products;

     if (products && filters) {

      if (search.length > 1)
      {
     filteredProducts = filteredProducts.filter(product => product.productName.toLowerCase().includes(search.trim().toLowerCase()) || product.category.toLowerCase().includes(search.trim().toLowerCase()))
         setProducts(filteredProducts)
         setLoading(true)
      }

      for (let key in filters)
      {
         if (filters[key].length > 0)
         {
            if (key === "gender")
            {

               filteredProducts = filteredProducts.filter(product => filters["gender"].includes(product.gender.toLowerCase()))
               setProducts(filteredProducts)
                 setLoading(true)
            }
            if (key === "brand")
            {

               filteredProducts = filteredProducts.filter(product => filters["brand"].includes(product.brand))
               setProducts(filteredProducts)
                 setLoading(true)
            }
            if (key === "category")
            {

               filteredProducts = filteredProducts.filter(product => filters["category"].includes(product.category))
               setProducts(filteredProducts)
                 setLoading(true)
            }

         }
      }

     }

   setLoading(false)
   setProducts(filteredProducts)
  }
  getProducts();

 }, [search,filters])


 return (
  <MainContainer>
   <FilterContainer>
          <h3>Filters</h3>
          <h4>Gender</h4>
          { genderValues &&
             genderValues.map((genderValue,idx) =>
                <GenderContainer>
                   <Gender key={idx} genderValue={genderValue} filters={filters} setFilters={setFilters} />
                   </GenderContainer>
                   )
          }
          <Line/>
          <h4>Categories {showCategory ? <ExpandLessIcon style={{cursor:"pointer"}} onClick={() => setshowCategory(!showCategory)} />
             : <ExpandMoreIcon style={{cursor:"pointer"}} onClick={() => setshowCategory(!showCategory)} />}</h4 >
          {
             showCategory && <>
                <Button variant="text" onClick={() => dispatch({ type: "ClearCategories" })}>Clear Categories</Button>
                <BrandContainer>

                   {categoryValues &&
                      categoryValues.map((categoryValue, idx) =>
                         <Category key={idx} categoryValue={categoryValue} filters={filters} setFilters={setFilters} />
                      )

                   }


                </BrandContainer>
             </>}
            <Line/>
          <h4>Brands {showBrands ? <ExpandLessIcon style={{cursor:"pointer"}} onClick={() => setshowBrands(!showBrands)} />
             : <ExpandMoreIcon style={{ cursor: "pointer" }} onClick={() => setshowBrands(!showBrands)} />}</h4>
          {showBrands &&
             <>
                  <Button variant="text" onClick={()=>dispatch({type:"ClearBrands"})}>Clear Brands</Button>
          <BrandContainer>

              { brandValues &&
             brandValues.map((brandValue,idx) =>

                   <Brand key={idx} brandValue={brandValue} filters={filters} setFilters={setFilters} />

                )

             }
             </BrandContainer>
             </>
          }
   </FilterContainer>
   {loading ?
 <LoaderContainer>
<ClipLoader color="gold" loading={loading}  size={60} />
      <h3 style={{ margin:"1rem 0",letterSpacing:"1px",fontSize: "1.5rem" }}>
                Fetching your products..</h3>
         </LoaderContainer>

    :
    <Products>
     {products && products.map(({ productId, product, brand, images,rating,ratingCount, discountDisplayLabel, mrp, price }) =>
      <Product key={productId} id={productId} name={product} brand={brand} images={images} discount={discountDisplayLabel}
       mrp={mrp} price={price} rating={rating} ratingCount={ratingCount}/>

     )}
    </Products>
   }
   </MainContainer>
   )


}

export { ProductList }