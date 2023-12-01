const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    "phoneNumber": {
      type: Number,
      required: [true, `Phone number is required`]
    },
    "transactionID": {
      type: String,
      required: [true, `TransactionID is required`]
    },
    "amount": {
      type: Number,
      required: [true, `Amount is required`]
    }
  },
  {
    timestamps: true
  }
)

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;

