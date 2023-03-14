const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:"797685219871991",
    api_secret:process.env.CLOUD_KEY_SECRET,
})

module.exports = cloudinary;