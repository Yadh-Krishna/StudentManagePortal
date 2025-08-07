import cloudinary from "../../infrastructure/cloud/cloudinary.js";

export class CloudinaryService {
   async uploadImage(filePath) {
    const res = await cloudinary.uploader.upload(filePath, {
      folder: 'studentProfileImages',
    });
    return res.secure_url;
  }
}