import React, { useState, useEffect } from 'react'
import { Card,CardContent,Typography,CardActions, Rating, Link,Button } from "@mui/material";
import { useUserContext } from '../../context/userContext';
import { instance } from '../../app/hooks/instance';
import { useCartContext } from '../../context/cartContext';
import { isUserAdmin } from '../../app/util';
import { useProductContext } from '../../context/productContext';
import {  useNavigate } from "react-router-dom";




const ProductCard = ({product}) => {
    
  const [productRating, setProductRating] = useState(product.averageRating);
  const { userData } = useUserContext();
  const {addToCart, removeFromCart, cart} = useCartContext();
  const { setSelectedProduct, setIsProductUpdating, setMainProduct } =
    useProductContext();
  const isAdmin = isUserAdmin();
  const isProductInCart = cart?.find(
    (cartItem) => cartItem.product?._id === product._id
  );
  const navigate = useNavigate();
  useEffect(() => {
    setProductRating(product.averageRating);
  }, [product]);

  const onRatingChange = async (e) =>{
    // setProductRating(+e.target.value);
    try {
        await instance.post(
            `/products/${product._id}/users/${userData._id}/rate`,
            {
              rating: +e.target.value,
            }
          );
          const { data } = await instance.get(`/products`);
          setMainProduct(data);
    } catch (error) {
        
    }
  };
  return (
    <div>
        <Card>
     <CardContent>
        <Link to={`/products/categories/${product.category}/${product.name}`}
        state={{ id: product._id, category: product.category }} >
          <img src={product.img} width={200}/>
      <Typography variant='h5'>{product.name}</Typography>
      </Link>
      <Typography variant='h6'>${product.price}</Typography>
     </CardContent>
     <CardActions>
        <Rating value={productRating} onChange={onRatingChange} precision={0.5}/>
        {isProductInCart ? (
            <>
              <Button onClick={() => addToCart(product)}>+</Button>
              {isProductInCart.quantity}
              <Button onClick={() => removeFromCart(product._id)}>-</Button>
            </>
          ) : (
            <Button onClick={() => addToCart(product)}>Add to cart</Button>
          )};  
          {isAdmin && (
            <Button
              onClick={() => {
                setIsProductUpdating(true);
                setSelectedProduct(product);
                navigate(`/products/${product._id}/edit`);
              }}
            >
              Edit
            </Button>
          )} 

     </CardActions>
        </Card>
    </div>
  )
}

export default ProductCard