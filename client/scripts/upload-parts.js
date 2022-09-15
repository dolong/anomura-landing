const fs = require("fs");
const path = require("path");
let FormData = require("form-data");
let cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// WATCHOUT FOR LOOP, habitat takes 24, other parts take 25//////////
const uploadImage = async () => {
    const dirRelativeToPublicFolder = "img/imageviewer/Shell";
    const imageDir = path.resolve("./public", dirRelativeToPublicFolder);
    let partName = "Pong Shell"
    try {
        for (let i = 1; i <= 25; i++) {
            let fileName = `${partName}`;

            let fileToUpload
            if (i === 25) {
                fileName = `${fileName}_hex`
            } else {
                fileName = `${fileName}_${i}`
            }

            // fileName = `${fileName}_${i}`

            fileToUpload = path.resolve(`${imageDir}/${fileName}.png`);

            let res = await cloudinary.uploader.upload(fileToUpload, {
                public_id: fileName,
                upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
            });
            console.log(res.secure_url)
        }
    } catch (error) {
        console.log(error)
    }
};
uploadImage()
