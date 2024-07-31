"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploader = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const process_1 = require("process");
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join((0, process_1.cwd)(), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const uploadToCWD = (0, multer_1.default)({ storage: storage });
// Configuration
cloudinary_1.v2.config({
    cloud_name: "duhvwfves",
    api_key: "354245884629495",
    api_secret: "mmlXsRj7o6zm4nqJNOLko5Y3qzw", // Click 'View Credentials' below to copy your API secret
});
const uploadToCloudinary = (file) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(file.path, (err, result) => {
            fs_1.default.unlinkSync(file.path); // Delete the temporary file
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
});
exports.fileUploader = {
    uploadToCWD,
    uploadToCloudinary,
};
