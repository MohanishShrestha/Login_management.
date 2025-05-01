import { Router } from "express";

import {
  createWebController,
  deleteSpecificUsersController,
  forgetPasswordController,
  loginUserController,
  myProfileController,
  readSpecificUsersController,
  realAllUsersController,
  resetPasswordController,
  updatePasswordController,
  updateProfileController,
  updateSpecificUsersController,
  verifyEmailController,
} from "../Controller/webController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import authorized from "../middleware/authorized.js";

const webRouter = Router();

webRouter
  .route("/")
  .post(
    isAuthenticated,
    authorized(["admin", "superAdmin"]),
    createWebController
  )
  .get(realAllUsersController);

webRouter.route("/verify-email").patch(isAuthenticated, verifyEmailController);

webRouter.route("/login").post(loginUserController);

webRouter.route("/my-profile").get(isAuthenticated, myProfileController);

webRouter
  .route("/update-profile")
  .patch(isAuthenticated, updateProfileController);

webRouter
  .route("/update-password")
  .patch(isAuthenticated, updatePasswordController);

webRouter.route("/forget-password").post(forgetPasswordController);

webRouter
  .route("/reset-password")
  .patch(isAuthenticated, resetPasswordController);

webRouter
  .route("/:id")
  .get(
    isAuthenticated,
    authorized(["admin", "superAdmin"]),
    readSpecificUsersController
  )
  .patch(
    isAuthenticated,
    authorized(["admin", "superAdmin"]),
    updateSpecificUsersController
  )
  .delete(
    isAuthenticated,
    authorized(["admin", "superAdmin"]),
    deleteSpecificUsersController
  );

export default webRouter;
