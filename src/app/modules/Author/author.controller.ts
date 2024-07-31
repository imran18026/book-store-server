import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { authorFilterableFields } from "./author.constant";
import { AuthorService } from "./author.service";

const createToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthorService.createToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Author data created successfully!",
      data: result,
    });
  }
);

const getAllFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(req.query)
    const filters = pick(req.query, authorFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    // console.log(options)
    const result = await AuthorService.getAllFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Author data fetched!",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AuthorService.getByIdFromDB(Number(id));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Author data fetched by id!",
    data: result,
  });
});
const getBooksBySpecificAuthorId = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AuthorService.getBooksBySpecificAuthorId(Number(id));
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book data fetched by specific author id!",
      data: result,
    });
  }
);

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AuthorService.updateIntoDB(Number(id), req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Author data updated!",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AuthorService.deleteFromDB(Number(id));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Author data deleted!",
    data: result,
  });
});

export const AuthorController = {
  createToDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  getBooksBySpecificAuthorId,
};
