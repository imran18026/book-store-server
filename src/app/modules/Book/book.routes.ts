import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookController } from "./book.controller";
import { bookValidationSchemas } from "./book.validations";

const router = express.Router();

router.post(
  "/",
  validateRequest(bookValidationSchemas.create),
  BookController.createToDB
);

router.get("/", BookController.getAllFromDB);

router.get("/:id", BookController.getByIdFromDB);

// Query
router.get("/author/:id", BookController.getBooksBySpecificAuthorId);

router.put(
  "/:id",
  validateRequest(bookValidationSchemas.update),
  BookController.updateIntoDB
);

router.delete("/:id", BookController.deleteFromDB);

export const BookRoutes = router;
