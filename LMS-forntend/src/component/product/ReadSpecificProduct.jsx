import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../constant";
import axios from "axios";

const ReadSpecificProduct = () => {
  let params = useParams();
  let [product, setProduct] = useState({});

  
    const getData = async()=>{
      try {
        let result = await axios({
          url: `${url}/product/${params.id}`,
          method: "get",
        });
        setProduct(result.data.result);
      } catch (error) {}
  }


  useEffect(()=>{
    getData()
  },[])


  return <div style={{
              border: "solid blue 2px",
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "25px",
            }}>
    <p>Product Name is {product.name}</p>
    <p>Product Price is {product.price}</p>
    <p>Product Quantity is {product.quantity}</p>
  </div>;
};

export default ReadSpecificProduct;
