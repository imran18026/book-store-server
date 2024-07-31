import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";

import { AuthorRoutes } from "../modules/Author/author.routes";
import { BookRoutes } from "../modules/Book/book.routes";
import { UserRoutes } from "../modules/User/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/authors",
    route: AuthorRoutes,
  },
  {
    path: "/books",
    route: BookRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
