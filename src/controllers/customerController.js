const cardModel = require('../models/cardModel');
const customerModel = require('../models/customerModel');

const customerCreate = async (req, res) => {
    let { firstName, lastName, mobileNumber, DOB, emailId, address, customerId, status } = req.body;

    //first name validation check
    if (!firstName || firstName.length < 2 || firstName.length > 15) {
        return res.status(400).json({ "message": "First Name must be between 2 and 50 characters long" })
    }
    if (!/^[A-Za-z]+$/.test(firstName)) {
        return res.status(400).json({ "message": "Firstname can contains only letters" });
    }

    //last anme validation check
    if (!lastName || lastName.length < 2 || lastName.length > 15) {
        return res.status(400).json({ "message": "Last Name must be between 2 and 50 characters long" })
    }
    if (!/^[A-Za-z]+$/.test(lastName)) {
        return res.status(400).json({ "message": "lastname can contains only letters" });
    }

    //mobile number validation check

    if (!/^[0-9]{10}$/.test(mobileNumber)) {
        return res.status(400).json({ "message": "Mobile number should be 10 digits" });
    }
    let mobile = await customerModel.findOne({ mobileNumber: mobileNumber })
    if (mobile) {
        return res.status(400).json({ "message": "Mobile number should be unique" });
    }

    //emailId validation
    emailId = emailId.toLowerCase();
    let email = await customerModel.findOne({ emailId: emailId })
    if (email) {
        return res.status(400).json({ "message": "email id should be unique" });
    }
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailId)) {
        return res.status(400).json({ "message": "email id format is invalid " })
    }

    //customerId validation
    let id = await customerModel.findOne({ customerId: customerId })
    if (id) {
        return res.status(400).json({ "message": "customer id should be unique" });
    }
    if (customerId.length !== 8) {
        return res.status(400).json({ "message": "customer id should be 8 characters long" });
    }
    if (!/^WB[0-9]+$/.test(customerId)) {
        return res.status(400).json({ "message": "customer id format is invid" });
    }

    //status validation
    if (!['ACTIVE', 'INACTIVE'].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" })
    }
    let saveddata = await customerModel.create({ firstName, lastName, mobileNumber, DOB, emailId, address, customerId, status });
    return res.status(201).json({ status: true, message: "customer details created successfully", saveddata })

}
const customerList = async (req, res) => {
    try {
        let customer = await customerModel.find({ status: "ACTIVE"});
        if (!customer) {
            res.status(404).json({ status: false, message: "No such customer found" })
        }
        res.status(200).json({ status: true, message: customer })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
const customerDelete = async (req, res) => {
    try {
        let customer_id = req.params.id;
        console.log(customer_id)
        let data = await customerModel.updateOne({ _id: customer_id }, {$set:{status: "INACIVE" }},{new:true});
        if (!data) {
            res.status(404).json({ status: false, message: "id not found" })
        }
        res.status(200).json({ status: true, message: "deleted successfully" })
    }
    catch(err){
        res.send(500).json({status:false,message:err.message})
    }
}
module.exports.customerCreate = customerCreate;
module.exports.customerList = customerList;
module.exports.customerDelete = customerDelete