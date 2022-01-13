import styled from "styled-components";
import { useEffect, useState } from "react";
import { Product } from "./Product";
import { Gender } from "./GenderComponent";
import { Brand } from "./BrandComponent";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Button } from "@mui/material";
import { small } from "../responsive";
import { Category } from "./CategoryComponent";
import { Price } from "./PriceRangeComponent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Rating } from "./RatingComponent";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Year } from "./YearComponent";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Products = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 78%;
`;
const MainContainer = styled.div`
  display: flex;
  padding: 0.5rem;
`;
const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FilterContainer = styled.div`
  overflow: hidden;
  border-radius: 1rem;
  width: 22%;
  padding: 0.5rem;
  height: max-content;
  ${small({ width: "14rem", padding: "0.1rem" })}
`;
const GenderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.3rem;
`;
const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  height: 20rem;
  overflow: scroll;
  margin-bottom: 1rem;
`;
const Line = styled.div`
  border: 1px dashed darkgray;
  width: 100%;
`;

function ProductList({ search }) {
  const [showgender, setshowGender] = useState(false);
  const [showBrands, setshowBrands] = useState(false);
  const [showCategory, setshowCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [genderValues, setgenderValues] = useState(null);
  const [brandValues, setbrandValues] = useState(null);
  const [categoryValues, setcategoryValues] = useState(null);
  const [price, setPrice] = useState(null);
  const dispatch = useDispatch();
  const { gender } = useSelector(state => state.gender);
  const { category } = useSelector(state => state.category);
   const { brand} = useSelector(state => state.brand);
  const [filters,setFilters] = useState({
    gender: [],
    category: [],
    brand: [],
    rating: [],
    price: [],
    year: [],
  });
  //getting rating filter values in an array
  var ratingValues = [4, 3, 2, 1];
  //getting year filter values in an array
  var yearValues = [2015, 2016, 2017, 2018, 2019];
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const res = await fetch("https://demo7303877.mockable.io/", {
        method: "GET",
      });
      const productsList = await res.json();
      //getting gender filter values in an array
      var genderValues =
        productsList.filters.primaryFilters[3].filterValues.map(
          (gender) => gender.id
        );
      setgenderValues(genderValues);
      //getting brand filter values in an array
      var brandValues = productsList.filters.primaryFilters[2].filterValues.map(
        (brand) => brand.id
      );
      setbrandValues(brandValues);
      //getting category filter values in an array
      var categoryValues =
        productsList.filters.primaryFilters[6].filterValues.map(
          (category) => category.id
        );
      setcategoryValues(categoryValues);

      //getting price filter values in an array
      var priceValues = [
        productsList.filters.rangeFilters[0].filterValues[0].start,
        productsList.filters.rangeFilters[0].filterValues[0].end,
      ];
      setPrice(priceValues);

      const { products } = productsList;

      console.log(productsList);

      var filteredProducts = products;

      if (products && filters) {
        if (search.length > 1) {
          filteredProducts = filteredProducts.filter(
            (product) =>
              product.productName
                .toLowerCase()
                .includes(search.trim().toLowerCase()) ||
              product.category
                .toLowerCase()
                .includes(search.trim().toLowerCase())
          );
          setProducts(filteredProducts);
          setLoading(true);
        }

        for (let key in filters) {
          if (filters[key].length > 0) {
            if (key === "gender") {
              filteredProducts = filteredProducts.filter((product) =>
                filters["gender"].includes(product.gender.toLowerCase())
              );
              setProducts(filteredProducts);
              setLoading(true);
            }
            if (key === "brand") {
              filteredProducts = filteredProducts.filter((product) =>
                filters["brand"].includes(product.brand)
              );
              setProducts(filteredProducts);
              setLoading(true);
            }
            if (key === "category") {
              filteredProducts = filteredProducts.filter((product) =>
                filters["category"].includes(product.category)
              );
              setProducts(filteredProducts);
              setLoading(true);
            }
            if (key === "price") {
              let PRICE = filters["price"];
              filteredProducts = filteredProducts.filter(
                (product) => product.price > PRICE[0] && product.price < PRICE[1]
              );
              filteredProducts.sort((a, b) => {
                if (a.price > b.price)
                  return 1;
                else
                  return -1;

              })
              setProducts(filteredProducts);
              setLoading(true);
            }
            if (key === "rating") {
              filteredProducts = filteredProducts.filter(
                (product) => Math.round(product.rating) >= filters["rating"][0]
              );
               filteredProducts.sort((a, b) => {
                if (a.rating > b.rating)
                  return 1;
                else
                  return -1;

              })
              setProducts(filteredProducts);
              setLoading(true);
            }
            if (key === "year") {
              filteredProducts = filteredProducts.filter(
                (product) => product.year === filters["year"][0]
              );
              setProducts(filteredProducts);
              setLoading(true);
            }
          }
        }
      }
      console.log(filters);
      setLoading(false);
      setProducts(filteredProducts);
    };
    getProducts();
  }, [search, filters]);

  const btnStyle = { color: "red" };
  return (
    <MainContainer>
      <FilterContainer>
        <h3>FILTERS</h3>
        <Button
          style={btnStyle}
          onClick={() =>
            setFilters({
              gender: [],
              category: [],
              brand: [],
              rating: [],
              price: [],
              year: [],
            })
          }
        >
          Clear All Filters
          <DeleteOutlineIcon />
        </Button>
        <h4>
          Gender{" "}
          {showgender ? (
            <ExpandLessIcon
              style={{ cursor: "pointer" }}
              onClick={() => setshowGender(!showgender)}
            />
          ) : (
            <ExpandMoreIcon
              style={{ cursor: "pointer" }}
              onClick={() => setshowGender(!showgender)}
            />
          )}
        </h4>
        {showgender && (
          <>
            <Button
              style={btnStyle}
              variant="text"
              onClick={() => {
                dispatch({ type:"ClearGender"})
                setFilters({...filters,gender});
              }}
            >
              <DeleteOutlineIcon />
            </Button>
            {genderValues &&
              genderValues.map((genderValue, idx) => (
                <GenderContainer>
                  <Gender
                    key={idx}
                    genderValue={genderValue}
                    filters={filters}
                    setFilters={setFilters}
                  />
                </GenderContainer>
              ))}
          </>
        )}
        <Line />
        <h4>
          Categories{" "}
          {showCategory ? (
            <ExpandLessIcon
              style={{ cursor: "pointer" }}
              onClick={() => setshowCategory(!showCategory)}
            />
          ) : (
            <ExpandMoreIcon
              style={{ cursor: "pointer" }}
              onClick={() => setshowCategory(!showCategory)}
            />
          )}
        </h4>
        {showCategory && (
          <>
            <Button
              style={btnStyle}
              variant="text"
              onClick={() => {
          dispatch({ type:"ClearCategories"})
                setFilters({...filters,category});
              }}
            >
              <DeleteOutlineIcon />
            </Button>
            <BrandContainer>
              {categoryValues &&
                categoryValues.map((categoryValue, idx) => (
                  <Category
                    key={idx}
                    categoryValue={categoryValue}
                    filters={filters}
                    setFilters={setFilters}
                  />
                ))}
            </BrandContainer>
          </>
        )}
        <Line />
        <h4>
          Brands{" "}
          {showBrands ? (
            <ExpandLessIcon
              style={{ cursor: "pointer" }}
              onClick={() => setshowBrands(!showBrands)}
            />
          ) : (
            <ExpandMoreIcon
              style={{ cursor: "pointer" }}
              onClick={() => setshowBrands(!showBrands)}
            />
          )}
        </h4>
        {showBrands && (
          <>
            <Button
              style={btnStyle}
              variant="text"
              onClick={() =>
{
                dispatch({ type:"ClearBrands"})
                setFilters({...filters,brand});

}}
            >
              <DeleteOutlineIcon />
            </Button>
            <BrandContainer>
              {brandValues &&
                brandValues.map((brandValue, idx) => (
                  <Brand
                    key={idx}
                    brandValue={brandValue}
                    filters={filters}
                    setFilters={setFilters}
                  />
                ))}
            </BrandContainer>
          </>
        )}
        <Line />
        <h4>Price Range</h4>
        {price && (
          <Price
            start={price[0]}
            end={price[1]}
            filters={filters}
            setFilters={setFilters}
          />
        )}
        <Line />
        <h4>Rating</h4>
        {ratingValues.map((rating) => (
          <Rating rating={rating} filters={filters} setFilters={setFilters} />
        ))}
        <Button
          style={btnStyle}
          onClick={() => setFilters({ ...filters, rating: [] })}
        >
          <DeleteOutlineIcon />
        </Button>
        <Line />
        <h4>Year</h4>
        <Button
          style={btnStyle}
          onClick={() => setFilters({ ...filters, year: [] })}
        >
          <DeleteOutlineIcon />
        </Button>
        {yearValues.map((year) => (
          <Year year={year} filters={filters} setFilters={setFilters} />
        ))}

      </FilterContainer>
      {loading ? (
        <LoaderContainer>
          <PacmanLoader color="gold" loading={loading} size={30} />
        </LoaderContainer>
      ) : (
        <Products>
          {products &&
            products.map(
              ({
                productId,
                product,
                brand,
                images,
                rating,
                ratingCount,
                discountDisplayLabel,
                mrp,
                price,
              }) => (
                <Product
                  key={productId}
                  id={productId}
                  name={product}
                  brand={brand}
                  images={images}
                  discount={discountDisplayLabel}
                  mrp={mrp}
                  price={price}
                  rating={rating}
                  ratingCount={ratingCount}
                />
              )
            )}
        </Products>
      )}
    </MainContainer>
  );
}

export { ProductList };
