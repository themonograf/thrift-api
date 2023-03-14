const ftp = require("ftp");
const multer = require("multer");
const ftpStorage = require("multer-ftp");
const path = require('path');
const masterImage = require("../model/master_image")

const service = {}

service.ftpClient = new ftp();
service.ftpClient.connect({
    secure: false,
    host: process.env.FTP_HOST,
    user: process.env.FTP_USERNAME,
    password: process.env.FTP_PASSWORD,
    port: process.env.FTP_PORT
});

service.uploads = multer({});

service.uploads = multer({
    storage: new ftpStorage({
        basepath: '/images',
        connection: service.ftpClient,
        destination: function(req, file, options, callback) {
            return callback(null, path.join(options.basepath + '/' + req.body.category,file.originalname))
        }
    }),
    limits: {
        fileSize: 2000000,
        files:10,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/) || file.originalname == "") { 
            return cb({message:'Please upload a Image'})
        }

        if(req.body.category == "" || req.body.category === undefined || !masterImage.category.includes(req.body.category)){
            return cb({message:'Category is required'})
        }

        cb(undefined, true)
    },
});

// service.deleteFile = 

module.exports = service
