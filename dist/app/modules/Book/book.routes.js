"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_controller_1 = require("./book.controller");
const book_validations_1 = require("./book.validations");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(book_validations_1.bookValidationSchemas.create), book_controller_1.BookController.createToDB);
router.get("/", book_controller_1.BookController.getAllFromDB);
router.get("/:id", book_controller_1.BookController.getByIdFromDB);
// Query
router.get("/author/:id", book_controller_1.BookController.getBooksBySpecificAuthorId);
router.put("/:id", (0, validateRequest_1.default)(book_validations_1.bookValidationSchemas.update), book_controller_1.BookController.updateIntoDB);
router.delete("/:id", book_controller_1.BookController.deleteFromDB);
exports.BookRoutes = router;
