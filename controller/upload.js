const service = require("../config/service/upload")
const repo = require("../config/repository/index")

const controller = {}

controller.uploadSingle = async (req, res) => {
    await service.uploads.single("image")(req, res, async (err) => {
        try {
            // service.ftpClient.end()
            if(err){
                throw new Error(err.message)
            }

            await createMasterImage(req.file, req.body.type)
        } catch (error) {
            if(error) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
        }

        return res.json({
            success: true,
            data: process.env.URL_CDN + req.file.path
        })
    });
}

controller.uploadMultiple = async (req, res) => {
    await service.uploads.array('image', 10)(req, res, async (err) => {
        try {
            // service.ftpClient.end()
            if(err){
                throw new Error(err.message)
            }

            await createMasterImage(req.files, req.body.type)

        } catch (error) {
            if(error) {
                return res.status(404).json({
                    success: false,
                    message: error.message
                })
            }
        }

        return res.json({
            success: true,
            data: []
        })
    });
}

const createMasterImage = async (data, type) => {
    let dataMasterImage = []
    if(data.length > 0){
        data.forEach((obj, _) => {
            const array = {
                path: process.env.URL_CDN + "/image?category=" + type + '&image=' + obj.originalname,
                image: obj.originalname,
                category: type,
                isTaken: false,
            }
    
            dataMasterImage.push(array)
        });
    }else{
        const array = {
            path: process.env.URL_CDN + "/image?category=" + type + '&image=' + data.originalname,
            image: data.originalname,
            category: type,
            isTaken: false,
        }

        dataMasterImage.push(array)
    }
    
    await repo.masterImage.createMasterImage(dataMasterImage, (err) => {
       throw err
    });

}

module.exports = controller