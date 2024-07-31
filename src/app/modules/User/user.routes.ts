import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
// import { UserRole } from "@prisma/client";
// import express, { NextFunction, Request, Response } from "express";
// import { fileUploader } from "../../../helpers/fileUploader";
// import auth from "../../middlewares/auth";
// import { userValidationSchemas } from "./user.validations";
// import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();
router.post(
  "/create-admin",
  // auth(UserRole.SUPER_ADMIN),
  userController.createAdmin
);
router.post(
  "/create-editor",
  // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.createEditor
);
router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  userController.getAllFromDB
);

export const UserRoutes = router;
