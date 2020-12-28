const router = require('express').Router();
const Employee = require('../models/empModel');



router.post('/', async (req, res) => {
    try {

        let {name,age,salary,phoneNumber} = req.body;

        if(!name || age==null || salary==null || phoneNumber==null)
            return res.status(400).json({msg: "Not all fields have been entered."})

        const newEmployee = Employee({
            name: name,
            age: age,
            salary: salary,
            phoneNumber: phoneNumber
        });

        const existingEmployee = await Employee.findOne({phoneNumber: phoneNumber});
        if (existingEmployee)
            return res
            .status(400)
            .json({ msg: "An account with this phoneNumber already exists." });

        const savedEmployee = await newEmployee.save();
        res.json(savedEmployee);
        
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/allemp', async (req, res) => {

    const emp = await Employee.find({})
    res.json(emp);

});

module.exports = router;