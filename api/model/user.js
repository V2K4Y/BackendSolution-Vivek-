const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {type: String,required: true,unique:true,},
    password: {type: String, required: true,},
    admin: {type: Boolean, default: false},
}, {timestamps:true});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password'))
        next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); 
})

userSchema.methods.matchPassword = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
}

const userModel = mongoose.model('requestUsers', userSchema);

module.exports = userModel;