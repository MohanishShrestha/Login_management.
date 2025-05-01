import bcrypt from "bcrypt";
import expessAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import Web from "../Schema/webSchema.js";
import expressAsyncHandler from "express-async-handler";
import { sendEmail } from "../utils/sendEmail.js";
import { secretkey1 } from "../constant.js";

export const createWebController = expessAsyncHandler(
  async (req, res, next) => {
    //hashpassword
    let data = req.body;
    let hashPassword = await bcrypt.hash(data.password, 10);
    data.password = hashPassword;
    data = {
      ...data,
      isVerified: false,
      password: hashPassword,
    };

    let result = await Web.create(data);

    //email ko lagi
    let info = {
      id: result._id,
    };

    let expireInfo = { expiresIn: "20d" };
    let token = jwt.sign(info, secretkey1, expireInfo);

    console.log("token = " + token);

    await sendEmail({
      to: [data.email],
      subject: "Registration",
      html: `<h1>You have created an account congratulations </h1>
      <a href="http://localhost:300/verify-email?token=${token}">
      http://localhost:300/verify-email?token=${token}
      </a>

       `,
    });

    res.status(201).json({
      success: true,
      message: "web created successfuly",
      result: result,
    });
  }
);

export const verifyEmailController = expessAsyncHandler(
  async (req, res, next) => {
    let result = await Web.findByIdAndUpdate(
      req.id,
      {
        isVerified: true,
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      success: true,
      message: "web verified successfuly",
      result: result,
    });
  }
);

export const loginUserController = expessAsyncHandler(
  async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await Web.findOne({ email: email });
    if (user) {
      if (user.isVerified) {
        let isValidPassword = await bcrypt.compare(password, user.password);

        if (isValidPassword) {
          let info = {
            id: user._id,
          };

          let expireInfo = { expiresIn: "20d" };
          let token = jwt.sign(info, secretkey1, expireInfo);

          res.status(200).json({
            success: true,
            message: "user login successfull",
            data: user,
            token: token,
          });
        } else {
          let error = new Error("Crenditial do not match p");
          throw error;
        }
      } else {
        let error = new Error("Crenditial do not match iv");
        throw error;
      }
    } else {
      let error = new Error("Crenditial not found");
      throw error;
    }
  }
);

export const myProfileController = expessAsyncHandler(
  async (req, res, next) => {
    let result = await Web.findById(req.id);

    res.status(200).json({
      success: true,
      message: "Profile read",
      result: result,
    });
  }
);

export const updateProfileController = expessAsyncHandler(
  async (req, res, next) => {
    let data = req.body;
    delete data.email;
    delete data.password;
    let result = await Web.findByIdAndUpdate(req.id, data, { new: true });

    res.status(201).json({
      success: true,
      message: "Profile updated",
      result: result,
    });
  }
);

export const updatePasswordController = expessAsyncHandler(
  async (req, res, next) => {
    let oldPassword = req.body.oldpassword;
    let newPassword = req.body.newpassword;

    //data load
    let data = await Web.findById(req.id);
    let hashPassword = data.password;
    let isValid = await bcrypt.compare(oldPassword, hashPassword);

    if (isValid) {
      let newHassPassword = await bcrypt.hash(newPassword, 10);

      let result = await Web.findByIdAndUpdate(
        req.id,
        {
          password: newHassPassword,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        message: "update password",
        result: result,
      });
    } else {
      let error = new Error("Crendential doesn't match");
      throw error;
    }
  }
);

export const realAllUsersController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Web.find({});
    res.status(200).json({
      sucess: true,
      message: "all user read successfully",
      result: result,
    });
  }
);

export const readSpecificUsersController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Web.findById(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "read successfully",
      result: result,
    });
  }
);

export const updateSpecificUsersController = expressAsyncHandler(
  async (req, res, next) => {
    let id = req.params.id;
    let data = req.body;
    delete data.email;
    delete data.password;

    let result = await Web.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json({
      sucess: true,
      message: "read successfully",
      result: result,
    });
  }
);

export const deleteSpecificUsersController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Web.findByIdAndDelete(req.params.id);
    res.status(200).json({
      sucess: true,
      message: "delete successfully",
      result: result,
    });
  }
);

export const forgetPasswordController = expressAsyncHandler(
  async (req, res, next) => {
    let email = req.body.email;
    let result = await Web.findOne({ email: email });
    if (email) {
      let info = {
        id: result._id,
      };

      let expireInfo = { expiresIn: "2d" };
      let token = jwt.sign(info, secretkey1, expireInfo);

      //send mail
      await sendEmail({
        to: [email],
        subject: "reset password",
        html: `<h1>You forget your password so here is link click on it </h1>
      <a href="http://localhost:300/verify-email?reset-password=${token}">
      http://localhost:300/verify-email?reset-password=${token}
      </a>

       `,
      });
      res.status(200).json({
        sucess: true,
        message: "to reset password link has been sent to user",
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }
  }
);

export const resetPasswordController = expressAsyncHandler(
  async (req, res, next) => {
    let id = req.id;
    let password = req.body.password;
    let hashPassword = await bcrypt.hash(password, 10);
    let result = await Web.findByIdAndUpdate(
      id,
      { password: hashPassword },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "password reset successfully",
      result: result,
    });
  }
);
