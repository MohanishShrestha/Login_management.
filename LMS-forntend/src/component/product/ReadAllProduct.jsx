import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../constant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReadAllProduct = () => {
  //hit api on page load

  let [products, setProducts] = useState([]);
  let navigate = useNavigate();

  const getData = async () => {
    try {
      let result = await axios({
        url: `${url}/product`,
        method: "get",
      });
      setProducts(result.data.result);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async(id)=>{
    try {
      let result = await axios({
        url: `${url}/product/${id}`,
        method: "delete"
 
      })
       getData();
      toast.success(result.data.message)
    } catch (error) {
      
      toast.error(error.response.data.message)
    }
  }

  //api gives data

  //show data

  return (
    <div>
      {products.map((item, i) => {
        return (
          <div
            key={i}
            style={{
              border: "solid blue 2px",
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "25px",
            }}
          >
            <p>Product name is {item.name}</p>
            <p>Product price is {item.price}</p>
            <p>Product quantity is {item.quantity}</p>
            <button
              onClick={(e) => {
                navigate(`/product/${item.id}`);
              }}
            >
              View
            </button>
            <button
              onClick={(e) => {
                navigate(`/product/update/${item.id}`);
              }}
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                handleDelete(item.id)
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ReadAllProduct;
