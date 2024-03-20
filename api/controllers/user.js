const userModel = require("../model/user");
const { generateToken } = require("../services/token");

const regUser = async (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(404).json({msg: "Request body not found !"});
    }
    const {username, password} = req.body;
    let admin = false;
    username.includes('admin') ? admin = true : admin = false;
    const find = await userModel.findOne({username});
    if(find) 
        return res.status(200).json({msg: "User already exist!"});
    const user = await userModel.create({username, password, admin});
    const token = generateToken(user._id);
    res.cookie('rqid', token, {
        httpOnly: false,
        secure: false,
        sameSite: 'none',
        maxAge: 60 * 60 * 1000,
    })
    res.status(200).json({msg: "User registered !", username: user.username, id: user._id});
}

const loginUser = async (req, res) => {
    if(!req.body.username || !req.body.password) 
        return res.status(404).json({msg: "Request body not found !"});
    const {username, password} = req.body;
    const user = await userModel.findOne({username});
    if(user && await user.matchPassword(password)) {
        const token = generateToken(user._id);
        res.cookie('rqid', token, {
            maxAge: 60 * 60 * 1000,
        });
        return res.status(200).json({msg: "Logged In", username: user.username, id: user._id, admin: user.admin});
    }
    res.status(200).json({msg: "Invalid Username or Password!"});
}

module.exports = { loginUser, regUser }