import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import { cwd } from "process";
import fs from "fs";
import { ICloudinaryResponse, IUploadFile } from "../app/interfaces/file";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const uploadToCWD = multer({ storage: storage });

// Configuration
cloudinary.config({
  cloud_name: "duhvwfves",
  api_key: "354245884629495",
  api_secret: "mmlXsRj7o6zm4nqJNOLko5Y3qzw", // Click 'View Credentials' below to copy your API secret
});

const uploadToCloudinary = async (
  file: IUploadFile
): Promise<ICloudinaryResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,

      (err: Error, result: ICloudinaryResponse) => {
        fs.unlinkSync(file.path); // Delete the temporary file
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const fileUploader = {
  uploadToCWD,
  uploadToCloudinary,
};
