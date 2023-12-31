const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config()
const app = express();

const transactionRoutes = require('./routes/transactions.routes');
const paymentRoutes = require('./routes/payment.routes');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


app.get('/api/v1', (req, res) => {
	res.send('Hello NectarISP Backend');
})


/*PAYMENTS*/
app.use('/api/v1/payments', paymentRoutes);
/*TRANSACTIONS*/
app.use('/api/v1/transactions', transactionRoutes);


mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
	console.log('Connected to database')
	app.listen(process.env.SERVER_PORT, () => {
		console.log(`NectarISP backend is running on port ${process.env.SERVER_PORT}`);
	})
}).catch((error) => {
    console.error(error);
    process.exit(1);
});
  