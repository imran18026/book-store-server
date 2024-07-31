import { Author, Book, Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpers/paginationHelper";
import prisma from "../../../shared/prisma";
import { IPaginationOptions } from "../../interfaces/pagination";
import { authorSearchAbleFields } from "./author.constant";
import { IAuthorFilterRequest } from "./author.interface";

const createToDB = async (data: Author) => {
  data.birthDate = new Date(data.birthDate);
  const result = await prisma.author.create({ data });
  return result;
};

const getAllFromDB = async (
  params: IAuthorFilterRequest,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.AuthorWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: authorSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.AuthorWhereInput = { AND: andConditions };

  const result = await prisma.author.findMany({
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
      books: true,
    },
  });

  const total = await prisma.author.count({
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

const getByIdFromDB = async (id: number): Promise<Author | null> => {
  id = Number(id);
  const result = await prisma.author.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
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

const updateIntoDB = async (
  id: number,
  data: Partial<Author>
): Promise<Author> => {
  id = Number(id);
  await prisma.author.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.author.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteFromDB = async (id: number): Promise<Author | null> => {
  id = Number(id);
  await prisma.author.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const authorDeletedData = await transactionClient.author.delete({
      where: {
        id,
      },
      include: {
        books: true,
      },
    });

    return authorDeletedData;
  });

  return result;
};

export const AuthorService = {
  createToDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  getBooksBySpecificAuthorId,
};
