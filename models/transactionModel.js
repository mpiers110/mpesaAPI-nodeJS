const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    "password": {
      type: String,
      required: [true, `Driver's Password is required`]
    },
    "driverName": {
      type: String,
      required: [true, `Driver's name is required`]
    },
    "driverContact": {
      type: Number,
      required: [true, `Driver's phone number is required`]
    },
    "driverNationalID": {
      type: Number,
      required: [true, `Driver's ID number is required`]
    },
    "assignedGroup": {
      type: String,
      required: [true, `Driver's assigned group is required`]
    },
    "drivingLicense": {
      type: String,
      required: [true, `Driver's license is required`]
    }
  },
  {
    timestamps: true
  }
)

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
/*
{
  "password": "freddy",
  "driverName": "Fredrick Isika",
  "driverContact": 25412123456,
  "driverNationalID": 39294057,
  "assignedGroup": "Makini-A",
  "drivingLicense": "https://firebase/hosting/driversLicenses/KenHa/300.jpg"
}
*/