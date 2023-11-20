const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
  {
    "phoneNumber": {
      type: Number,
      required: [true, `Phone number is required`]
    },
    "amount": {
      type: Number,
      required: [true, `Amount is required`]
    }
  }
)

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
