const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({

    name: {type: String},
    age: {type: Number},
    salary: {type: Number},
    phoneNumber: {type: Number},
});

module.exports = Employee = mongoose.model('employee',EmployeeSchema);