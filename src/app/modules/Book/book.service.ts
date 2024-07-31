import { Book, Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import { bookSearchAbleFields } from "./book.constant";
import { IBookFilterRequest } from "./book.interface";
import prisma from "../../../shared/prisma";

const createToDB = async (data: Book) => {
  data.publishedDate = new Date(data.publishedDate);
  await prisma.author.findUniqueOrThrow({
    where: { id: data.authorId as number },
  });
  const result = await prisma.book.create({
    data,
  });
  return result;
};

const getAllFromDB = async (
  params: IBookFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.BookWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: bookSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.BookWhereInput = { AND: andConditions };

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
    include: {
      author: true,
    },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: number): Promise<Book | null | any> => {
  id = Number(id);
  const result = await prisma.book.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
  return result;
};

const getBooksBySpecificAuthorId = async (
  id: number
): Promise<Book | null | any> => {
  id = Number(id);
  const author = await prisma.author.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.book.findMany({
    where: {
      authorId: author.id,
    },
  });
  return result;
};

const updateIntoDB = async (id: number, data: Partial<Book>): Promise<Book> => {
  id = Number(id);
  await prisma.book.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.book.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteFromDB = async (id: number): Promise<Book | null> => {
  id = Number(id);
  await prisma.book.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const bookDeletedData = await transactionClient.book.delete({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });

    return bookDeletedData;
  });

  return result;
};

export const BookService = {
  createToDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  getBooksBySpecificAuthorId,
};
