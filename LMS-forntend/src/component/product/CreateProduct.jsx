import axios from "axios";
import React, { useState } from "react";
import { url } from "../../constant";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      name: name,
      price: price,
      quantity: quantity,
    };
    // console.log(data);

    try {
      let result = await axios({
        url: `${url}/product`,
        method: "post",
        data: data,
      });

      //clear the inputs
      setName("");
      setPrice("");
      setQuantity("");

      //message herna ko lagi
      // console.log(result);

      toast.success(result.data.message);
    } catch (error) {
      //error ko message herna ko lagi
      // console.log(error);
      toast.error(error.response.data.message);
      // console.log(error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity: </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <button>Send</button>
        </div>
      </form>
    </>
  );
};

export default CreateProduct;
