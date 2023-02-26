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

            await createMasterImage(req.file)
        } catch (error) {
            if(error) {
                return res.json({
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

            await createMasterImage(req.files)

        } catch (error) {
            if(error) {
                return res.json({
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

const createMasterImage = async (data) => {
    let dataMasterImage = []
    if(data.length > 0){
        data.forEach((obj, _) => {
            const array = {
                image: process.env.URL_CDN + obj.path,
                isTaken: false,
            }
    
            dataMasterImage.push(array)
        });
    }else{
        const array = {
            image: process.env.URL_CDN + data.path,
            isTaken: false,
        }

        dataMasterImage.push(array)
    }
    
    await repo.masterImage.createMasterImage(dataMasterImage, (err) => {
       throw err
    });

}

module.exports = controller