const { Payment } = require("../db.js");

const getPaymentsById = async (req, res) => {
  const userId = req.query.userId;

  try {
    const payments = await Payment.findAll({
      where: {
        userId: userId,
      },
    });

    res.status(200).send(payments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getPaymentsById;
