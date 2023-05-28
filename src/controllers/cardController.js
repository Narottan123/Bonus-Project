const cardModel = require('../models/cardModel');
const customerModel = require('../models/customerModel');

const cardCreate = async (req, res) => {
    try {
        // Get the highest card number from the existing customers
        const lastCustomer = await cardModel.findOne({}, {}, { sort: { cardNumber: -1 } });

        // Extract the numeric part from the last card number and increment it
        let nextNumber = 1;
        if (lastCustomer) {
            const lastCardNumber = lastCustomer.cardNumber;
            const lastNumber = parseInt(lastCardNumber.substring(1));
            nextNumber = lastNumber + 1;
        }

        // Generate the next card number with zero padding
        const nextCardNumber = `C${nextNumber.toString().padStart(3, '0')}`;

        // Get other fields from the request body
        const { cardType, status, vision, customerId } = req.body;

        // Validate the card type, customer name, status, and vision as before

        // Validate the generated card number format (e.g., C001)
        if (!/^C\d{3}$/.test(nextCardNumber)) {
            return res.status(500).json({ status: false, message: 'Error generating card number' });
        }
        //card type validation
        if (!['Regular', 'Special'].includes(cardType)) {
            return res.status(400).json({ status: false, message: "Card Type is Invalid" });
        }
        //customer name validation
        const card = await customerModel.findById(customerId);
        
        const fname = card.firstName;
        const lname = card.lastName;
        const fullName = `${fname} ${lname}`;
        //console.log(fullName);

        


        // Create the customer document
        const customer = new cardModel({
            cardNumber: nextCardNumber,
            cardType,
            customerName: fullName,
            status,
            vision,
            customerId
        });

        // Save the customer
        await customer.save();

        return res.status(201).json({ status: true, message: 'Customer created successfully', customer });
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
};

const cardList=async(req,res)=>{
    try{
        let queryparams=req.query;
        if(Object.keys(queryparams)==0){
            return res.status(404).json({status:false,message:"parameters not found"})
        }
        let filter={};
        if(queryparams.customerName){
            filter.customerName=queryparams.customerName;
        }
        if(queryparams.customerId){
            filter.customerId=queryparams.customerId;
        }
        if(queryparams._id){
            filter._id=queryparams._id;
        }
        
        let card=await cardModel.findOne(filter);
        if(!card){
            return res.status(404).json({status:false,message:"Card not found"})
        }
        return res.status(200).json({message:card})
    }
    catch(err){
        return res.status(500).json({ status: false, message: err.message });
    }
}




module.exports.cardCreate = cardCreate;
module.exports.cardList=cardList;