const { Payment } = require("../db.js");

const deletePayment = async (req, res) => {
  const { id } = req.query;
  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }
    await payment.destroy();
    return res.status(204).send("Payment deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = deletePayment;
