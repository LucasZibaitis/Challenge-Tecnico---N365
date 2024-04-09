const { Router } = require("express");
const postUser = require("../controllers/postUser.js");
const postPayment = require("../controllers/postPayment.js");
const getAllPayments = require("../controllers/getAllPayments.js");
const getAllUsers = require("../controllers/getAllUsers.js");
const getPaymentsById = require("../controllers/getPaymentsById.js");
const postLoggedUser = require("../controllers/postLoggedUser.js");
const deletePayment = require("../controllers/deletePayment.js");
const authenticateToken = require("../middlewares/authenticateToken.js");

const router = Router();

router.post("/postUser", postUser);
router.post("/postLoggedUser", postLoggedUser);
router.post("/postPayment", authenticateToken, postPayment);

router.get("/getAllPayments", authenticateToken, getAllPayments);
router.get("/getAllUsers", getAllUsers);
router.get("/getPaymentsById", authenticateToken, getPaymentsById);

router.delete("/deletePayment", authenticateToken, deletePayment);

module.exports = router;
