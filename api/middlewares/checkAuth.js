const userModel = require("../model/user");
const { verifyToken } = require("../services/token");

const checkAuth = async (req, res, next) => {
    // console.log(req.cookies)
    const id = verifyToken(req.cookies?.rqid);
    // console.log('Entered auth', id)
    try {
        if(id) {
            // console.log('Contains the id')
            const user = await userModel.findById(id);
            if(req.query?.admin) return res.status(200).json({admin:user.admin});
            if(user) {
                console.log('Autherized')
                req.id = id;
                return next();
            }
            return res.status(404).json({msg: 'No records found !'});

        } else {
            console.log('Not autharized!')
            return res.status(403).json({msg: 'Not autharized !'});
        }
    } catch (error) {
        return res.status(500).json({msg: 'Server error!'});
    }
}

module.exports = {checkAuth}