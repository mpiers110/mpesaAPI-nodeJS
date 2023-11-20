const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config()
const app = express();

const authRoutes = require('./routes/authTokens.routes');
const transactionRoutes = require('./routes/transactions.routes');
const paymentRoutes = require('./routes/payment.routes');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


app.get('/api/v1', (req, res) => {
	res.send('Hello NectarISP Backend');
})
/*CALLBACK_URL*/
app.get('/api/v1/callbackURL', (req, res) => {
	res.send('This is the callbackURL');
})
/*AUTHENTICATION*/
//app.use('/api/v1/auth', authRoutes);
/*PAYMENT*/
app.use('/api/v1/payments', paymentRoutes);
/*TRANSACTIONS*/
app.use('/api/v1/transactions', transactionRoutes);


mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
	console.log('Connected to database')
	app.listen(process.env.PORT, () => {
		console.log(`NectarISP backend is running on port ${process.env.PORT}`);
	})
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
  