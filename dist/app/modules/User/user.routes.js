"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
// import { UserRole } from "@prisma/client";
// import express, { NextFunction, Request, Response } from "express";
// import { fileUploader } from "../../../helpers/fileUploader";
// import auth from "../../middlewares/auth";
// import { userValidationSchemas } from "./user.validations";
// import validateRequest from "../../middlewares/validateRequest";
const router = express_1.default.Router();
router.post("/create-admin", 
// auth(UserRole.SUPER_ADMIN),
user_controller_1.userController.createAdmin);
router.post("/create-editor", 
// auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
user_controller_1.userController.createEditor);
router.get("/", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), user_controller_1.userController.getAllFromDB);
exports.UserRoutes = router;
