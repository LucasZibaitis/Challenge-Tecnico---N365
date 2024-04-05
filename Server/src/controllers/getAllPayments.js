const { Payment } = require("../db.js");

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();

    res.status(200).send(payments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getAllPayments;
