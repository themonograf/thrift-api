const { verify } = require("jsonwebtoken")
const auth = {}

auth.checkToken = (req, res, next) => {
    let token= req.get("authorization")
    if(token){
        token = token.slice(7)
        verify(token, process.env.JWT_KEY, (err, decode) =>{
            if(err){
                return res.json({
                    success:false,
                    message: "Invalid Token"
                })
            }else{
                next()
            }
        })
    }else{
        return res.json({
            success:false,
            message: "Authorized"
        })
    }
}

module.exports = auth