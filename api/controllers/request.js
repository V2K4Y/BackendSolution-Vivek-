const { resolveConfig } = require("vite");
const requestModel = require("../model/request")

const getRequestById = async (req, res) => {
    const id = req.query.id;
    // console.log('The id: ', id)
    try {
        // console.log('Entered try section !')
        if(id.length != 24) return res.status(200).json({msg: "Invalid ID !"})
        const request = await requestModel.findById(id);
        // console.log('Reached after extraction !')
        if(request) return res.status(200).json({msg: "Succesfull!", request});
        return res.status(200).json({msg: "Application not found!"});
    } catch (error) {
        console.log("Internal server error !", error);
        return res.status(500).json({msg: "Internal server error"});
    }
}

const getAllRequest = async (req, res) => {
    try {
        const user = await requestModel.find();
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Server error !', error});
    }
}

const serviceRequest = async (req, res) => {
    // console.log('Enter the service Request', req.body, req.file)
    if(! req.body) return res.status(401).json({msg: 'No body / file found !'})
    const { type, details} = req.body;
    const user = req.id;
    const attached = req.file ? req.file.path : null;
    // const decodedAttachment = Buffer.from(attached, 'base64');
    try {
        const request = await requestModel.create({type, details, attached, user})
        if(request) return res.status(202).json({msg: "Request Submitted!", id: request._id});
    } catch (error) {
        console.log("Server error: ", error);
        return res.status(400).json({msg: "Error!"});
    }
    return res.status(200).json({msg: 'Uploaded'})
}

const requestInProgress = async (req, res) => {
    // const {id} = req.params;
    const id = req.body?.id;
    try {
        const request = await requestModel.findByIdAndUpdate(id, {status: 'InProgress'});
        return res.status(200).json({msg: "Updated to InProgress !"})
    } catch (error) {
        console.log('Error in requestInProgress !', error);
        return res.status(400).json({msg: "Internal server error !"});
    }
}

const requestResolved = async (req, res) => {
    // const {id} = req.params;
    const id = req.body?.id;
    try {
        const request = await requestModel.findByIdAndUpdate(id, {status: "Resolved", resolutionDate: Date.now()});
        return res.status(200).json({msg: "Updated to Resolved !"});
    } catch (error) {
        console.log('Error in requestResolved !', error);
        return res.status(400).json({msg: "Internal server error!"});
    }
}

const getUserRequest = async(req, res) => {
    const user = req.id;
    // console.log(user);
    try {
        const requests = await requestModel.find({user});
        // console.log(requests);
        if(requests) {
            return res.status(200).json({msg: "Fetched succesfully!", requests});
        }
        return res.status(200).json({msg: "Not found!"});
    } catch (error) {
        console.log('Internal server error: ', error);
        return res.status(500).json({msg: "Internal server error!"})
    }
}

module.exports = { getAllRequest, serviceRequest, requestInProgress, requestResolved, getRequestById, getUserRequest }