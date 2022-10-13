// const { validationResult } = require("express-validator")
// const service = require("../config/service/index")

// const controller = {}

// controller.uploadImage = async function (req, res) {
//     service.ftp_client.uploadImage(req, (err, result) => {
//         if(err){
//             return res.status(404).json({
//                 success: false,
//                 message: err
//             })
//         }
//         return res.json({
//             success: true,
//             data: result
//         })
//     })
// }

// module.exports = controller