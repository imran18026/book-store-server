"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const author_controller_1 = require("./author.controller");
const author_validations_1 = require("./author.validations");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(author_validations_1.authorValidationSchemas.create), author_controller_1.AuthorController.createToDB);
router.get("/", author_controller_1.AuthorController.getAllFromDB);
router.get("/:id", author_controller_1.AuthorController.getByIdFromDB);
// Query
router.get("/:id/books", author_controller_1.AuthorController.getBooksBySpecificAuthorId);
router.put("/:id", (0, validateRequest_1.default)(author_validations_1.authorValidationSchemas.update), author_controller_1.AuthorController.updateIntoDB);
router.delete("/:id", author_controller_1.AuthorController.deleteFromDB);
exports.AuthorRoutes = router;
