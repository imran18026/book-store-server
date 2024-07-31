// import { Request, RequestHandler, Response } from "express";
// import httpStatus from "http-status";
// import catchAsync from "../../../shared/catchAsync";
// import sendResponse from "../../../shared/sendResponse";
// import { userService } from "./user.sevice";
// import pick from "../../../shared/pick";
// import { userFilterableFields } from "./user.constant";
// import { IAuthUser } from "../../interfaces/common";

import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { userFilterableFields } from "./user.constant";
import { userService } from "./user.sevice";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created successfully!",
    data: result,
  });
});

const createEditor = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createEditor(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Editor Created successfully!",
    data: result,
  });
});

const getAllFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, userFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await userService.getAllFromDB(filters, options);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User data fetched!",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const userController = {
  createAdmin,
  createEditor,
  getAllFromDB,
};
