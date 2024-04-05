const { Payment, User } = require("../db.js");

const postPayment = async (req, res) => {
  const { amount, date, recipient, userId } = req.body;
  try {
    const newPayment = await Payment.create({
      amount: amount,
      date: date,
      recipient: recipient,
    });
    if (userId) {
        await newPayment.setUser(userId)
    }
    return res.status(200).send(newPayment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = postPayment;
