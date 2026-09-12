import { v2 as cloudinary } from 'cloudinary';

// Configure using individual env vars to avoid CLOUDINARY_URL auto-parse at import time
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

export async function uploadImage(
  base64Data: string,
  folder: string = 'matacare/documentation'
): Promise<{ url: string; public_id: string }> {
  const result = await cloudinary.uploader.upload(base64Data, {
    folder,
    resource_type: 'image',
    quality: 'auto',
    fetch_format: 'auto',
  });
  return { url: result.secure_url, public_id: result.public_id };
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}
