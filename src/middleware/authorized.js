import expressAsyncHandler from "express-async-handler";
import Web from "../Schema/webSchema.js";

let authorized = (roles) => {
  // let roles = ["admin", "superAdmin"];
  return expressAsyncHandler(async (req, res, next) => {
    let id = req.id;
    let result = await Web.findById(id);
    let tokenRole = result.role;
    if (roles.includes(tokenRole)) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "user not authorized",
      });
    }
  });
};

export default authorized;
