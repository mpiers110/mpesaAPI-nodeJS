const express = require('express');
const router = express.Router();
const { createToken, stkPush } = require('../app/controllers/createAuthToken');
const Transaction = require('../models/transactionModel');
//const PaymentRequest = require('../models/paymentModel');

//getAll
router.post('/makePayment', createToken, stkPush);
//getById
/*router.get('/transactions/getTransaction/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findById(id);
  
      if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
  
      res.status(200).json(transaction);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});*/
//addTransaction
router.post('/callbackURL', async(req, res) => {
  try {
    const callBackData = req.body;
    console.log(callBackData?.Body)
    if(!callBackData.Body.stkCallback.CallBackMetadata){
      console.log(callBackData.Body)
      return res.json("OK")
    }
    console.log(callBackData.Body.stkCallback.CallBackMetadata)
    const phoneNumber = callBackData.Body.stkCallback.CallBackMetadata?.Item[4]?.Value;
    const transactionID = callBackData.Body.stkCallback.CallBackMetadata?.Item[1]?.Value;;
    const amount = callBackData.Body.stkCallback.CallBackMetadata?.Item[0]?.Value;

    // Create a new transaction
    const newTransaction = new Transaction({
      phoneNumber,
      transactionID,
      amount,
    });

    // Save the transaction to the database
    await newTransaction.save();

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }

});
/*router.post('/transactions/addTransaction', async (req, res) => {
    try {
      const { password, driverName, driverContact, driverNationalID, assignedGroup, drivingLicense } = req.body;
  
      // Create a new transaction
      const newTransaction = new Transaction({
        password,
        driverName,
        driverContact,
        driverNationalID,
        assignedGroup,
        drivingLicense,
      });
  
      // Save the transaction to the database
      await newTransaction.save();
  
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
});*/


module.exports = router;
