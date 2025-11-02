import { v2 as cloudinary } from 'cloudinary';
import { logErrorToFile } from './logger';
const uploadImage = async (imagePath) => {

    // Return "https" URLs by setting secure: true
    cloudinary.config({
        cloud_name: 'dn76vj9mr',
        api_key: '489116596646783',
        api_secret: 'k8TqR0TyQ3UljEyE1F9KwhPs3dU' // Click 'View API Keys' above to copy your API secret
    });
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: "images"
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);

        // const removeFile = fs.unlink((imagePath), (err) => {
        //     err ? console.log(err) : console.log("Deleted file");

        // })
        // console.log(result);
        return result;
    } catch (error) {
        logErrorToFile(error, "Upload file");
        res.status(500).json({
            isSuccess: false,
            message: "Internal server error",
        });
    }
};
export default uploadImage