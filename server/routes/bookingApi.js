const express = require("express");
const { hotels, countriesList, hotelDetails } = require('../controller/bookingApi');
const { requireSignin } =require('../common-middleware/index');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../validators/auth');
const router = express.Router();


router.get('/hotels', hotels);
router.get('/countriesList', countriesList);
router.get('/hotelDetails', hotelDetails);

// router.post('/', validateSigninRequest, isRequestValidated, signin);

module.exports = router;