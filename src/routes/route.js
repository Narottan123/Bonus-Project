const express=require('express');
const router=express.Router();
const customerController=require('../controllers/customerController')
const cardController=require('../controllers/cardController')

router.post('/create',customerController.customerCreate);
router.get('/customerlist',customerController.customerList);
router.delete('/deletecustomer/:id',customerController.customerDelete);
router.post('/cardcreate',cardController.cardCreate);
router.get('/cardlist',cardController.cardList);
module.exports=router;

