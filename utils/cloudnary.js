import { v2 as cloudinary } from 'cloudinary';
import { logErrorToFile } from './logger.js';

// ✅ Configure Cloudinary once
cloudinary.config({
    cloud_name: 'dn76vj9mr',
    api_key: '489116596646783',
    api_secret: 'k8TqR0TyQ3UljEyE1F9KwhPs3dU',
    secure: true,
});

// ✅ Express route handler
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }

        // Convert file buffer to base64
        const base64Data = req.file.buffer.toString('base64');
        const fileUri = `data:${req.file.mimetype};base64,${base64Data}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(fileUri, {
            folder: 'images',
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            invalidate: true,
        });

        return {
            isSuccess: true,
            message: 'File uploaded successfully',
            url: result.secure_url,
            public_id: result.public_id,
        };
    } catch (error) {
        logErrorToFile(error, 'Upload file');
        console.error('Upload error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};
