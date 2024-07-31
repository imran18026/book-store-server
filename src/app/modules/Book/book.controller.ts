import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { bookFilterableFields } from "./book.constant";
import { BookService } from "./book.service";

const createToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookService.createToDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book data created successfully!",
      data: result,
    });
  }
);

const getAllFromDB: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // console.log(req.query)
    const filters = pick(req.query, bookFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    // console.log(options)
    const result = await BookService.getAllFromDB(filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Book data fetched!",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookService.getByIdFromDB(Number(id));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book data fetched by id!",
    data: result,
  });
});

const getBooksBySpecificAuthorId = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await BookService.getBooksBySpecificAuthorId(Number(id));
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

  const result = await BookService.updateIntoDB(Number(id), req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book data updated!",
    data: result,
  });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookService.deleteFromDB(Number(id));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book data deleted!",
    data: result,
  });
});

export const BookController = {
  createToDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  getBooksBySpecificAuthorId,
};
