import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthorController } from "./author.controller";
import { authorValidationSchemas } from "./author.validations";

const router = express.Router();

router.post(
  "/",

  validateRequest(authorValidationSchemas.create),
  AuthorController.createToDB
);

router.get(
  "/",

  AuthorController.getAllFromDB
);

router.get(
  "/:id",

  AuthorController.getByIdFromDB
);
// Query
router.get("/:id/books", AuthorController.getBooksBySpecificAuthorId);

router.put(
  "/:id",
  validateRequest(authorValidationSchemas.update),
  AuthorController.updateIntoDB
);

router.delete("/:id", AuthorController.deleteFromDB);

export const AuthorRoutes = router;
