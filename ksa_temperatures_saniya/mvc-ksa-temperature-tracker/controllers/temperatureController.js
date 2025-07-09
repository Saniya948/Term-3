const Temperature = require('../models/temperatureMode1');

exports.getAll = async (req, res) => {
   const temps = await Temperature.find();
   res.json(temps); 
};

exports.getByRegion = async (req, res) => {
    const temps = await Temperature.find({ region: req.params.region });
    res.json(temps);
};

exports.add = async (req, res) => {
    const temp = new Temperature(req.body);
    await temp.save();
    res.json({ message: 'Temperature added successfully'});
};