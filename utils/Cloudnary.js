const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dgpcudf17',
    api_key: '935596435515359',
    api_secret: 'nGVmQLqZHq6Kqq1AlmGtP2Pr5CQ'
})

const uploadPDF = async(file) => {
    try {
        const pdf = await cloudinary.uploader.upload(file)
        return pdf.secure_url
    } catch (error) {
        console.log(error)
    }
}

module.exports = {uploadPDF}