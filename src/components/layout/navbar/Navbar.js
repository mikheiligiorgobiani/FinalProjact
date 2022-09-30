import React from 'react'
import { useProductContext } from '../../../context/productContext'
import { Link } from "react-router-dom";

const Navbar = () => {
    const {mainProductData} = useProductContext();
    return (
        <div >
          {mainProductData.categories?.length > 0 &&
            mainProductData.categories.map((category) => {
              return (
                <Link
                  key={category._id}
                  to={`/products/categories/${category.name}?page=1`}>
                {category.name}
                </Link>
              );
            })}
        </div>
      );
    };

export default Navbar