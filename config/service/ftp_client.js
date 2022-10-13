// const ftp = require("ftp");
// const multer = require("multer");
// const ftpStorage = require("multer-ftp");
// const path = require('path');
// const ftpClient = new ftp();
// const service = {}

// service.uploadImage = async function (req, callback) {
//     try {
//         await ftpClient.connect({
//             secure: false,
//             host: process.env.FTP_HOST,
//             user: process.env.FTP_USERNAME,
//             password: process.env.FTP_PASSWORD,
//             port: process.env.FTP_PORT
//         });

//         const timestamp = Date.now();
//         const fileName = Math.floor(timestamp/1000) + "_" + req.body.type + "_" 
      
//         const uploads = multer({
//             storage: new ftpStorage({
//                 basepath: '/images',
//                 connection: ftpClient,
//                 destination: function(req, file, options, callback) {
//                     fileName += file.originalname
//                     console.log(fileName)
//                     callback(null, path.join(options.basepath,fileName))
//                 }
//             })
//         });
      
//         uploads.single('image')(req, res, (err) => {
//             res.send(req.file)
//             ftpClient.end();
//             // if(err) {
//             //     console.log(err)
//             // }

//             // res.json({
//             //     success: true
//             // })
//             // return callback(null, process.env.URL_IMAGES + fileName)
//         });
        
//         return callback(null, process.env.URL_IMAGES + fileName)
//     } catch (error) {
//         console.log(error)
//         return callback(error)
//     }
// }

// module.exports = service