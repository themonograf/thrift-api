const service = require("../config/service/upload")
const repo = require("../config/repository/index")
const log = require("../config/service/log")

const controller = {}

controller.uploadSingle = async (req, res) => {
    await service.uploads.single("image")(req, res, async (err) => {
        try {
            // service.ftpClient.end()
            if(err){
                log.logger.error(err.message);
                throw new Error(err.message)
            }

            await createMasterImage(req.file, req.body.category)
        } catch (error) {
            if(error) {
                log.logger.error(error);
                return res.status(400).json({
                    success: false,
                    message: error.name === 'SequelizeUniqueConstraintError' ? error.errors.map(e => e.message)[0] : error.name
                })
            }
        }

        return res.json({
            success: true,
            data: process.env.URL_CDN + "/image?category=" + type + '&image=' + req.file.originalname
        })
    });
}

controller.uploadMultiple = async (req, res) => {
    await service.uploads.array('image', 10)(req, res, async (err) => {
        try {
            // service.ftpClient.end()
            if(err){
                log.logger.error(err.message);
                throw new Error(err.message)
            }

            await createMasterImage(req.files, req.body.category)

        } catch (error) {
            if(error) {
                log.logger.error(error);
                return res.status(404).json({
                    success: false,
                    message: error.name === 'SequelizeUniqueConstraintError' ? error.errors.map(e => e.message)[0] : error.name
                })
            }
        }

        return res.json({
            success: true,
            data: req.files.map((obj) => (process.env.URL_CDN + "/image?category=" + req.body.category + '&image=' + obj.originalname))
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