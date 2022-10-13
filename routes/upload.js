const express = require("express")
const router = express.Router()
const ftp = require("ftp");
const multer = require("multer");
const ftpStorage = require("multer-ftp");
const path = require('path');
const middleware = require("../config/middleware/index")

router.post('/', middleware.auth.checkToken, async (req, res) => {
    const ftpClient = new ftp();
    ftpClient.connect({
        secure: false,
        host: process.env.FTP_HOST,
        user: process.env.FTP_USERNAME,
        password: process.env.FTP_PASSWORD,
        port: process.env.FTP_PORT
    });

    const uploads = multer({
        storage: new ftpStorage({
            basepath: '/images',
            connection: ftpClient,
            destination: function(req, file, options, callback) {
                var timestamp = Date.now();
                var fileName = Math.floor(timestamp/1000) + "_" + req.body.type + "_"
                fileName += file.originalname.toLowerCase().split(' ').join('-');
                callback(null, path.join(options.basepath,fileName))
            }
        }),
        limits: {
            fileSize: 2000000
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/) || file.originalname == "") { 
               return cb({message:'Please upload a Image'})
            }
            if(req.body.type == "" || req.body.type === undefined){
               return cb({message:'Type is required'})
            }
            cb(undefined, true)
        },
    });
  
    uploads.single('image')(req, res, (err) => {
        ftpClient.end();
        if(err){
            return res.json({
                success: false,
                message: err.message
            })
        }
        return res.json({
            success: true,
            data: process.env.URL_CDN + req.file.path
        })
    });
}); 

module.exports = router
