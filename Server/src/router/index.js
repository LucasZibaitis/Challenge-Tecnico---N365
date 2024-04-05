const { Router } = require("express");
const postUser = require("../controllers/postUser.js");
const postPayment = require("../controllers/postPayment.js");
const getAllPayments = require("../controllers/getAllPayments.js");
const getAllUsers = require("../controllers/getAllUsers.js");

const router = Router();

router.post("/postUser", postUser);
router.post("/postPayment", postPayment);
router.get("/getAllPayments", getAllPayments);
router.get("/getAllUsers", getAllUsers);

module.exports = router;
