import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { secretkey1 } from "../constant.js";

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  /* 
    pass token from postman
    get token
    verify token
    ifnot verify
        throw error
    if verify
        extract id
        pass id to exit middleware
        next()
    */

  let bearerToken = req.headers.authorization;
  

  if (bearerToken) {
    let token = bearerToken.split(" ")[1];

    let info = jwt.verify(token, secretkey1);
    req.id = info.id;
    next();
  } else {
    let error = new Error("Invalid token s");
    error.status = 401;
    throw error;
  }
});

export default isAuthenticated;
