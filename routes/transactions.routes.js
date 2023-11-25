const express = require('express');
const router = express.Router();
const Transaction = require('../models/transactionModel');

//getAll
router.get('/getAllTransactions', async(req, res) => {
	try{
		const transactions = await Transaction.find({})
        if (!transactions) {
            return res.status(404).json({ message: 'Transactions not found' });
        }
		res.status(200).json(transactions);
	}catch(error){
		console.error(error);
	};
});
//getById
router.get('/getTransaction/:id', async (req, res) => {
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
//getByphoneNumber
router.get('/findByPhone/:phoneNumber', async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    const result = await Transaction.find({ phoneNumber: +phoneNumber });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No transactions with the phoneNumber found' });
  }
});
//addTransaction
router.post('/addTransaction', async (req, res) => {
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
});
//DeleteByID
router.delete('/deleteById/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Transaction.findByIdAndDelete(id);
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
});
//UpdateTransaction
router.put('/updateById/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { password, driverName, driverContact, driverNationalID, assignedGroup, drivingLicense } = req.body;  
        const updatedTransaction = await Transaction.findByIdAndUpdate( id, {
            password,
            driverName,
            driverContact,
            driverNationalID,
            assignedGroup,
            drivingLicense,
        }, { new: true } );

        res.status(200).json(updatedTransaction);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
