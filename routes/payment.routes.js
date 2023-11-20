const express = require('express');
const router = express.Router();
//const PaymentRequest = require('../models/paymentModel');
const { createToken, stkPush } = require('../app/controllers/createAuthToken');

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
});
//addTransaction
router.post('/transactions/addTransaction', async (req, res) => {
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
